// deep-projects — Claude-Desktop-style Projects for the DeepSeek Harness web GUI.
//
// Host half:
//   * one projects root (default ~/deep-projects, override with DSH_PROJECTS_ROOT)
//   * exact-path JSON routes on the shared /api channel (carrier applies
//     auth + trust before dispatch — no manual checks needed)
//   * eight agent tools, registered per agent on agent/created
//
// Data model: the disk is truth. <root>/<slug>/ holds AGENTS.md (custom
// instructions — auto-loaded natively by the agent in that workspace),
// knowledge/ (user files), README.md (optional). <root>/.projects.json is a
// cache (names, stars, timestamps) reconciled against the directory listing
// on every read.

import { homedir } from 'node:os'
import { join } from 'node:path'
import {
  listProjects, getProject, createProject, deleteProject,
  setStarred, setArchived, setInstructions, renameProject, importKnowledge, deleteKnowledge,
  appendNote, readNotes, setNotes, setGoal,
} from './core.js'

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024 // per-file knowledge upload cap

function projectsRoot(): string {
  return process.env.DSH_PROJECTS_ROOT?.trim() || join(homedir(), 'deep-projects')
}

function json(value: unknown, status = 200): Response {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/**
 * Route table: exact path + methods. The fetch registry matches exact paths
 * only, so slugs travel as query parameters (slugify keeps them URL-safe).
 */
export function buildRoutes(root: string): Array<{ path: string; methods: string[]; handle: (request: Request) => Promise<Response> }> {
  const parse = (request: Request) => new URL(request.url).searchParams

  const guard = (request: Request): Response | null => {
    const slug = parse(request).get('slug') ?? ''
    if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(slug)) {
      return json({ ok: false, code: 'badSlug', error: 'invalid slug' }, 400)
    }
    return null
  }

  return [
    {
      path: '/api/deep-projects/list', methods: ['GET'],
      handle: async () => {
        const { readdir } = await import('node:fs/promises')
        const projects = await listProjects(root).then(async (records) => {
          // path is needed by the client (session cwd filter, new-chat cwd);
          // fileCount is a cheap readdir for the card.
          return Promise.all(records.map(async (r) => {
            let fileCount = 0
            try { fileCount = (await readdir(join(root, r.slug, 'knowledge'))).length } catch { /* none */ }
            return { ...r, path: join(root, r.slug), fileCount }
          }))
        })
        return json({ ok: true, projects })
      },
    },
    {
      path: '/api/deep-projects/create', methods: ['POST'],
      handle: async (request) => {
        let body: { name?: string; description?: string } = {}
        try { body = await request.json() } catch { /* fall through */ }
        const name = (body.name ?? '').trim()
        if (!name || name.length > 60) {
          return json({ ok: false, code: 'badName', error: 'name required (1-60 chars)' }, 400)
        }
        try {
          const project = await createProject(root, name, (body.description ?? '').trim())
          return json({ ok: true, project: { ...project, path: join(root, project.slug) } })
        } catch (error) {
          return json({ ok: false, code: 'internalError', error: describe(error) }, 500)
        }
      },
    },
    {
      path: '/api/deep-projects/detail', methods: ['GET'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        const slug = parse(request).get('slug')!
        const project = await getProject(root, slug)
        if (!project) return json({ ok: false, code: 'notFound', error: 'no such project' }, 404)
        return json({ ok: true, project: { ...project, path: join(root, slug) } })
      },
    },
    {
      path: '/api/deep-projects/rename', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        let body: { name?: string; description?: string; goal?: string } = {}
        try { body = await request.json() } catch { /* fall through */ }
        const name = body.name === undefined ? undefined : body.name.trim()
        if (name !== undefined && (!name || name.length > 60)) {
          return json({ ok: false, code: 'badName', error: 'name required (1-60 chars)' }, 400)
        }
        if (typeof body.description === 'string' && body.description.length > 500) {
          return json({ ok: false, code: 'badName', error: 'description too long (max 500)' }, 400)
        }
        try {
          const project = await renameProject(root, parse(request).get('slug')!, {
            name, description: typeof body.description === 'string' ? body.description : undefined,
          })
          if (typeof body.goal === 'string') await setGoal(root, parse(request).get('slug')!, body.goal)
          return json({ ok: true, project })
        } catch (error) {
          return json({ ok: false, code: 'notFound', error: describe(error) }, 404)
        }
      },
    },
    {
      path: '/api/deep-projects/star', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        let body: { starred?: boolean } = {}
        try { body = await request.json() } catch { /* fall through */ }
        try {
          const project = await setStarred(root, parse(request).get('slug')!, !!body.starred)
          if (!project) return json({ ok: false, code: 'notFound', error: 'no such project' }, 404)
          return json({ ok: true, project })
        } catch (error) {
          return json({ ok: false, code: 'internalError', error: describe(error) }, 500)
        }
      },
    },
    {
      path: '/api/deep-projects/archive', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        let body: { archived?: boolean } = {}
        try { body = await request.json() } catch { /* fall through */ }
        const project = await setArchived(root, parse(request).get('slug')!, !!body.archived)
        if (!project) return json({ ok: false, code: 'notFound', error: 'no such project' }, 404)
        return json({ ok: true, project })
      },
    },
    {
      path: '/api/deep-projects/instructions', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        const declared = Number(request.headers.get('content-length') ?? '')
        if (declared > 512 * 1024) {
          return json({ ok: false, code: 'bodyTooLarge', error: 'instructions too large' }, 413)
        }
        let body: { text?: string } = {}
        try { body = await request.json() } catch { /* fall through */ }
        if (typeof body.text !== 'string') {
          return json({ ok: false, code: 'badText', error: 'text required' }, 400)
        }
        try {
          await setInstructions(root, parse(request).get('slug')!, body.text)
          return json({ ok: true })
        } catch (error) {
          return json({ ok: false, code: 'notFound', error: describe(error) }, 404)
        }
      },
    },
    {
      path: '/api/deep-projects/delete', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        try {
          await deleteProject(root, parse(request).get('slug')!)
          return json({ ok: true })
        } catch (error) {
          return json({ ok: false, code: 'notFound', error: describe(error) }, 404)
        }
      },
    },
    {
      // Raw binary body (no multipart): the browser sends the File bytes
      // directly; the filename travels as a query parameter.
      path: '/api/deep-projects/knowledge-upload', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        const name = (parse(request).get('name') ?? '').trim()
        if (!name || name.includes('/') || name.includes('\\') || name.startsWith('.')) {
          return json({ ok: false, code: 'badName', error: 'invalid file name' }, 400)
        }
        const declared = Number(request.headers.get('content-length') ?? '')
        if (declared > MAX_UPLOAD_BYTES) {
          return json({ ok: false, code: 'bodyTooLarge', params: { max: MAX_UPLOAD_BYTES }, error: 'file too large' }, 413)
        }
        const bytes = new Uint8Array(await request.arrayBuffer())
        if (bytes.byteLength > MAX_UPLOAD_BYTES) {
          return json({ ok: false, code: 'bodyTooLarge', params: { max: MAX_UPLOAD_BYTES }, error: 'file too large' }, 413)
        }
        const { writeFile, mkdir } = await import('node:fs/promises')
        const destDir = join(root, parse(request).get('slug')!, 'knowledge')
        await mkdir(destDir, { recursive: true })
        await writeFile(join(destDir, name), bytes)
        return json({ ok: true, name })
      },
    },
    {
      // Project memory (AGENTS.local.md): GET reads, POST replaces the body.
      path: '/api/deep-projects/notes', methods: ['GET', 'POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        const slug = parse(request).get('slug')!
        if (request.method === 'POST') {
          let body: { text?: string } = {}
          try { body = await request.json() } catch { /* fall through */ }
          if (typeof body.text !== 'string') return json({ ok: false, code: 'badText', error: 'text required' }, 400)
          try {
            return json({ ok: true, notes: await setNotes(root, slug, body.text) })
          } catch (error) {
            return json({ ok: false, code: 'badText', error: describe(error) }, 400)
          }
        }
        try {
          return json({ ok: true, notes: await readNotes(root, slug) })
        } catch (error) {
          return json({ ok: false, code: 'notFound', error: describe(error) }, 404)
        }
      },
    },
    {
      path: '/api/deep-projects/note', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        let body: { text?: string } = {}
        try { body = await request.json() } catch { /* fall through */ }
        if (typeof body.text !== 'string' || !body.text.trim()) {
          return json({ ok: false, code: 'badText', error: 'text required' }, 400)
        }
        try {
          const notes = await appendNote(root, parse(request).get('slug')!, body.text)
          return json({ ok: true, notes })
        } catch (error) {
          return json({ ok: false, code: 'badText', error: describe(error) }, 400)
        }
      },
    },
    {
      path: '/api/deep-projects/knowledge-delete', methods: ['POST'],
      handle: async (request) => {
        const bad = guard(request)
        if (bad) return bad
        const name = parse(request).get('name') ?? ''
        if (!name || name.includes('/') || name.includes('\\') || name.startsWith('.')) {
          return json({ ok: false, code: 'badName', error: 'invalid file name' }, 400)
        }
        try {
          await deleteKnowledge(root, parse(request).get('slug')!, name)
          return json({ ok: true })
        } catch (error) {
          return json({ ok: false, code: 'notFound', error: describe(error) }, 404)
        }
      },
    },
  ]
}

/** The eight agent-facing tools, bound to a projects root. */
export function buildTools(root: string): Array<{
  name: string; description: string; parameters: Record<string, unknown>
  output: { schema: Record<string, unknown>; render: (args: unknown, value: unknown) => Array<{ type: string; text: string }> }
  execute: (args: any) => Promise<unknown>
}> {
  const render = (_args: unknown, value: unknown) => [{ type: 'text', text: JSON.stringify(value) }]
  const recordSchema = {
    type: 'object',
    properties: {
      slug: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      starred: { type: 'boolean' },
      createdAt: { type: 'string' },
    },
    required: ['slug', 'name', 'createdAt'],
  }
  return [
    {
      name: 'projects_list',
      description: 'List projects: named workspaces (each with AGENTS.md instructions and a knowledge/ folder) that group related chats. Returns slug, name, description, and star state.',
      parameters: { type: 'object', properties: {} },
      output: {
        schema: {
          type: 'object',
          properties: { projects: { type: 'array', items: recordSchema } },
          required: ['projects'],
        },
        render,
      },
      execute: async () => ({ projects: await listProjects(root) }),
    },
    {
      name: 'projects_create',
      description: 'Create a new dsh-project workspace (folder + AGENTS.md + knowledge/). Use when the user asks to start a project or to group work under a name.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Display name (1-60 chars).' },
          description: { type: 'string', description: 'Optional one-line description.' },
        },
        required: ['name'],
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            ok: { type: 'boolean' },
            project: recordSchema,
            path: { type: 'string' },
          },
          required: ['ok', 'project', 'path'],
        },
        render,
      },
      execute: async (args: { name: string; description?: string }) => {
        const project = await createProject(root, args.name, args.description ?? '')
        return { ok: true, project, path: join(root, project.slug) }
      },
    },
    {
      name: 'projects_read',
      description: 'Read a dsh-project: goal, custom instructions (AGENTS.md), project memory, and the list of knowledge files.',
      parameters: {
        type: 'object',
        properties: { slug: { type: 'string', description: 'Project slug from projects_list.' } },
        required: ['slug'],
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            starred: { type: 'boolean' },
            createdAt: { type: 'string' },
            instructions: { type: 'string' },
            goal: { type: 'string' },
            memory: { type: 'string' },
            knowledge: {
              type: 'array',
              items: {
                type: 'object',
                properties: { name: { type: 'string' }, size: { type: 'number' }, mtime: { type: 'number' } },
                required: ['name', 'size', 'mtime'],
              },
            },
          },
          required: ['slug', 'name', 'createdAt', 'instructions', 'knowledge'],
        },
        render,
      },
      execute: async (args: { slug: string }) => {
        const project = await getProject(root, args.slug)
        if (!project) throw new Error('no such project: ' + args.slug)
        return { ...project, memory: await readNotes(root, args.slug) }
      },
    },
    {
      name: 'projects_update',
      description: "Change a dsh-project's settings: name, description, goal, custom instructions (replaces AGENTS.md), pinned, and/or archived state. Pass only the fields to change. For memories use projects_add_note / projects_set_memory instead.",
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'Project slug from projects_list.' },
          name: { type: 'string', description: 'New display name (1-60 chars).' },
          description: { type: 'string', description: 'New one-line description (empty clears it).' },
          goal: { type: 'string', description: 'What the project is for / what done looks like (empty clears it). Shown to every chat in the project.' },
          instructions: { type: 'string', description: 'Full new AGENTS.md content (replaces it; read it with projects_read first).' },
          pinned: { type: 'boolean', description: 'Pin to (true) or unpin from (false) the sidebar.' },
          archived: { type: 'boolean', description: 'Archive (true: hidden from lists, files kept) or restore (false).' },
        },
        required: ['slug'],
      },
      output: {
        schema: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, changed: { type: 'array', items: { type: 'string' } } },
          required: ['ok', 'changed'],
        },
        render,
      },
      execute: async (args: { slug: string; name?: string; description?: string; goal?: string; instructions?: string; pinned?: boolean; archived?: boolean }) => {
        const changed: string[] = []
        if (args.name !== undefined || args.description !== undefined) {
          await renameProject(root, args.slug, { name: args.name, description: args.description })
          if (args.name !== undefined) changed.push('name')
          if (args.description !== undefined) changed.push('description')
        }
        if (args.goal !== undefined) {
          await setGoal(root, args.slug, args.goal)
          changed.push('goal')
        }
        if (args.instructions !== undefined) {
          if (args.instructions.length > 200_000) throw new Error('instructions too large')
          await setInstructions(root, args.slug, args.instructions)
          changed.push('instructions')
        }
        if (args.pinned !== undefined) {
          await setStarred(root, args.slug, args.pinned)
          changed.push('pinned')
        }
        if (args.archived !== undefined) {
          await setArchived(root, args.slug, args.archived)
          changed.push('archived')
        }
        return { ok: true, changed }
      },
    },
    {
      name: 'projects_add_knowledge',
      description: 'Copy an existing file (or directory) from disk into a project\'s knowledge/ folder so future chats in that workspace can read it.',
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'Project slug.' },
          source: { type: 'string', description: 'Absolute path of the file or directory to copy.' },
        },
        required: ['slug', 'source'],
      },
      output: {
        schema: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, name: { type: 'string' } },
          required: ['ok', 'name'],
        },
        render,
      },
      execute: async (args: { slug: string; source: string }) => {
        const name = await importKnowledge(root, args.slug, args.source)
        return { ok: true, name }
      },
    },
    {
      name: 'projects_add_note',
      description: "Add one memory to a project's memory (AGENTS.local.md, auto-loaded into every chat in that project). Use proactively whenever you learn a lasting fact, decision, or user preference about the project. Don't add duplicates; use projects_set_memory to fix stale ones.",
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'Project slug from projects_list.' },
          text: { type: 'string', description: 'The memory (one line, max 2000 chars).' },
        },
        required: ['slug', 'text'],
      },
      output: {
        schema: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, notes: { type: 'string' } },
          required: ['ok', 'notes'],
        },
        render,
      },
      execute: async (args: { slug: string; text: string }) => {
        const notes = await appendNote(root, args.slug, args.text)
        return { ok: true, notes }
      },
    },
    {
      name: 'projects_set_memory',
      description: "Replace a project's whole memory list (AGENTS.local.md body; the header is kept). Use to correct, merge, or remove wrong or outdated memories. Pass every bullet you want to keep, one '- ' line each. Returns the saved memory.",
      parameters: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'Project slug from projects_list.' },
          text: { type: 'string', description: "Full new memory body: markdown bullets, one per line (max 20000 chars). Empty clears it." },
        },
        required: ['slug', 'text'],
      },
      output: {
        schema: {
          type: 'object',
          properties: { ok: { type: 'boolean' }, notes: { type: 'string' } },
          required: ['ok', 'notes'],
        },
        render,
      },
      execute: async (args: { slug: string; text: string }) => {
        const notes = await setNotes(root, args.slug, args.text)
        return { ok: true, notes }
      },
    },
    {
      name: 'projects_delete',
      description: 'Delete a dsh-project: removes its folder (instructions, knowledge files) and metadata. Existing sessions are kept.',
      parameters: {
        type: 'object',
        properties: { slug: { type: 'string', description: 'Project slug to delete.' } },
        required: ['slug'],
      },
      output: {
        schema: {
          type: 'object',
          properties: { ok: { type: 'boolean' } },
          required: ['ok'],
        },
        render,
      },
      execute: async (args: { slug: string }) => {
        await deleteProject(root, args.slug)
        return { ok: true }
      },
    },
  ]
}

export const inject = ['connection', 'agents', 'workingDirectory']

export function apply(ctx: any): void {
  const root = projectsRoot()
  console.log(`deep-projects: projects root ${root}`)

  // Web routes — the /api channel only exists in web profiles; a tui profile
  // still gets the agent tools.
  if (ctx.connection?.fetch?.register) {
    for (const route of buildRoutes(root)) {
      ctx.effect(
        () => ctx.connection.fetch.register({
          path: route.path,
          methods: route.methods,
          requestBody: 'buffered',
          fetch: async (request: Request): Promise<Response> => {
            try {
              return await route.handle(request)
            } catch (error) {
              return json({ ok: false, code: 'internalError', error: describe(error) }, 500)
            }
          },
        }),
        `deep-projects.route${route.path}`,
      )
    }
  }

  // Move a chat into a project (slug) or out of one (no slug): changes the
  // Session's working directory through dsh's working-directory service, as
  // Agent maintenance so it never lands mid-turn. "Out" returns to the chat's
  // original folder, or dsh's default folder when that was a project too.
  if (ctx.connection?.fetch?.register && ctx.workingDirectory) {
    ctx.effect(() => ctx.connection.fetch.register({
      path: '/api/deep-projects/move',
      methods: ['POST'],
      requestBody: 'buffered',
      fetch: async (request: Request): Promise<Response> => {
        let body: { sessionId?: string; slug?: string | null } = {}
        try { body = await request.json() } catch { /* fall through */ }
        const agent = typeof body.sessionId === 'string' ? ctx.agents?.get(body.sessionId) : undefined
        if (!agent) return json({ ok: false, code: 'notLoaded', error: 'chat is not loaded' }, 409)
        let target: string
        if (body.slug) {
          if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(body.slug)) return json({ ok: false, code: 'badSlug', error: 'invalid slug' }, 400)
          target = join(root, body.slug)
        } else {
          const original: string | undefined = agent.session.header?.cwd
          const inProjects = !original || original === root || original.startsWith(root + '/')
          target = inProjects ? ctx.workingDirectory.defaultDirectory : original
        }
        try {
          let cwd = ''
          await agent.runMaintenance(async (signal: AbortSignal) => { cwd = await ctx.workingDirectory.set(agent, target, signal) })
          return json({ ok: true, cwd })
        } catch (error) {
          return json({ ok: false, code: 'busy', error: describe(error) }, 409)
        }
      },
    }), 'deep-projects.route/api/deep-projects/move')
  }

  // Tools are per-agent: register on every agent as it is created.
  if (ctx.on && ctx.agents) {
    ctx.on('agent/created', ({ agent }: { agent: any }) => {
      for (const tool of buildTools(root)) {
        ctx.effect(
          () => agent.ctx.tools.register(tool),
          `deep-projects.tool.${tool.name}`,
        )
      }
    })
    // Agents that already exist at plugin load (e.g. a restart with a live
    // session): register for those too, if the roots() list is available.
    try {
      for (const agent of ctx.agents.roots?.() ?? []) {
        for (const tool of buildTools(root)) {
          ctx.effect(
            () => agent.ctx.tools.register(tool),
            `deep-projects.tool.${tool.name}`,
          )
        }
      }
    } catch { /* roots() unavailable — agent/created covers the rest */ }
  }
}
