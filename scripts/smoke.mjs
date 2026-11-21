import { strict as assert } from 'node:assert'
import { mkdtemp, writeFile, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const mod = await import('../lib/index.js')
const root = await mkdtemp(join(tmpdir(), 'projtest-'))
const routes = {}
mod.buildRoutes(root).forEach((r) => { routes[r.path] = r })
console.log('routes:', Object.keys(routes).join('\n'))

const mkReq = (url, init = {}) => new Request('http://test' + url, {
  body: init.body ? (typeof init.body === 'string' ? new TextEncoder().encode(init.body) : new Uint8Array(init.body)) : undefined,
  method: init.method ?? 'GET',
  headers: init.body ? { 'content-type': 'application/octet-stream' } : {},
})
const call = async (path, url, init) => {
  const r = routes[path]; assert(r, 'missing route ' + path)
  const res = await r.handle(mkReq(url, init))
  const body = await res.json()
  return { status: res.status, body }
}

// 1. create
let r = await call('/api/deep-projects/create', '/api/deep-projects/create',
  { method: 'POST', body: JSON.stringify({ name: 'My Test', description: 'hello' }) })
assert.equal(r.status, 200, JSON.stringify(r.body)); assert.equal(r.body.ok, true, JSON.stringify(r.body))
assert.equal(r.body.project.name, 'My Test')
const slug = r.body.project.slug
console.log('created', slug, 'path', r.body.project.path)

// 2. list
r = await call('/api/deep-projects/list', '/api/deep-projects/list')
assert.equal(r.body.projects.length, 1)
assert.ok(r.body.projects[0].path.endsWith(slug))
assert.equal(typeof r.body.projects[0].fileCount, 'number')

// 3. detail
r = await call('/api/deep-projects/detail', '/api/deep-projects/detail?slug=' + slug)
assert.equal(r.body.ok, true)
assert.ok(typeof r.body.project.instructions === 'string' && r.body.project.instructions.length > 0)
assert.ok(Array.isArray(r.body.project.knowledge))
assert.ok(r.body.project.path.endsWith(slug))

// 4. instructions
r = await call('/api/deep-projects/instructions', '/api/deep-projects/instructions?slug=' + slug,
  { method: 'POST', body: JSON.stringify({ text: '# Test\nrules' }) })
assert.equal(r.body.ok, true)
r = await call('/api/deep-projects/detail', '/api/deep-projects/detail?slug=' + slug)
assert.equal(r.body.project.instructions, '# Test\nrules')
// AGENTS.md on disk:
const onDisk = await readFile(join(root, slug, 'AGENTS.md'), 'utf8')
assert.equal(onDisk, '# Test\nrules')

// 5. knowledge upload (raw binary)
const bytes = new TextEncoder().encode('knowledge content 123')
r = await call('/api/deep-projects/knowledge-upload',
  '/api/deep-projects/knowledge-upload?slug=' + slug + '&name=spec.txt',
  { method: 'POST', body: bytes })
assert.equal(r.body.ok, true); assert.equal(r.body.name, 'spec.txt')
r = await call('/api/deep-projects/detail', '/api/deep-projects/detail?slug=' + slug)
assert.equal(r.body.project.knowledge.length, 1)
assert.equal(r.body.project.knowledge[0].name, 'spec.txt')
assert.equal(r.body.project.knowledge[0].size, bytes.byteLength)

// 6. star
r = await call('/api/deep-projects/star', '/api/deep-projects/star?slug=' + slug,
  { method: 'POST', body: JSON.stringify({ starred: true }) })
assert.equal(r.body.project.starred, true)

// 7. rename
r = await call('/api/deep-projects/rename', '/api/deep-projects/rename?slug=' + slug,
  { method: 'POST', body: JSON.stringify({ name: 'Renamed' }) })
assert.equal(r.body.project.name, 'Renamed')

// 8. knowledge delete
r = await call('/api/deep-projects/knowledge-delete',
  '/api/deep-projects/knowledge-delete?slug=' + slug + '&name=spec.txt', { method: 'POST' })
assert.equal(r.body.ok, true)

// 8b. memory: legacy notes.md migrates into auto-loaded AGENTS.local.md; add + replace keep the header
await writeFile(join(root, slug, 'notes.md'), '- old fact\n')
r = await call('/api/deep-projects/notes', '/api/deep-projects/notes?slug=' + slug)
assert.equal(r.body.notes, '- old fact\n')
r = await call('/api/deep-projects/note', '/api/deep-projects/note?slug=' + slug, { method: 'POST', body: JSON.stringify({ text: 'new fact' }) })
assert.match(r.body.notes, /^- old fact\n- new fact _\(\d{4}-\d\d-\d\d\)_\n$/)
r = await call('/api/deep-projects/notes', '/api/deep-projects/notes?slug=' + slug, { method: 'POST', body: JSON.stringify({ text: '- only this\n' }) })
assert.equal(r.body.notes, '- only this\n')
const mem = await readFile(join(root, slug, 'AGENTS.local.md'), 'utf8')
assert(mem.startsWith(mod.MEMORY_HEADER ?? '# Project memory') && mem.endsWith('- only this\n'), mem)
await assert.rejects(readFile(join(root, slug, 'notes.md')))

// 8c. agent tools: projects_update edits settings, projects_read returns memory
const tools = Object.fromEntries(mod.buildTools(root).map((t) => [t.name, t]))
const up = await tools.projects_update.execute({ slug, name: 'Renamed', description: 'new desc', instructions: '# hi\n', pinned: true })
assert.deepEqual(up.changed, ['name', 'description', 'instructions', 'pinned'])
const rd = await tools.projects_read.execute({ slug })
assert.equal(rd.name, 'Renamed'); assert.equal(rd.description, 'new desc'); assert.equal(rd.instructions, '# hi\n')
assert.equal(rd.starred, true); assert.equal(rd.memory, '- only this\n')
assert.equal(await readFile(join(root, slug, 'README.md'), 'utf8'), 'new desc\n')

// 8d. archive hides from nothing server-side but flags + unpins; restore clears
r = await call('/api/deep-projects/archive', '/api/deep-projects/archive?slug=' + slug, { method: 'POST', body: JSON.stringify({ archived: true }) })
assert.equal(r.body.project.archived, true); assert.equal(r.body.project.starred, false)
r = await call('/api/deep-projects/rename', '/api/deep-projects/rename?slug=' + slug, { method: 'POST', body: JSON.stringify({ description: 'edited' }) })
assert.equal(r.body.project.description, 'edited'); assert.equal(r.body.project.name, 'Renamed')
await tools.projects_update.execute({ slug, archived: false })
assert.equal((await tools.projects_read.execute({ slug })).archived, false)

// 8e. goal lives in the auto-loaded memory file, survives memory edits, shows in read
await tools.projects_update.execute({ slug, goal: 'Ship it' })
await tools.projects_add_note.execute({ slug, text: 'after goal' })
const rg = await tools.projects_read.execute({ slug })
assert.equal(rg.goal, 'Ship it'); assert.match(rg.memory, /after goal/); assert.doesNotMatch(rg.memory, /Ship it/)
assert.match(await readFile(join(root, slug, 'AGENTS.local.md'), 'utf8'), /## Project goal[\s\S]*Ship it[\s\S]*after goal/)

// 9. delete project
r = await call('/api/deep-projects/delete', '/api/deep-projects/delete?slug=' + slug, { method: 'POST' })
assert.equal(r.body.ok, true)
r = await call('/api/deep-projects/list', '/api/deep-projects/list')
assert.equal(r.body.projects.length, 0)

await rm(root, { recursive: true, force: true })
console.log('ALL ROUTE TESTS PASSED')
