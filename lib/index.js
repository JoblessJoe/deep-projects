// src/index.ts
import { homedir } from "node:os";
import { join as join2 } from "node:path";

// src/core.ts
import {
  mkdir,
  rm,
  readdir,
  readFile,
  writeFile,
  stat,
  cp
} from "node:fs/promises";
import { join, basename } from "node:path";
var STATE_NAME = ".projects.json";
var AGENTS_NAME = "AGENTS.md";
var KNOWLEDGE_DIR = "knowledge";
var DEFAULT_AGENTS = `# Project instructions

Describe the project, its conventions, and anything the agent should always
know when working here.

Read files in knowledge/ when relevant.
`;
var MEMORY_NAME = "AGENTS.local.md";
var LEGACY_NOTES = "notes.md";
var MEMORY_MAX = 2e4;
var MEMORY_HEADER = `# Project memory

<!-- deep-projects: loaded into every chat in this project. Agents: the project goal
says what this project is for; keep your work aligned with it and update it with
projects_update when the user changes direction. Keep the memory list current: add
lasting facts, decisions and user preferences with projects_add_note; fix or remove
wrong or stale lines with projects_set_memory. One bullet per memory. -->
`;
var GOAL_OPEN = "## Project goal\n<!-- dsh-projects:goal -->\n";
var GOAL_CLOSE = "\n<!-- /dsh-projects:goal -->\n";
var GOAL_MAX = 2e3;
async function memoryFile(root, slug) {
  const rec = (await listProjects(root)).find((r) => r.slug === slug);
  if (!rec) throw new Error("no such project");
  const dir = join(root, slug);
  const path = join(dir, MEMORY_NAME);
  try {
    await stat(path);
  } catch {
    let legacy = "";
    try {
      legacy = await readFile(join(dir, LEGACY_NOTES), "utf8");
    } catch {
    }
    if (legacy.trim()) {
      await writeFile(path, MEMORY_HEADER + "\n" + legacy.trimEnd() + "\n");
      await rm(join(dir, LEGACY_NOTES), { force: true });
    }
  }
  return path;
}
function parseMemory(text) {
  let rest = text.replace(/^# Project memory\n\n<!--[\s\S]*?-->\n/, "").replace(/^\n+/, "");
  let goal = "";
  if (rest.startsWith(GOAL_OPEN)) {
    const end = rest.indexOf(GOAL_CLOSE);
    if (end >= 0) {
      goal = rest.slice(GOAL_OPEN.length, end).trim();
      rest = rest.slice(end + GOAL_CLOSE.length).replace(/^\n+/, "");
    }
  }
  return { goal, body: rest };
}
async function readMemory(root, slug) {
  const path = await memoryFile(root, slug);
  let text = "";
  try {
    text = await readFile(path, "utf8");
  } catch {
  }
  return { path, ...parseMemory(text) };
}
async function writeMemory(path, goal, body) {
  await writeFile(path, MEMORY_HEADER + (goal ? "\n" + GOAL_OPEN + goal + GOAL_CLOSE : "") + (body ? "\n" + body + "\n" : ""));
}
async function readNotes(root, slug) {
  return (await readMemory(root, slug)).body;
}
async function setNotes(root, slug, text) {
  const { path, goal } = await readMemory(root, slug);
  const body = parseMemory(text).body.trim();
  if (body.length > MEMORY_MAX) throw new Error(`memory too long (max ${MEMORY_MAX} chars)`);
  await writeMemory(path, goal, body);
  return body ? body + "\n" : "";
}
async function readGoal(root, slug) {
  return (await readMemory(root, slug)).goal;
}
async function setGoal(root, slug, text) {
  const { path, body } = await readMemory(root, slug);
  const goal = text.trim();
  if (goal.length > GOAL_MAX) throw new Error(`goal too long (max ${GOAL_MAX} chars)`);
  await writeMemory(path, goal, body.trim());
  return goal;
}
async function appendNote(root, slug, text) {
  const body = text.trim().replace(/\s+/g, " ");
  if (!body) throw new Error("empty note");
  if (body.length > 2e3) throw new Error("note too long (max 2000 chars)");
  const existing = (await readNotes(root, slug)).trimEnd();
  const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  return setNotes(root, slug, (existing ? existing + "\n" : "") + `- ${body} _(${stamp})_`);
}
function slugify(name) {
  const s = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  if (!s) throw new Error("invalid name");
  return s;
}
function statePath(root) {
  return join(root, STATE_NAME);
}
async function loadState(root) {
  try {
    const raw = await readFile(statePath(root), "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
  }
  return reconcile(root, []);
}
async function saveState(root, records) {
  await mkdir(root, { recursive: true });
  await writeFile(statePath(root), JSON.stringify(records, null, 2));
}
async function reconcile(root, records) {
  let entries = [];
  try {
    entries = (await readdir(root)).filter((n) => !n.startsWith(".") && !n.endsWith(STATE_NAME));
  } catch {
    return records;
  }
  const bySlug = new Map(records.map((r) => [r.slug, r]));
  const out = [];
  for (const name of entries.sort()) {
    try {
      const st = await stat(join(root, name));
      if (!st.isDirectory()) continue;
    } catch {
      continue;
    }
    const existing = bySlug.get(name);
    if (existing) {
      out.push(existing);
      continue;
    }
    out.push({
      slug: name,
      name,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return out;
}
async function listProjects(root) {
  const records = await loadState(root);
  const reconciled = await reconcile(root, records);
  if (reconciled.length !== records.length) {
    await saveState(root, reconciled);
  }
  return reconciled;
}
async function getProject(root, slug) {
  const records = await listProjects(root);
  const rec = records.find((r) => r.slug === slug);
  if (!rec) return null;
  let instructions = "";
  try {
    instructions = await readFile(join(root, slug, AGENTS_NAME), "utf8");
  } catch {
  }
  let knowledge = [];
  try {
    const files = await readdir(join(root, slug, KNOWLEDGE_DIR));
    knowledge = (await Promise.all(files.map(async (f) => {
      const st = await stat(join(root, slug, KNOWLEDGE_DIR, f));
      if (!st.isFile()) return null;
      return { name: f, size: st.size, mtime: st.mtimeMs };
    }))).filter(Boolean);
  } catch {
  }
  return { ...rec, instructions, knowledge, goal: await readGoal(root, slug) };
}
async function createProject(root, name, description) {
  const records = await listProjects(root);
  const slugs = new Set(records.map((r) => r.slug));
  let slug = slugify(name);
  if (slugs.has(slug)) {
    let n = 2;
    while (slugs.has(`${slug}-${n}`)) n++;
    slug = `${slug}-${n}`;
  }
  const dir = join(root, slug);
  await mkdir(join(dir, KNOWLEDGE_DIR), { recursive: true });
  await writeFile(join(dir, AGENTS_NAME), DEFAULT_AGENTS);
  const createdAt = (/* @__PURE__ */ new Date()).toISOString();
  if (description.trim()) {
    await writeFile(join(dir, "README.md"), description.trim() + "\n");
  }
  records.push({ slug, name: name.trim(), description: description.trim() || void 0, createdAt });
  await saveState(root, records);
  return { slug, name: name.trim(), description: description.trim(), createdAt };
}
async function deleteProject(root, slug) {
  const records = (await listProjects(root)).filter((r) => r.slug !== slug);
  await saveState(root, records);
  await rm(join(root, slug), { recursive: true, force: true });
}
async function setStarred(root, slug, starred) {
  return setFlag(root, slug, { starred });
}
async function setArchived(root, slug, archived) {
  return setFlag(root, slug, archived ? { archived: true, starred: false } : { archived: false });
}
async function setFlag(root, slug, patch) {
  const records = await listProjects(root);
  const rec = records.find((r) => r.slug === slug);
  if (!rec) return null;
  Object.assign(rec, patch);
  await saveState(root, records);
  return rec;
}
async function setInstructions(root, slug, text) {
  const rec = (await listProjects(root)).find((r) => r.slug === slug);
  if (!rec) throw new Error("no such project");
  await writeFile(join(root, slug, AGENTS_NAME), text);
}
async function renameProject(root, slug, patch) {
  const records = await listProjects(root);
  const rec = records.find((r) => r.slug === slug);
  if (!rec) throw new Error("no such project");
  if (patch.name !== void 0) {
    const name = patch.name.trim();
    if (!name || name.length > 60) throw new Error("name must be 1-60 chars");
    rec.name = name;
  }
  if (patch.description !== void 0) {
    const d = patch.description.trim();
    rec.description = d || void 0;
    if (d) await writeFile(join(root, slug, "README.md"), d + "\n");
    else await rm(join(root, slug, "README.md"), { force: true });
  }
  await saveState(root, records);
  return rec;
}
async function importKnowledge(root, slug, src) {
  const rec = (await listProjects(root)).find((r) => r.slug === slug);
  if (!rec) throw new Error("no such project");
  const destDir = join(root, slug, KNOWLEDGE_DIR);
  await mkdir(destDir, { recursive: true });
  const name = basename(src);
  const dest = join(destDir, name);
  await cp(src, dest, { recursive: true });
  return name;
}
async function deleteKnowledge(root, slug, name) {
  const rec = (await listProjects(root)).find((r) => r.slug === slug);
  if (!rec) throw new Error("no such project");
  if (name.includes("/") || name.includes("\\") || name.startsWith(".")) {
    throw new Error("invalid file name");
  }
  await rm(join(root, slug, KNOWLEDGE_DIR, name), { recursive: true, force: true });
}

// src/index.ts
var MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
function projectsRoot() {
  return process.env.DSH_PROJECTS_ROOT?.trim() || join2(homedir(), "deep-projects");
}
function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}
function describe(error) {
  return error instanceof Error ? error.message : String(error);
}
function buildRoutes(root) {
  const parse = (request) => new URL(request.url).searchParams;
  const guard = (request) => {
    const slug = parse(request).get("slug") ?? "";
    if (!/^[a-z0-9][a-z0-9-]{0,59}$/.test(slug)) {
      return json({ ok: false, code: "badSlug", error: "invalid slug" }, 400);
    }
    return null;
  };
  return [
    {
      path: "/api/deep-projects/list",
      methods: ["GET"],
      handle: async () => {
        const { readdir: readdir2 } = await import("node:fs/promises");
        const projects = await listProjects(root).then(async (records) => {
          return Promise.all(records.map(async (r) => {
            let fileCount = 0;
            try {
              fileCount = (await readdir2(join2(root, r.slug, "knowledge"))).length;
            } catch {
            }
            return { ...r, path: join2(root, r.slug), fileCount };
          }));
        });
        return json({ ok: true, projects });
      }
    },
    {
      path: "/api/deep-projects/create",
      methods: ["POST"],
      handle: async (request) => {
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        const name = (body.name ?? "").trim();
        if (!name || name.length > 60) {
          return json({ ok: false, code: "badName", error: "name required (1-60 chars)" }, 400);
        }
        try {
          const project = await createProject(root, name, (body.description ?? "").trim());
          return json({ ok: true, project: { ...project, path: join2(root, project.slug) } });
        } catch (error) {
          return json({ ok: false, code: "internalError", error: describe(error) }, 500);
        }
      }
    },
    {
      path: "/api/deep-projects/detail",
      methods: ["GET"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        const slug = parse(request).get("slug");
        const project = await getProject(root, slug);
        if (!project) return json({ ok: false, code: "notFound", error: "no such project" }, 404);
        return json({ ok: true, project: { ...project, path: join2(root, slug) } });
      }
    },
    {
      path: "/api/deep-projects/rename",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        const name = body.name === void 0 ? void 0 : body.name.trim();
        if (name !== void 0 && (!name || name.length > 60)) {
          return json({ ok: false, code: "badName", error: "name required (1-60 chars)" }, 400);
        }
        if (typeof body.description === "string" && body.description.length > 500) {
          return json({ ok: false, code: "badName", error: "description too long (max 500)" }, 400);
        }
        try {
          const project = await renameProject(root, parse(request).get("slug"), {
            name,
            description: typeof body.description === "string" ? body.description : void 0
          });
          if (typeof body.goal === "string") await setGoal(root, parse(request).get("slug"), body.goal);
          return json({ ok: true, project });
        } catch (error) {
          return json({ ok: false, code: "notFound", error: describe(error) }, 404);
        }
      }
    },
    {
      path: "/api/deep-projects/star",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        try {
          const project = await setStarred(root, parse(request).get("slug"), !!body.starred);
          if (!project) return json({ ok: false, code: "notFound", error: "no such project" }, 404);
          return json({ ok: true, project });
        } catch (error) {
          return json({ ok: false, code: "internalError", error: describe(error) }, 500);
        }
      }
    },
    {
      path: "/api/deep-projects/archive",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        const project = await setArchived(root, parse(request).get("slug"), !!body.archived);
        if (!project) return json({ ok: false, code: "notFound", error: "no such project" }, 404);
        return json({ ok: true, project });
      }
    },
    {
      path: "/api/deep-projects/instructions",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        const declared = Number(request.headers.get("content-length") ?? "");
        if (declared > 512 * 1024) {
          return json({ ok: false, code: "bodyTooLarge", error: "instructions too large" }, 413);
        }
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        if (typeof body.text !== "string") {
          return json({ ok: false, code: "badText", error: "text required" }, 400);
        }
        try {
          await setInstructions(root, parse(request).get("slug"), body.text);
          return json({ ok: true });
        } catch (error) {
          return json({ ok: false, code: "notFound", error: describe(error) }, 404);
        }
      }
    },
    {
      path: "/api/deep-projects/delete",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        try {
          await deleteProject(root, parse(request).get("slug"));
          return json({ ok: true });
        } catch (error) {
          return json({ ok: false, code: "notFound", error: describe(error) }, 404);
        }
      }
    },
    {
      // Raw binary body (no multipart): the browser sends the File bytes
      // directly; the filename travels as a query parameter.
      path: "/api/deep-projects/knowledge-upload",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        const name = (parse(request).get("name") ?? "").trim();
        if (!name || name.includes("/") || name.includes("\\") || name.startsWith(".")) {
          return json({ ok: false, code: "badName", error: "invalid file name" }, 400);
        }
        const declared = Number(request.headers.get("content-length") ?? "");
        if (declared > MAX_UPLOAD_BYTES) {
          return json({ ok: false, code: "bodyTooLarge", params: { max: MAX_UPLOAD_BYTES }, error: "file too large" }, 413);
        }
        const bytes = new Uint8Array(await request.arrayBuffer());
        if (bytes.byteLength > MAX_UPLOAD_BYTES) {
          return json({ ok: false, code: "bodyTooLarge", params: { max: MAX_UPLOAD_BYTES }, error: "file too large" }, 413);
        }
        const { writeFile: writeFile2, mkdir: mkdir2 } = await import("node:fs/promises");
        const destDir = join2(root, parse(request).get("slug"), "knowledge");
        await mkdir2(destDir, { recursive: true });
        await writeFile2(join2(destDir, name), bytes);
        return json({ ok: true, name });
      }
    },
    {
      // Project memory (AGENTS.local.md): GET reads, POST replaces the body.
      path: "/api/deep-projects/notes",
      methods: ["GET", "POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        const slug = parse(request).get("slug");
        if (request.method === "POST") {
          let body = {};
          try {
            body = await request.json();
          } catch {
          }
          if (typeof body.text !== "string") return json({ ok: false, code: "badText", error: "text required" }, 400);
          try {
            return json({ ok: true, notes: await setNotes(root, slug, body.text) });
          } catch (error) {
            return json({ ok: false, code: "badText", error: describe(error) }, 400);
          }
        }
        try {
          return json({ ok: true, notes: await readNotes(root, slug) });
        } catch (error) {
          return json({ ok: false, code: "notFound", error: describe(error) }, 404);
        }
      }
    },
    {
      path: "/api/deep-projects/note",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        let body = {};
        try {
          body = await request.json();
        } catch {
        }
        if (typeof body.text !== "string" || !body.text.trim()) {
          return json({ ok: false, code: "badText", error: "text required" }, 400);
        }
        try {
          const notes = await appendNote(root, parse(request).get("slug"), body.text);
          return json({ ok: true, notes });
        } catch (error) {
          return json({ ok: false, code: "badText", error: describe(error) }, 400);
        }
      }
    },
    {
      path: "/api/deep-projects/knowledge-delete",
      methods: ["POST"],
      handle: async (request) => {
        const bad = guard(request);
        if (bad) return bad;
        const name = parse(request).get("name") ?? "";
        if (!name || name.includes("/") || name.includes("\\") || name.startsWith(".")) {
          return json({ ok: false, code: "badName", error: "invalid file name" }, 400);
        }
        try {
          await deleteKnowledge(root, parse(request).get("slug"), name);
          return json({ ok: true });
        } catch (error) {
          return json({ ok: false, code: "notFound", error: describe(error) }, 404);
        }
      }
    }
  ];
}
function buildTools(root) {
  const render = (_args, value) => [{ type: "text", text: JSON.stringify(value) }];
  const recordSchema = {
    type: "object",
    properties: {
      slug: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      starred: { type: "boolean" },
      createdAt: { type: "string" }
    },
    required: ["slug", "name", "createdAt"]
  };
  return [
    {
      name: "projects_list",
      description: "List projects: named workspaces (each with AGENTS.md instructions and a knowledge/ folder) that group related chats. Returns slug, name, description, and star state.",
      parameters: { type: "object", properties: {} },
      output: {
        schema: {
          type: "object",
          properties: { projects: { type: "array", items: recordSchema } },
          required: ["projects"]
        },
        render
      },
      execute: async () => ({ projects: await listProjects(root) })
    },
    {
      name: "projects_create",
      description: "Create a new dsh-project workspace (folder + AGENTS.md + knowledge/). Use when the user asks to start a project or to group work under a name.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Display name (1-60 chars)." },
          description: { type: "string", description: "Optional one-line description." }
        },
        required: ["name"]
      },
      output: {
        schema: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            project: recordSchema,
            path: { type: "string" }
          },
          required: ["ok", "project", "path"]
        },
        render
      },
      execute: async (args) => {
        const project = await createProject(root, args.name, args.description ?? "");
        return { ok: true, project, path: join2(root, project.slug) };
      }
    },
    {
      name: "projects_read",
      description: "Read a dsh-project: goal, custom instructions (AGENTS.md), project memory, and the list of knowledge files.",
      parameters: {
        type: "object",
        properties: { slug: { type: "string", description: "Project slug from projects_list." } },
        required: ["slug"]
      },
      output: {
        schema: {
          type: "object",
          properties: {
            slug: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            starred: { type: "boolean" },
            createdAt: { type: "string" },
            instructions: { type: "string" },
            goal: { type: "string" },
            memory: { type: "string" },
            knowledge: {
              type: "array",
              items: {
                type: "object",
                properties: { name: { type: "string" }, size: { type: "number" }, mtime: { type: "number" } },
                required: ["name", "size", "mtime"]
              }
            }
          },
          required: ["slug", "name", "createdAt", "instructions", "knowledge"]
        },
        render
      },
      execute: async (args) => {
        const project = await getProject(root, args.slug);
        if (!project) throw new Error("no such project: " + args.slug);
        return { ...project, memory: await readNotes(root, args.slug) };
      }
    },
    {
      name: "projects_update",
      description: "Change a dsh-project's settings: name, description, goal, custom instructions (replaces AGENTS.md), pinned, and/or archived state. Pass only the fields to change. For memories use projects_add_note / projects_set_memory instead.",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Project slug from projects_list." },
          name: { type: "string", description: "New display name (1-60 chars)." },
          description: { type: "string", description: "New one-line description (empty clears it)." },
          goal: { type: "string", description: "What the project is for / what done looks like (empty clears it). Shown to every chat in the project." },
          instructions: { type: "string", description: "Full new AGENTS.md content (replaces it; read it with projects_read first)." },
          pinned: { type: "boolean", description: "Pin to (true) or unpin from (false) the sidebar." },
          archived: { type: "boolean", description: "Archive (true: hidden from lists, files kept) or restore (false)." }
        },
        required: ["slug"]
      },
      output: {
        schema: {
          type: "object",
          properties: { ok: { type: "boolean" }, changed: { type: "array", items: { type: "string" } } },
          required: ["ok", "changed"]
        },
        render
      },
      execute: async (args) => {
        const changed = [];
        if (args.name !== void 0 || args.description !== void 0) {
          await renameProject(root, args.slug, { name: args.name, description: args.description });
          if (args.name !== void 0) changed.push("name");
          if (args.description !== void 0) changed.push("description");
        }
        if (args.goal !== void 0) {
          await setGoal(root, args.slug, args.goal);
          changed.push("goal");
        }
        if (args.instructions !== void 0) {
          if (args.instructions.length > 2e5) throw new Error("instructions too large");
          await setInstructions(root, args.slug, args.instructions);
          changed.push("instructions");
        }
        if (args.pinned !== void 0) {
          await setStarred(root, args.slug, args.pinned);
          changed.push("pinned");
        }
        if (args.archived !== void 0) {
          await setArchived(root, args.slug, args.archived);
          changed.push("archived");
        }
        return { ok: true, changed };
      }
    },
    {
      name: "projects_add_knowledge",
      description: "Copy an existing file (or directory) from disk into a project's knowledge/ folder so future chats in that workspace can read it.",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Project slug." },
          source: { type: "string", description: "Absolute path of the file or directory to copy." }
        },
        required: ["slug", "source"]
      },
      output: {
        schema: {
          type: "object",
          properties: { ok: { type: "boolean" }, name: { type: "string" } },
          required: ["ok", "name"]
        },
        render
      },
      execute: async (args) => {
        const name = await importKnowledge(root, args.slug, args.source);
        return { ok: true, name };
      }
    },
    {
      name: "projects_add_note",
      description: "Add one memory to a project's memory (AGENTS.local.md, auto-loaded into every chat in that project). Use proactively whenever you learn a lasting fact, decision, or user preference about the project. Don't add duplicates; use projects_set_memory to fix stale ones.",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Project slug from projects_list." },
          text: { type: "string", description: "The memory (one line, max 2000 chars)." }
        },
        required: ["slug", "text"]
      },
      output: {
        schema: {
          type: "object",
          properties: { ok: { type: "boolean" }, notes: { type: "string" } },
          required: ["ok", "notes"]
        },
        render
      },
      execute: async (args) => {
        const notes = await appendNote(root, args.slug, args.text);
        return { ok: true, notes };
      }
    },
    {
      name: "projects_set_memory",
      description: "Replace a project's whole memory list (AGENTS.local.md body; the header is kept). Use to correct, merge, or remove wrong or outdated memories. Pass every bullet you want to keep, one '- ' line each. Returns the saved memory.",
      parameters: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Project slug from projects_list." },
          text: { type: "string", description: "Full new memory body: markdown bullets, one per line (max 20000 chars). Empty clears it." }
        },
        required: ["slug", "text"]
      },
      output: {
        schema: {
          type: "object",
          properties: { ok: { type: "boolean" }, notes: { type: "string" } },
          required: ["ok", "notes"]
        },
        render
      },
      execute: async (args) => {
        const notes = await setNotes(root, args.slug, args.text);
        return { ok: true, notes };
      }
    },
    {
      name: "projects_delete",
      description: "Delete a dsh-project: removes its folder (instructions, knowledge files) and metadata. Existing sessions are kept.",
      parameters: {
        type: "object",
        properties: { slug: { type: "string", description: "Project slug to delete." } },
        required: ["slug"]
      },
      output: {
        schema: {
          type: "object",
          properties: { ok: { type: "boolean" } },
          required: ["ok"]
        },
        render
      },
      execute: async (args) => {
        await deleteProject(root, args.slug);
        return { ok: true };
      }
    }
  ];
}
var inject = ["connection", "agents"];
function apply(ctx) {
  const root = projectsRoot();
  console.log(`deep-projects: projects root ${root}`);
  if (ctx.connection?.fetch?.register) {
    for (const route of buildRoutes(root)) {
      ctx.effect(
        () => ctx.connection.fetch.register({
          path: route.path,
          methods: route.methods,
          requestBody: "buffered",
          fetch: async (request) => {
            try {
              return await route.handle(request);
            } catch (error) {
              return json({ ok: false, code: "internalError", error: describe(error) }, 500);
            }
          }
        }),
        `deep-projects.route${route.path}`
      );
    }
  }
  if (ctx.on && ctx.agents) {
    ctx.on("agent/created", ({ agent }) => {
      for (const tool of buildTools(root)) {
        ctx.effect(
          () => agent.ctx.tools.register(tool),
          `deep-projects.tool.${tool.name}`
        );
      }
    });
    try {
      for (const agent of ctx.agents.roots?.() ?? []) {
        for (const tool of buildTools(root)) {
          ctx.effect(
            () => agent.ctx.tools.register(tool),
            `deep-projects.tool.${tool.name}`
          );
        }
      }
    } catch {
    }
  }
}
export {
  apply,
  buildRoutes,
  buildTools,
  inject
};
