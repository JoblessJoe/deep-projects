// Pure filesystem + state core for deep-projects. No dsh/ctx imports —
// testable standalone and swappable behind the route layer.
//
// Layout (disk is truth; state.json is a cache, reconciled on every read):
//   <root>/<slug>/
//     AGENTS.md        — project instructions (auto-loaded by the agent natively)
//     README.md        — optional description
//     AGENTS.local.md  — project memory (bullets; auto-loaded, kept current by agents)
//     knowledge/       — user knowledge files
//   <root>/.projects.json  — cache: [{slug, name, description, starred, createdAt}]

import {
  mkdir, rm, readdir, readFile, writeFile, stat, cp,
} from 'node:fs/promises'
import { join, basename } from 'node:path'

export type ProjectRecord = {
  slug: string
  name: string
  description?: string
  starred?: boolean
  archived?: boolean
  createdAt: string
}

export type KnowledgeFile = { name: string; size: number; mtime: number }

export type ProjectDetail = ProjectRecord & {
  instructions: string
  knowledge: KnowledgeFile[]
  goal: string
}

const STATE_NAME = '.projects.json'
const AGENTS_NAME = 'AGENTS.md'
const KNOWLEDGE_DIR = 'knowledge'

const DEFAULT_AGENTS = `# Project instructions

Describe the project, its conventions, and anything the agent should always
know when working here.

Read files in knowledge/ when relevant.
`

// Project memory lives in AGENTS.local.md: the host auto-loads it (as the local
// instruction overlay) into every chat whose cwd is the project, so agents
// always see it. The header tells them to keep it current. notes.md is the
// pre-0.4 location and is migrated on first touch.
const MEMORY_NAME = 'AGENTS.local.md'
const LEGACY_NOTES = 'notes.md'
const MEMORY_MAX = 20_000
export const MEMORY_HEADER = `# Project memory

<!-- deep-projects: loaded into every chat in this project. Agents: the project goal
says what this project is for; keep your work aligned with it and update it with
projects_update when the user changes direction. Keep the memory list current: add
lasting facts, decisions and user preferences with projects_add_note; fix or remove
wrong or stale lines with projects_set_memory. One bullet per memory. -->
`
const GOAL_OPEN = '## Project goal\n<!-- dsh-projects:goal -->\n'
const GOAL_CLOSE = '\n<!-- /dsh-projects:goal -->\n'
const GOAL_MAX = 2000

async function memoryFile(root: string, slug: string): Promise<string> {
  const rec = (await listProjects(root)).find(r => r.slug === slug)
  if (!rec) throw new Error('no such project')
  const dir = join(root, slug)
  const path = join(dir, MEMORY_NAME)
  try { await stat(path) } catch {
    let legacy = ''
    try { legacy = await readFile(join(dir, LEGACY_NOTES), 'utf8') } catch { /* nothing to migrate */ }
    if (legacy.trim()) {
      await writeFile(path, MEMORY_HEADER + '\n' + legacy.trimEnd() + '\n')
      await rm(join(dir, LEGACY_NOTES), { force: true })
    }
  }
  return path
}

/** Split a memory file into its goal block and memory body (header dropped, any header version). */
function parseMemory(text: string): { goal: string; body: string } {
  let rest = text.replace(/^# Project memory\n\n<!--[\s\S]*?-->\n/, '').replace(/^\n+/, '')
  let goal = ''
  if (rest.startsWith(GOAL_OPEN)) {
    const end = rest.indexOf(GOAL_CLOSE)
    if (end >= 0) {
      goal = rest.slice(GOAL_OPEN.length, end).trim()
      rest = rest.slice(end + GOAL_CLOSE.length).replace(/^\n+/, '')
    }
  }
  return { goal, body: rest }
}

async function readMemory(root: string, slug: string): Promise<{ path: string; goal: string; body: string }> {
  const path = await memoryFile(root, slug)
  let text = ''
  try { text = await readFile(path, 'utf8') } catch { /* none yet */ }
  return { path, ...parseMemory(text) }
}

async function writeMemory(path: string, goal: string, body: string): Promise<void> {
  await writeFile(path, MEMORY_HEADER
    + (goal ? '\n' + GOAL_OPEN + goal + GOAL_CLOSE : '')
    + (body ? '\n' + body + '\n' : ''))
}

/** Read the project memory (header and goal stripped; '' when absent). */
export async function readNotes(root: string, slug: string): Promise<string> {
  return (await readMemory(root, slug)).body
}

/** Replace the whole memory body (header and goal are kept). Returns the body. */
export async function setNotes(root: string, slug: string, text: string): Promise<string> {
  const { path, goal } = await readMemory(root, slug)
  const body = parseMemory(text).body.trim()
  if (body.length > MEMORY_MAX) throw new Error(`memory too long (max ${MEMORY_MAX} chars)`)
  await writeMemory(path, goal, body)
  return body ? body + '\n' : ''
}

/** Read the project goal ('' when unset). */
export async function readGoal(root: string, slug: string): Promise<string> {
  return (await readMemory(root, slug)).goal
}

/** Set the project goal (empty clears it). Lives in the auto-loaded memory file so every chat sees it. */
export async function setGoal(root: string, slug: string, text: string): Promise<string> {
  const { path, body } = await readMemory(root, slug)
  const goal = text.trim()
  if (goal.length > GOAL_MAX) throw new Error(`goal too long (max ${GOAL_MAX} chars)`)
  await writeMemory(path, goal, body.trim())
  return goal
}

/** Append one dated memory bullet. Returns the full memory body. */
export async function appendNote(root: string, slug: string, text: string): Promise<string> {
  const body = text.trim().replace(/\s+/g, ' ')
  if (!body) throw new Error('empty note')
  if (body.length > 2000) throw new Error('note too long (max 2000 chars)')
  const existing = (await readNotes(root, slug)).trimEnd()
  const stamp = new Date().toISOString().slice(0, 10)
  return setNotes(root, slug, (existing ? existing + '\n' : '') + `- ${body} _(${stamp})_`)
}

export function slugify(name: string): string {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  if (!s) throw new Error('invalid name')
  return s
}

function statePath(root: string) { return join(root, STATE_NAME) }

export async function loadState(root: string): Promise<ProjectRecord[]> {
  try {
    const raw = await readFile(statePath(root), 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as ProjectRecord[]
  } catch { /* first run or corrupt → rebuild from disk */ }
  return reconcile(root, [])
}

async function saveState(root: string, records: ProjectRecord[]): Promise<void> {
  await mkdir(root, { recursive: true })
  await writeFile(statePath(root), JSON.stringify(records, null, 2))
}

/** Disk is truth: rebuild the cache from directories that look like projects. */
async function reconcile(root: string, records: ProjectRecord[]): Promise<ProjectRecord[]> {
  let entries: string[] = []
  try {
    entries = (await readdir(root)).filter(n =>
      !n.startsWith('.') && !n.endsWith(STATE_NAME))
  } catch {
    return records
  }
  const bySlug = new Map(records.map(r => [r.slug, r]))
  const out: ProjectRecord[] = []
  for (const name of entries.sort()) {
    try {
      const st = await stat(join(root, name))
      if (!st.isDirectory()) continue
    } catch { continue }
    const existing = bySlug.get(name)
    if (existing) { out.push(existing); continue }
    out.push({
      slug: name,
      name,
      createdAt: new Date().toISOString(),
    })
  }
  return out
}

export async function listProjects(root: string): Promise<ProjectRecord[]> {
  const records = await loadState(root)
  const reconciled = await reconcile(root, records)
  if (reconciled.length !== records.length) {
    await saveState(root, reconciled)
  }
  return reconciled
}

export async function getProject(root: string, slug: string): Promise<ProjectDetail | null> {
  const records = await listProjects(root)
  const rec = records.find(r => r.slug === slug)
  if (!rec) return null
  let instructions = ''
  try {
    instructions = await readFile(join(root, slug, AGENTS_NAME), 'utf8')
  } catch { /* no AGENTS.md yet */ }
  let knowledge: KnowledgeFile[] = []
  try {
    const files = await readdir(join(root, slug, KNOWLEDGE_DIR))
    knowledge = (await Promise.all(files.map(async f => {
      const st = await stat(join(root, slug, KNOWLEDGE_DIR, f))
      if (!st.isFile()) return null
      return { name: f, size: st.size, mtime: st.mtimeMs }
    }))).filter(Boolean) as KnowledgeFile[]
  } catch { /* no knowledge dir yet */ }
  return { ...rec, instructions, knowledge, goal: await readGoal(root, slug) }
}

export type CreateResult = { slug: string; name: string; description: string; createdAt: string }

export async function createProject(
  root: string, name: string, description: string,
): Promise<CreateResult> {
  const records = await listProjects(root)
  const slugs = new Set(records.map(r => r.slug))
  let slug = slugify(name)
  if (slugs.has(slug)) {
    // find first free variant
    let n = 2
    while (slugs.has(`${slug}-${n}`)) n++
    slug = `${slug}-${n}`
  }
  const dir = join(root, slug)
  await mkdir(join(dir, KNOWLEDGE_DIR), { recursive: true })
  await writeFile(join(dir, AGENTS_NAME), DEFAULT_AGENTS)
  const createdAt = new Date().toISOString()
  if (description.trim()) {
    await writeFile(join(dir, 'README.md'), description.trim() + '\n')
  }
  records.push({ slug, name: name.trim(), description: description.trim() || undefined, createdAt })
  await saveState(root, records)
  return { slug, name: name.trim(), description: description.trim(), createdAt }
}

export async function deleteProject(root: string, slug: string): Promise<void> {
  const records = (await listProjects(root)).filter(r => r.slug !== slug)
  await saveState(root, records)
  await rm(join(root, slug), { recursive: true, force: true })
}

export async function setStarred(root: string, slug: string, starred: boolean): Promise<ProjectRecord | null> {
  return setFlag(root, slug, { starred })
}

/** Archive hides a project from the sidebar and main list (files untouched); archiving also unpins. */
export async function setArchived(root: string, slug: string, archived: boolean): Promise<ProjectRecord | null> {
  return setFlag(root, slug, archived ? { archived: true, starred: false } : { archived: false })
}

async function setFlag(root: string, slug: string, patch: Partial<Pick<ProjectRecord, 'starred' | 'archived'>>): Promise<ProjectRecord | null> {
  const records = await listProjects(root)
  const rec = records.find(r => r.slug === slug)
  if (!rec) return null
  Object.assign(rec, patch)
  await saveState(root, records)
  return rec
}

export async function setInstructions(root: string, slug: string, text: string): Promise<void> {
  const rec = (await listProjects(root)).find(r => r.slug === slug)
  if (!rec) throw new Error('no such project')
  await writeFile(join(root, slug, AGENTS_NAME), text)
}

/** Patch name and/or description (description also lives in README.md). */
export async function renameProject(
  root: string, slug: string, patch: { name?: string; description?: string },
): Promise<ProjectRecord> {
  const records = await listProjects(root)
  const rec = records.find(r => r.slug === slug)
  if (!rec) throw new Error('no such project')
  if (patch.name !== undefined) {
    const name = patch.name.trim()
    if (!name || name.length > 60) throw new Error('name must be 1-60 chars')
    rec.name = name
  }
  if (patch.description !== undefined) {
    const d = patch.description.trim()
    rec.description = d || undefined
    if (d) await writeFile(join(root, slug, 'README.md'), d + '\n')
    else await rm(join(root, slug, 'README.md'), { force: true })
  }
  await saveState(root, records)
  return rec
}

/** Copy a file (or directory) into <root>/<slug>/knowledge/. Returns the stored name. */
export async function importKnowledge(
  root: string, slug: string, src: string,
): Promise<string> {
  const rec = (await listProjects(root)).find(r => r.slug === slug)
  if (!rec) throw new Error('no such project')
  const destDir = join(root, slug, KNOWLEDGE_DIR)
  await mkdir(destDir, { recursive: true })
  const name = basename(src)
  const dest = join(destDir, name)
  // overwrite silently — re-uploading the same file is an update
  await cp(src, dest, { recursive: true })
  return name
}

export async function deleteKnowledge(
  root: string, slug: string, name: string,
): Promise<void> {
  const rec = (await listProjects(root)).find(r => r.slug === slug)
  if (!rec) throw new Error('no such project')
  // path traversal guard: only plain filenames
  if (name.includes('/') || name.includes('\\') || name.startsWith('.')) {
    throw new Error('invalid file name')
  }
  await rm(join(root, slug, KNOWLEDGE_DIR, name), { recursive: true, force: true })
}
