// deep-projects client bundle (esbuild CJS + __ModuleLoader__ banner). Do not edit.
window.__ModuleLoader__.load({id:"deep-projects",factory:Pt=>{
var module={exports:{}},exports=module.exports,require=Pt;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  PANEL_ID: () => PANEL_ID,
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/locales.ts
var en = {
  "nav": "Projects",
  "tab.title": "Projects",
  "tab.project": "Project",
  "tab.project.hint": "Memories, instructions, and knowledge for this project \u2014 the agent loads them in every chat that opens here.",
  "header.open": "Project info",
  "hero.project": "Project",
  "tree.title": "Projects",
  "tree.search": "Filter projects\u2026",
  "tree.collapse": "Collapse",
  "tree.expand": "Expand",
  "tree.pin": "Pin in sidebar (built-in panel pin)",
  "memory.title": "Memory",
  "memory.hint": "Loaded into every chat in this project. Agents add and update entries as they learn; you can edit them too.",
  "memory.edit": "Edit",
  "memory.placeholder.edit": "- One memory per line",
  "knowledge.drop": "Drop files here, or click to upload",
  "menu.more": "More",
  "menu.open": "Open project",
  "menu.edit": "Edit name & description",
  "menu.archive": "Archive",
  "menu.unarchive": "Restore from archive",
  "tree.archived": "Archived",
  "detail.archived": "Archived",
  "goal.title": "Goal",
  "goal.placeholder": "What is this project for? What does done look like?",
  "goal.empty": "Set a goal. Every chat in this project will see it.",
  "note.title": "Quick memory",
  "note.hint": "One line the agent will remember for this project \u2014 saved as a dated bullet in notes.md (inside the project folder).",
  "note.placeholder": "e.g. The production database is read-only; never write to it from here.",
  "note.add": "Add",
  "note.added": "Saved.",
  "note.error": "Could not save the note.",
  "note.empty": "No memories yet.",
  "note.view": "notes.md",
  "note.collapse": "Hide notes",
  "empty.title": "No projects yet",
  "empty.hint": "Create a project to group chats, instructions, and knowledge files under one workspace.",
  "create.title": "New project",
  "create.name": "Name",
  "create.name.placeholder": "My project",
  "create.description": "Description (optional)",
  "create.description.placeholder": "What is this project about?",
  "create.submit": "Create",
  "create.cancel": "Cancel",
  "create.invalid": "Name must be 1-60 characters (letters, numbers, - _).",
  "create.exists": "A project with this name already exists.",
  "create.error": "Could not create the project.",
  "detail.back": "All projects",
  "detail.open": "Open chat",
  "detail.newChat": "New chat",
  "detail.star": "Pin to sidebar",
  "detail.unstar": "Unpin",
  "row.pin": "Pin in sidebar",
  "row.unpin": "Unpin from sidebar",
  "row.newChat": "New chat in this project",
  "detail.delete": "Delete project",
  "detail.delete.confirm": "This deletes the project folder (instructions, knowledge files) and its metadata. Sessions are kept. Continue?",
  "section.instructions": "Custom instructions",
  "instructions.hint": "Stored in AGENTS.md in the project folder. The agent loads it automatically in every chat that opens here.",
  "instructions.save": "Save",
  "instructions.saved": "Saved.",
  "instructions.error": "Could not save instructions.",
  "instructions.placeholder": "# Project instructions\n\nDescribe the project, conventions, and anything the agent should always know\u2026",
  "section.knowledge": "Knowledge files",
  "knowledge.hint": "Files the agent can read in this project (docs, specs, references).",
  "knowledge.upload": "Upload files",
  "knowledge.empty": "No knowledge files yet.",
  "knowledge.delete": "Delete",
  "knowledge.error": "Upload failed.",
  "section.sessions": "Chats in this project",
  "sessions.empty": "No chats yet. Start one with \u201CNew chat\u201D.",
  "sessions.new": "New chat",
  "session.none.title": "Untitled",
  "loading": "Loading\u2026",
  "error.generic": "Something went wrong.",
  "retry": "Retry",
  "path.label": "Folder",
  "created.label": "Created",
  "chats.label": "chats",
  "files.label": "files"
};
var zh = {
  "nav": "\u9879\u76EE",
  "goal.title": "\u76EE\u6807",
  "goal.placeholder": "\u8FD9\u4E2A\u9879\u76EE\u662F\u505A\u4EC0\u4E48\u7684\uFF1F\u600E\u6837\u7B97\u5B8C\u6210\uFF1F",
  "goal.empty": "\u8BBE\u7F6E\u76EE\u6807\uFF0C\u672C\u9879\u76EE\u7684\u6BCF\u4E2A\u5BF9\u8BDD\u90FD\u80FD\u770B\u5230\u3002",
  "menu.archive": "\u5F52\u6863",
  "menu.unarchive": "\u4ECE\u5F52\u6863\u6062\u590D",
  "tree.archived": "\u5DF2\u5F52\u6863",
  "detail.archived": "\u5DF2\u5F52\u6863",
  "menu.more": "\u66F4\u591A",
  "menu.open": "\u6253\u5F00\u9879\u76EE",
  "menu.edit": "\u7F16\u8F91\u540D\u79F0\u548C\u63CF\u8FF0",
  "memory.title": "\u8BB0\u5FC6",
  "memory.hint": "\u4F1A\u8F7D\u5165\u672C\u9879\u76EE\u7684\u6BCF\u4E2A\u5BF9\u8BDD\u3002\u667A\u80FD\u4F53\u5728\u5B66\u5230\u65B0\u4FE1\u606F\u65F6\u4F1A\u6DFB\u52A0\u548C\u66F4\u65B0\u6761\u76EE\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u7F16\u8F91\u3002",
  "memory.edit": "\u7F16\u8F91",
  "memory.placeholder.edit": "- \u6BCF\u884C\u4E00\u6761\u8BB0\u5FC6",
  "knowledge.drop": "\u62D6\u653E\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20",
  "tab.title": "\u9879\u76EE",
  "tab.project": "\u9879\u76EE",
  "tab.project.hint": "\u672C\u9879\u76EE\u7684\u8BB0\u5FC6\u3001\u6307\u4EE4\u4E0E\u77E5\u8BC6\u6587\u4EF6\u2014\u2014\u5728\u6B64\u6253\u5F00\u7684\u6BCF\u6B21\u804A\u5929\u90FD\u4F1A\u81EA\u52A8\u52A0\u8F7D\u3002",
  "header.open": "\u9879\u76EE\u4FE1\u606F",
  "hero.project": "\u9879\u76EE",
  "empty.title": "\u8FD8\u6CA1\u6709\u9879\u76EE",
  "empty.hint": "\u521B\u5EFA\u4E00\u4E2A\u9879\u76EE\uFF0C\u628A\u804A\u5929\u3001\u6307\u4EE4\u548C\u77E5\u8BC6\u6587\u4EF6\u5F52\u5230\u540C\u4E00\u4E2A\u5DE5\u4F5C\u533A\u3002",
  "create.title": "\u65B0\u5EFA\u9879\u76EE",
  "create.name": "\u540D\u79F0",
  "create.name.placeholder": "\u6211\u7684\u9879\u76EE",
  "create.description": "\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09",
  "create.description.placeholder": "\u8FD9\u4E2A\u9879\u76EE\u662F\u505A\u4EC0\u4E48\u7684\uFF1F",
  "create.submit": "\u521B\u5EFA",
  "create.cancel": "\u53D6\u6D88",
  "create.invalid": "\u540D\u79F0\u9700\u4E3A 1-60 \u4E2A\u5B57\u7B26\uFF08\u5B57\u6BCD\u3001\u6570\u5B57\u3001- _\uFF09\u3002",
  "create.exists": "\u5DF2\u5B58\u5728\u540C\u540D\u9879\u76EE\u3002",
  "create.error": "\u65E0\u6CD5\u521B\u5EFA\u9879\u76EE\u3002",
  "detail.back": "\u5168\u90E8\u9879\u76EE",
  "detail.open": "\u6253\u5F00\u804A\u5929",
  "detail.newChat": "\u65B0\u5EFA\u804A\u5929",
  "detail.star": "\u56FA\u5B9A\u5230\u4FA7\u680F",
  "detail.unstar": "\u53D6\u6D88\u56FA\u5B9A",
  "row.pin": "\u56FA\u5B9A\u5728\u4FA7\u680F",
  "row.unpin": "\u53D6\u6D88\u56FA\u5B9A",
  "row.newChat": "\u5728\u6B64\u9879\u76EE\u65B0\u5EFA\u804A\u5929",
  "detail.delete": "\u5220\u9664\u9879\u76EE",
  "detail.delete.confirm": "\u8FD9\u5C06\u5220\u9664\u9879\u76EE\u6587\u4EF6\u5939\uFF08\u6307\u4EE4\u3001\u77E5\u8BC6\u6587\u4EF6\uFF09\u53CA\u5176\u5143\u6570\u636E\uFF0C\u4F46\u4FDD\u7559\u4F1A\u8BDD\u3002\u7EE7\u7EED\uFF1F",
  "section.instructions": "\u81EA\u5B9A\u4E49\u6307\u4EE4",
  "instructions.hint": "\u5B58\u50A8\u5728\u9879\u76EE\u6587\u4EF6\u5939\u7684 AGENTS.md \u4E2D\u3002\u5728\u6B64\u6253\u5F00\u7684\u6BCF\u6B21\u804A\u5929\u90FD\u4F1A\u81EA\u52A8\u52A0\u8F7D\u3002",
  "instructions.save": "\u4FDD\u5B58",
  "instructions.saved": "\u5DF2\u4FDD\u5B58\u3002",
  "instructions.error": "\u65E0\u6CD5\u4FDD\u5B58\u6307\u4EE4\u3002",
  "instructions.placeholder": "# \u9879\u76EE\u6307\u4EE4\n\n\u63CF\u8FF0\u9879\u76EE\u3001\u7EA6\u5B9A\uFF0C\u4EE5\u53CA\u4EE3\u7406\u5E94\u59CB\u7EC8\u77E5\u9053\u7684\u5185\u5BB9\u2026",
  "section.knowledge": "\u77E5\u8BC6\u6587\u4EF6",
  "knowledge.hint": "\u4EE3\u7406\u5728\u672C\u9879\u76EE\u4E2D\u53EF\u8BFB\u53D6\u7684\u6587\u4EF6\uFF08\u6587\u6863\u3001\u89C4\u683C\u3001\u53C2\u8003\u8D44\u6599\uFF09\u3002",
  "knowledge.upload": "\u4E0A\u4F20\u6587\u4EF6",
  "knowledge.empty": "\u8FD8\u6CA1\u6709\u77E5\u8BC6\u6587\u4EF6\u3002",
  "knowledge.delete": "\u5220\u9664",
  "knowledge.error": "\u4E0A\u4F20\u5931\u8D25\u3002",
  "section.sessions": "\u672C\u9879\u76EE\u7684\u804A\u5929",
  "sessions.empty": "\u8FD8\u6CA1\u6709\u804A\u5929\u3002\u7528\u300C\u65B0\u5EFA\u804A\u5929\u300D\u5F00\u59CB\u3002",
  "sessions.new": "\u65B0\u5EFA\u804A\u5929",
  "session.none.title": "\u672A\u547D\u540D",
  "loading": "\u52A0\u8F7D\u4E2D\u2026",
  "error.generic": "\u51FA\u9519\u4E86\u3002",
  "retry": "\u91CD\u8BD5",
  "path.label": "\u6587\u4EF6\u5939",
  "created.label": "\u521B\u5EFA\u4E8E",
  "chats.label": "\u4E2A\u804A\u5929",
  "files.label": "\u4E2A\u6587\u4EF6"
};

// src/client/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PANEL_ID = "dsh-projects";
var TAB_ID = "dsh-projects";
var inject = ["slots", "locale", "layout", "sessions", "sidebarRight", "sidebarRightTabs", "contextMenus"];
var appCtx = null;
var STYLE_ID = "dshpx-styles";
var CSS = `
.dshpx-root {
  --dshpx-line: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  --dshpx-fill: var(--dsw-alias-bg-skeleton);
  --dshpx-hover: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-skeleton));
  font-family: inherit; color: var(--dsw-alias-label-primary);
}
.dshpx-side, .dshpx-tabpane { --dshpx-line: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  --dshpx-fill: var(--dsw-alias-bg-skeleton); --dshpx-hover: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-skeleton)); }
.dshpx-split { display: flex; width: 100%; height: 100%; min-height: 0; }
.dshpx-root svg, .dshpx-side svg, .dshpx-tabpane svg, .dshpx-header-btn svg { fill: currentColor; }
.dshpx-root button, .dshpx-tabpane button { font-family: inherit; }

/* ---- left: project tree ---- */
.dshpx-tree {
  width: 280px; min-width: 240px; flex: none; box-sizing: border-box;
  border-right: 1px solid var(--dshpx-line);
  display: flex; flex-direction: column; gap: 12px; padding: 16px 12px; overflow-y: auto;
}
.dshpx-tree-head { display: flex; align-items: center; justify-content: space-between; padding: 0 4px; }
.dshpx-tree-title { font-size: 15px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.dshpx-search {
  display: flex; align-items: center; gap: 8px; padding: 7px 12px;
  background: var(--dshpx-fill); border: 1px solid transparent; border-radius: 10px;
  color: var(--dsw-alias-label-caption); transition: border-color 120ms ease;
}
.dshpx-search:focus-within { border-color: var(--dshpx-line); }
.dshpx-search input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent;
  font-size: 13px; color: var(--dsw-alias-label-primary); font-family: inherit;
}
.dshpx-search input::placeholder { color: var(--dsw-alias-label-caption); }

.dshpx-list { display: flex; flex-direction: column; gap: 1px; }
.dshpx-row {
  display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box;
  padding: 7px 8px; border: none; border-radius: 8px; background: transparent;
  cursor: pointer; font-size: 13.5px; color: var(--dsw-alias-label-primary); text-align: left;
  font-family: inherit; transition: background 120ms ease;
}
.dshpx-row:hover { background: var(--dshpx-hover); }
.dshpx-row-active, .dshpx-row-active:hover { background: var(--dshpx-fill); font-weight: 550; }
.dshpx-row-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-row-actions { display: inline-flex; flex: none; gap: 2px; opacity: 0; transition: opacity 100ms ease; }
.dshpx-row:hover .dshpx-row-actions, .dshpx-row:focus-within .dshpx-row-actions { opacity: 1; }
.dshpx-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  border: none; background: transparent; cursor: pointer; padding: 5px; border-radius: 6px;
  color: var(--dsw-alias-label-caption); transition: background 120ms ease, color 120ms ease;
}
.dshpx-icon-btn:hover { background: var(--dshpx-hover); color: var(--dsw-alias-label-primary); }
.dshpx-icon-btn-danger:hover { color: var(--dsw-alias-state-error-primary); background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
.dshpx-pin-on { color: var(--dsw-alias-label-primary); }
.dshpx-count {
  flex: none; min-width: 18px; padding: 1px 7px; border-radius: 999px; text-align: center;
  font-size: 11px; font-weight: 500; font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-caption); background: var(--dshpx-fill);
}
.dshpx-children { margin: 1px 0 4px 24px; display: flex; flex-direction: column; gap: 1px; }
.dshpx-child {
  display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box;
  padding: 5px 8px; border: none; border-radius: 6px; background: transparent; cursor: pointer;
  font-size: 13px; color: var(--dsw-alias-label-secondary); text-align: left; font-family: inherit;
  transition: background 120ms ease, color 120ms ease;
}
.dshpx-child:hover { background: var(--dshpx-hover); color: var(--dsw-alias-label-primary); }
.dshpx-child-dot { display: none; }
.dshpx-child-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-child-time { flex: none; font-size: 11px; color: var(--dsw-alias-label-caption); }
.dshpx-empty { font-size: 12.5px; padding: 4px 8px; color: var(--dsw-alias-label-caption); }
.dshpx-muted { margin: 0; color: var(--dsw-alias-label-caption); font-size: 13px; }
.dshpx-notice {
  display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 14px;
  border-radius: 10px; font-size: 13px; color: var(--dsw-alias-state-error-primary);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
}

/* ---- right: detail ---- */
.dshpx-detail { flex: 1; min-width: 0; overflow-y: auto; padding: 32px 40px; display: flex; justify-content: center; }
.dshpx-detail-inner { display: flex; flex-direction: column; gap: 20px; max-width: 920px; width: 100%; }
.dshpx-placeholder {
  flex: 1; display: flex; flex-direction: column; gap: 8px;
  align-items: center; justify-content: center; padding: 48px 24px; text-align: center;
}
.dshpx-h1 { font-size: 26px; font-weight: 650; letter-spacing: -0.01em; margin: 0; color: var(--dsw-alias-label-primary); overflow-wrap: anywhere; }
.dshpx-h2 { font-size: 14px; font-weight: 600; margin: 0; color: var(--dsw-alias-label-primary); display: flex; align-items: center; gap: 8px; }
.dshpx-desc { margin: 0; font-size: 14px; color: var(--dsw-alias-label-secondary); line-height: 1.5; }
.dshpx-path {
  align-self: flex-start; margin: 0; padding: 2px 8px; border-radius: 6px; font-size: 12px; word-break: break-all;
  color: var(--dsw-alias-label-caption); background: var(--dshpx-fill); font-family: var(--ds-font-family-code, ui-monospace, monospace);
}
.dshpx-head { display: flex; flex-direction: column; gap: 8px; padding-bottom: 4px; }
.dshpx-head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.dshpx-head-actions { display: flex; align-items: center; gap: 6px; flex: none; }
.dshpx-grid { display: flex; flex-direction: column; gap: 20px; }
.dshpx-card {
  border: 1px solid var(--dshpx-line); border-radius: 14px; padding: 18px 20px;
  display: flex; flex-direction: column; gap: 12px; min-width: 0;
}
.dshpx-card-accent { background: var(--dshpx-fill); border-color: transparent; }
.dshpx-card-head { display: flex; flex-direction: column; gap: 4px; }
.dshpx-hint { margin: 0; font-size: 12.5px; color: var(--dsw-alias-label-caption); line-height: 1.5; }
.dshpx-row-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.dshpx-input-row { display: flex; gap: 8px; align-items: center; }
.dshpx-input {
  flex: 1; min-width: 0; box-sizing: border-box;
  background: var(--dsw-alias-bg-base); border: 1px solid var(--dshpx-line);
  border-radius: 10px; padding: 9px 12px; font-size: 13.5px; color: var(--dsw-alias-label-primary); font-family: inherit;
  outline: none; transition: border-color 120ms ease, box-shadow 120ms ease;
}
.dshpx-input:focus, .dshpx-textarea:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-label-primary) 30%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
}
.dshpx-input::placeholder, .dshpx-textarea::placeholder { color: var(--dsw-alias-label-caption); }
.dshpx-textarea {
  width: 100%; min-height: 200px; resize: vertical; box-sizing: border-box;
  background: var(--dsw-alias-bg-base); border: 1px solid var(--dshpx-line);
  border-radius: 10px; padding: 12px 14px; font-size: 13px; line-height: 1.6;
  color: var(--dsw-alias-label-primary); font-family: var(--ds-font-family-code, ui-monospace, monospace);
  outline: none; transition: border-color 120ms ease, box-shadow 120ms ease;
}
.dshpx-notes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; max-height: 420px; overflow-y: auto; }
.dshpx-note {
  font-size: 13px; color: var(--dsw-alias-label-secondary); line-height: 1.5; overflow-wrap: anywhere;
  padding: 3px 10px; border-radius: 6px;
}
.dshpx-note-h { margin: 10px 0 2px; padding: 0 10px; font-size: 12.5px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.dshpx-note-h:first-child { margin-top: 0; }
.dshpx-note-h1, .dshpx-note-h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dsw-alias-label-caption); }
.dshpx-note-h4 { font-weight: 550; color: var(--dsw-alias-label-secondary); }
.dshpx-note-date { margin-left: 8px; font-size: 11px; color: var(--dsw-alias-label-caption); white-space: nowrap; }
.dshpx-note:hover { background: var(--dshpx-hover); }
.dshpx-files { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.dshpx-file { display: flex; align-items: center; gap: 10px; padding: 6px 6px 6px 10px; border-radius: 8px; font-size: 13px; }
.dshpx-file:hover { background: var(--dshpx-hover); }
.dshpx-file > svg { flex: none; color: var(--dsw-alias-label-caption); }
.dshpx-file-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-primary); }
.dshpx-file-size { flex: none; font-size: 11.5px; color: var(--dsw-alias-label-caption); font-variant-numeric: tabular-nums; }
.dshpx-drop {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  padding: 22px 16px; border: 1.5px dashed var(--dshpx-line); border-radius: 12px;
  font-size: 13px; color: var(--dsw-alias-label-caption); text-align: center; cursor: pointer;
  transition: border-color 120ms ease, background 120ms ease;
}
.dshpx-drop:hover { background: var(--dshpx-hover); }
.dshpx-card-drag { border-color: var(--dsw-alias-label-caption); background: var(--dshpx-fill); }
.dshpx-card-drag .dshpx-drop { border-color: var(--dsw-alias-label-caption); }

/* ---- buttons ---- */
.dshpx-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap;
  border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 550; line-height: 1.2;
  cursor: pointer; border: 1px solid transparent; font-family: inherit;
  transition: background 120ms ease, opacity 120ms ease, color 120ms ease;
}
.dshpx-btn:disabled { opacity: 0.4; cursor: default; }
.dshpx-btn-primary {
  background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-label-primary));
  color: var(--dsw-alias-label-primary-inverted, var(--dsw-alias-bg-base));
}
.dshpx-btn-primary:hover:not(:disabled) { background: var(--dsw-alias-button-primary-hover, var(--dsw-alias-label-primary)); }
.dshpx-btn-ghost { background: transparent; color: var(--dsw-alias-label-secondary); border-color: var(--dshpx-line); }
.dshpx-btn-ghost:hover:not(:disabled) { background: var(--dshpx-hover); color: var(--dsw-alias-label-primary); }
.dshpx-btn-danger { background: transparent; color: var(--dsw-alias-state-error-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent); }
.dshpx-btn-danger:hover:not(:disabled) { background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent); }
.dshpx-btn-sm { padding: 6px 11px; font-size: 12.5px; border-radius: 8px; }
.dshpx-btns { display: flex; gap: 10px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }

/* ---- create form ---- */
.dshpx-form { display: flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 12px; background: var(--dshpx-fill); }
.dshpx-label { display: flex; flex-direction: column; gap: 5px; font-size: 12px; color: var(--dsw-alias-label-secondary); font-weight: 550; }

/* ---- status texts ---- */
.dshpx-ok { color: var(--dsw-alias-state-success-primary); font-size: 12.5px; }
.dshpx-err { color: var(--dsw-alias-state-error-primary); font-size: 12.5px; }

/* ---- leading slot (matches dsh workspace rows) ---- */
.dshpx-lead { position: relative; flex: none; width: 16px; height: 20px; display: inline-flex; align-items: center; justify-content: center; color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-caption)); }
.dshpx-lead-folder { display: inline-flex; }
.dshpx-lead-arrow {
  display: none; position: absolute; inset: -2px -4px; align-items: center; justify-content: center;
  border: none; background: transparent; color: inherit; padding: 0; border-radius: 4px; cursor: pointer;
}
.dshpx-lead-arrow svg { transition: transform 150ms ease-in-out; }
.dshpx-lead-arrow .dshpx-arrow-open { transform: rotate(90deg); }
.dshpx-lead-arrow:hover { color: var(--dsw-alias-label-primary); }
@media (hover: hover) {
  .dshpx-row:hover .dshpx-lead-arrow, .dshpx-side-row:hover .dshpx-lead-arrow { display: inline-flex; }
  .dshpx-row:hover .dshpx-lead-folder, .dshpx-side-row:hover .dshpx-lead-folder { visibility: hidden; }
}
@media (hover: none) { .dshpx-lead-arrow { display: inline-flex; } .dshpx-lead-folder { visibility: hidden; } }

/* ---- sidebar group (sidebar.projects seat): mirrors dsh workspace rows ---- */
.dshpx-side { display: flex; flex-direction: column; margin: 4px 0 8px; }
.dshpx-side-row {
  display: flex; align-items: center; gap: var(--dsh-sidebar-label-gap, 10px); width: 100%; box-sizing: border-box;
  height: 34px; padding: 0 8px; padding-inline-start: calc(var(--dsh-sidebar-row-padding, 12px) - var(--dsh-sidebar-paint-inset, 4px));
  border-inline: var(--dsh-sidebar-paint-inset, 4px) solid transparent; background-clip: padding-box;
  border-radius: var(--dsw-radius-md, 8px); background-color: transparent;
  color: var(--dsw-alias-label-primary); cursor: pointer; user-select: none; -webkit-user-select: none;
}
.dshpx-side-row:hover, .dshpx-side-row:focus-visible { background-color: var(--dsw-alias-interactive-bg-hover); outline: none; }
.dshpx-side-row-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-side-actions { display: inline-flex; flex: none; opacity: 0; }
.dshpx-side-row:hover .dshpx-side-actions, .dshpx-side-row:focus-within .dshpx-side-actions { opacity: 1; }
.dshpx-side-children { display: flex; flex-direction: column; }
.dshpx-side-child {
  display: block; width: 100%; box-sizing: border-box; height: 32px; line-height: 32px;
  padding: 0 8px; padding-inline-start: calc(var(--dsh-sidebar-row-padding, 12px) - var(--dsh-sidebar-paint-inset, 4px) + 16px + var(--dsh-sidebar-label-gap, 10px));
  border: none; border-inline: var(--dsh-sidebar-paint-inset, 4px) solid transparent; background-clip: padding-box;
  border-radius: var(--dsw-radius-md, 8px); background-color: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; text-align: left; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dshpx-side-child:hover { background-color: var(--dsw-alias-interactive-bg-hover); }
.dshpx-side .dshpx-empty { padding-inline-start: calc(var(--dsh-sidebar-row-padding, 12px) + 16px + var(--dsh-sidebar-label-gap, 10px)); }

.dshpx-side-child { display: flex; align-items: center; gap: 6px; }
.dshpx-side-child-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-side-child .dshpx-side-actions { opacity: 0; }
.dshpx-side-child:hover .dshpx-side-actions, .dshpx-side-child:focus-within .dshpx-side-actions { opacity: 1; }
.dshpx-more { width: 24px; height: 24px; padding: 0; color: var(--dsw-alias-label-tertiary, var(--dsw-alias-label-caption)); }
.dshpx-child-actions { display: none; flex: none; }
.dshpx-child:hover .dshpx-child-actions, .dshpx-child:focus-within .dshpx-child-actions { display: inline-flex; }
.dshpx-child:hover .dshpx-child-time, .dshpx-child:focus-within .dshpx-child-time { display: none; }
.dshpx-edit { gap: 10px; }
.dshpx-edit-name { font-size: 20px; font-weight: 650; padding: 8px 12px; }

.dshpx-archived-head {
  display: flex; align-items: center; gap: 8px; margin-top: 10px; padding: 6px 8px; border: none; background: transparent;
  border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 550; color: var(--dsw-alias-label-caption); text-align: left;
}
.dshpx-archived-head:hover { background: var(--dshpx-hover); color: var(--dsw-alias-label-secondary); }
.dshpx-archived-head svg { transition: transform 150ms ease-in-out; }
.dshpx-archived-head .dshpx-arrow-open { transform: rotate(90deg); }
.dshpx-archived .dshpx-row-name { color: var(--dsw-alias-label-secondary); }

.dshpx-goal {
  margin-top: 6px; padding: 12px 16px; border-radius: 12px; text-align: left; font: inherit;
  background: var(--dshpx-fill); border: 1px solid transparent; display: flex; flex-direction: column; gap: 4px;
}
.dshpx-goal p { margin: 0; font-size: 14px; line-height: 1.55; color: var(--dsw-alias-label-primary); white-space: pre-wrap; }
.dshpx-goal-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dsw-alias-label-caption); }
.dshpx-goal-empty { cursor: pointer; background: transparent; border: 1.5px dashed var(--dshpx-line); }
.dshpx-goal-empty p { color: var(--dsw-alias-label-caption); }
.dshpx-goal-empty:hover { background: var(--dshpx-hover); }
.dshpx-goal-input { min-height: 90px; font-family: inherit; font-size: 13.5px; }

/* ---- right-sidebar tab body + header button ---- */
.dshpx-tabpane {
  width: 100%; height: 100%; min-height: 0; overflow-y: auto; box-sizing: border-box;
  padding: 16px; display: flex; flex-direction: column; gap: 14px;
}
.dshpx-tabpane .dshpx-detail-inner { max-width: none; gap: 14px; }
.dshpx-tabpane .dshpx-grid { gap: 14px; }
.dshpx-tabpane .dshpx-h1 { font-size: 20px; }
.dshpx-tabpane .dshpx-card { padding: 14px 16px; }
.dshpx-hero-chip {
  display: inline-flex; align-items: center; gap: 4px; max-width: 200px;
  background: transparent; border: none; border-radius: 6px; padding: 4px 6px; cursor: pointer;
  font: inherit; font-size: 13px; color: var(--dsw-alias-label-caption); transition: background 120ms ease, color 120ms ease;
}
.dshpx-hero-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-hero-chip:hover, .dshpx-hero-chip[data-active] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dshpx-hero-chip svg { fill: currentColor; flex: none; }
.dshpx-header-btn {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 6px; padding: 4px; cursor: pointer;
  color: var(--dsw-alias-label-caption); transition: background 120ms ease, color 120ms ease;
}
.dshpx-header-btn:hover { background: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-skeleton)); color: var(--dsw-alias-label-primary); }

/* ---- mobile: single pane (JS decides which pane; CSS keeps it full-bleed) ---- */
@media (max-width: 820px) {
  .dshpx-tree { width: 100%; min-width: 0; border-right: none; }
  .dshpx-detail { padding: 16px; }
  .dshpx-h1 { font-size: 22px; }
}
`;
function ensureStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById(STYLE_ID)) {
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }
}
var selectedSlug = null;
var selectionListeners = /* @__PURE__ */ new Set();
function select(slug) {
  if (selectedSlug === slug) return;
  selectedSlug = slug;
  for (const l of selectionListeners) l();
}
function subscribeSelection(cb) {
  selectionListeners.add(cb);
  return () => {
    selectionListeners.delete(cb);
  };
}
function useSelection() {
  return (0, import_react.useSyncExternalStore)(subscribeSelection, () => selectedSlug, () => selectedSlug);
}
function useNarrow() {
  const [narrow, setNarrow] = (0, import_react.useState)(
    () => typeof window !== "undefined" ? window.matchMedia("(max-width: 820px)").matches : false
  );
  (0, import_react.useEffect)(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const onChange = (e) => setNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}
var q = (p) => "/api/deep-projects/" + p;
async function getJson(path) {
  const res = await fetch(q(path), { headers: { accept: "application/json" } });
  return res.json();
}
async function postJson(path, body) {
  const res = await fetch(q(path), {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: body === void 0 ? void 0 : JSON.stringify(body)
  });
  return res.json();
}
async function postRaw(path, bytes) {
  const res = await fetch(q(path), { method: "POST", body: bytes });
  return res.json();
}
var EMPTY_SESSIONS = { byId: {}, all: [] };
function sessionTitle(row, t) {
  var _a;
  const v = (_a = row.projections) == null ? void 0 : _a.values;
  const title = v && typeof v.title === "string" && v.title.trim() ? v.title : "";
  return title || t("session.none.title");
}
function sessionsFor(project, all) {
  if (!(project == null ? void 0 : project.path)) return [];
  const p = project.path;
  return all.filter((r) => {
    var _a, _b;
    return ((_a = r.cwd) != null ? _a : "") === p || ((_b = r.cwd) != null ? _b : "").startsWith(p + "/");
  }).sort((a, b) => b.updatedAt - a.updatedAt);
}
async function startProjectChat(cwd) {
  const ctx = appCtx;
  if (!ctx) return;
  const sessions = ctx.get("sessions");
  const id = await sessions.create({ cwd });
  const ws = ctx.get("uiWorkspace");
  ws.openSession(id);
}
function relTime(ts) {
  const d = Date.now() - ts;
  if (d < 6e4) return "now";
  if (d < 36e5) return Math.round(d / 6e4) + "m";
  if (d < 864e5) return Math.round(d / 36e5) + "h";
  if (d < 7 * 864e5) return Math.round(d / 864e5) + "d";
  return new Date(ts).toLocaleDateString();
}
var changeListeners = /* @__PURE__ */ new Set();
function notifyChanged() {
  for (const fn of changeListeners) fn();
}
function useOnChanged(fn) {
  (0, import_react.useEffect)(() => {
    changeListeners.add(fn);
    return () => {
      changeListeners.delete(fn);
    };
  }, [fn]);
}
var editRequest = null;
var menus = () => appCtx.contextMenus;
function pointOf(e) {
  const r = e.currentTarget.getBoundingClientRect();
  return { x: r.left, y: r.bottom };
}
function toggleMenu(kind, value, match, point) {
  const active = menus().active.getSnapshot();
  if ((active == null ? void 0 : active.kind) === kind && match(active.value)) menus().close();
  else menus().open({ kind, value }, point);
}
function openChatMenu(e, sessionId, displayTitle) {
  e.stopPropagation();
  toggleMenu("session", { sessionId, displayTitle }, (v) => v.sessionId === sessionId, pointOf(e));
}
function openProjectMenu(e, p) {
  e.stopPropagation();
  toggleMenu("dsh-project", { slug: p.slug, name: p.name, path: p.path, starred: !!p.starred, archived: !!p.archived }, (v) => v.slug === p.slug, pointOf(e));
}
function showProject(slug) {
  select(slug);
  appCtx.layout.selectPanel(PANEL_ID);
}
function MoreButton({ label, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-icon-btn dshpx-more", title: label, "aria-label": label, "aria-haspopup": "menu", onClick, onKeyDown: (e) => e.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconEllipsisOutlineRegular, { size: 16 }) });
}
function LeadSlot({ open, onToggle, label }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshpx-lead", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-lead-folder", "aria-hidden": "true", children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderOpenRegular, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: "dshpx-lead-arrow",
        "aria-label": label,
        "aria-expanded": open,
        onClick: (e) => {
          e.stopPropagation();
          onToggle();
        },
        onKeyDown: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconTriangleRightFillRegular, { size: 12, className: open ? "dshpx-arrow-open" : void 0 })
      }
    )
  ] });
}
function ProjectsPanelIcon({ size }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size });
}
function forcedFallback() {
  try {
    return localStorage.getItem("deep-projects:fallback") === "1";
  } catch {
    return false;
  }
}
function useFallbackRows(ctx) {
  var _a, _b;
  try {
    if (localStorage.getItem("deep-projects:fallback") === "1") return true;
  } catch {
  }
  return !((_b = (_a = ctx.slots).spec) == null ? void 0 : _b.call(_a, "sidebar.projects"));
}
function PinnedProjectPanel({ slug }) {
  (0, import_react.useEffect)(() => {
    select(slug);
  }, [slug]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsPanel, {});
}
function ProjectsPanel() {
  const ctx = appCtx;
  if (!ctx) return null;
  const t = ctx.locale.bind("projects");
  const list = ctx.sessions.list;
  const snapshot = (0, import_react.useSyncExternalStore)(
    (cb) => list.subscribe(cb),
    () => list.getSnapshot()
  );
  const allSessions = (0, import_react.useMemo)(
    () => Object.values(snapshot.byId),
    [snapshot]
  );
  const selected = useSelection();
  const narrow = useNarrow();
  if (narrow && selected) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-root dshpx-split", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-detail", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-detail-inner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: () => select(null), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronLeftOutlineRegular, { size: 14 }),
        " ",
        t("detail.back")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPane, { t, slug: selected })
    ] }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-root dshpx-split", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreePane, { t, allSessions }),
    !narrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-detail", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-detail-inner", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailPane, { t, slug: selected }) }) })
  ] });
}
function TreePane({ t, allSessions }) {
  const [rows, setRows] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [filter, setFilter] = (0, import_react.useState)("");
  const [creating, setCreating] = (0, import_react.useState)(false);
  const [expanded, setExpanded] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
  const [showArchived, setShowArchived] = (0, import_react.useState)(false);
  const selected = useSelection();
  const load = (0, import_react.useCallback)(() => {
    setError(null);
    getJson("list").then((d) => {
      const list = Array.isArray(d == null ? void 0 : d.projects) ? d.projects : [];
      list.sort(
        (a, b) => a.starred === b.starred ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : a.starred ? -1 : 1
      );
      setRows(list);
    }).catch(() => setError(t("error.generic")));
  }, [t]);
  (0, import_react.useEffect)(load, [load]);
  useOnChanged(load);
  const toggle = (slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };
  const openProject = (p) => {
    select(p.slug);
  };
  const openChat = (id) => {
    const ws = appCtx.get("uiWorkspace");
    ws.openSession(id);
    appCtx.layout.selectPanel(null);
  };
  const togglePin = async (p) => {
    await postJson("star?slug=" + encodeURIComponent(p.slug), { starred: !p.starred });
    load();
  };
  const visible = (rows != null ? rows : []).filter((p) => {
    var _a;
    if (!filter.trim()) return true;
    const f = filter.toLowerCase();
    return p.name.toLowerCase().includes(f) || ((_a = p.description) != null ? _a : "").toLowerCase().includes(f);
  });
  const active = visible.filter((p) => !p.archived);
  const archived = visible.filter((p) => p.archived);
  const renderRow = (p) => {
    const isOpen = expanded.has(p.slug);
    const chats = sessionsFor(p, allSessions);
    const isActive = selected === p.slug;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: `dshpx-row${isActive ? " dshpx-row-active" : ""}${p.starred ? " dshpx-row-pinned" : ""}`,
          role: "button",
          tabIndex: 0,
          onClick: () => openProject(p),
          onKeyDown: (e) => {
            if (e.key === "Enter") openProject(p);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadSlot, { open: isOpen, onToggle: () => toggle(p.slug), label: isOpen ? t("tree.collapse") : t("tree.expand") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-row-name", children: p.name }),
            chats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-count", children: chats.length }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshpx-row-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openProjectMenu(e, p) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  className: "dshpx-icon-btn",
                  title: t("row.newChat"),
                  disabled: !p.path,
                  onClick: (e) => {
                    e.stopPropagation();
                    if (p.path) void startProjectChat(p.path);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconNewChatOutlineRegular, { size: 13 })
                }
              )
            ] })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-children", children: [
        chats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-empty", children: t("sessions.empty") }),
        chats.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-child", role: "button", tabIndex: 0, onClick: () => openChat(r.sessionId), onKeyDown: (e) => {
          if (e.key === "Enter") openChat(r.sessionId);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-child-title", children: sessionTitle(r, t) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-child-time", children: relTime(r.updatedAt) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-child-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openChatMenu(e, r.sessionId, sessionTitle(r, t)) }) })
        ] }, r.sessionId))
      ] })
    ] }, p.slug);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-tree", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-tree-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-tree-title", children: t("tree.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-icon-btn", title: t("create.title"), onClick: () => setCreating(true), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 14 }) })
    ] }),
    creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CreateForm,
      {
        t,
        onDone: (p) => {
          setCreating(false);
          openProject(p);
        },
        onCancel: () => setCreating(false)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-search", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 13 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          value: filter,
          placeholder: t("tree.search"),
          onChange: (e) => setFilter(e.target.value)
        }
      )
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { t, message: error, onRetry: load }),
    !error && rows === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("loading") }),
    !error && rows !== null && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: rows.length === 0 ? t("empty.title") : "\u2014" }),
    !error && rows !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-list", children: [
      active.map(renderRow),
      archived.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dshpx-archived-head", "aria-expanded": showArchived, onClick: () => setShowArchived((v) => !v), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconTriangleRightFillRegular, { size: 10, className: showArchived ? "dshpx-arrow-open" : void 0 }),
        t("tree.archived"),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-count", children: archived.length })
      ] }),
      showArchived && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-archived", children: archived.map(renderRow) })
    ] })
  ] });
}
function ProjectsSidebarGroup({ wide }) {
  const [rows, setRows] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [expanded, setExpanded] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
  const selected = useSelection();
  const t = appCtx == null ? void 0 : appCtx.locale.bind("projects");
  const load = (0, import_react.useCallback)(() => {
    setError(null);
    getJson("list").then((d) => {
      const list2 = Array.isArray(d == null ? void 0 : d.projects) ? d.projects : [];
      list2.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setRows(list2.filter((p) => p.starred && !p.archived));
    }).catch(() => {
      if (t) setError(t("error.generic"));
      setRows([]);
    });
  }, [t]);
  (0, import_react.useEffect)(() => {
    load();
  }, [load, selected]);
  useOnChanged(load);
  const list = appCtx == null ? void 0 : appCtx.sessions.list;
  const snapshot = (0, import_react.useSyncExternalStore)(
    (cb) => {
      var _a;
      return (_a = list == null ? void 0 : list.subscribe(cb)) != null ? _a : (() => () => {
      });
    },
    () => {
      var _a;
      return (_a = list == null ? void 0 : list.getSnapshot()) != null ? _a : EMPTY_SESSIONS;
    }
  );
  const allSessions = (0, import_react.useMemo)(
    () => Object.values(snapshot.byId),
    [snapshot]
  );
  if (!wide || !t || forcedFallback()) return null;
  if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { padding: "2px 8px", fontSize: 12, opacity: 0.7 }, title: t("error.generic"), children: "\u26A0" });
  if (rows === null) return null;
  if (rows.length === 0) return null;
  const toggle = (slug) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };
  const openChat = (id) => {
    const ws = appCtx.get("uiWorkspace");
    ws.openSession(id);
    appCtx.layout.selectPanel(null);
  };
  const openProject = showProject;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: "dshpx-side", "aria-label": t("nav"), children: rows.map((p) => {
    const isOpen = expanded.has(p.slug);
    const chats = sessionsFor(p, allSessions);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: `dshpx-side-row${isOpen ? " dshpx-side-row-open" : ""}`,
          role: "button",
          tabIndex: 0,
          "aria-expanded": isOpen,
          title: p.name,
          onClick: () => openProject(p.slug),
          onKeyDown: (e) => {
            if (e.key === "Enter") openProject(p.slug);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadSlot, { open: isOpen, onToggle: () => toggle(p.slug), label: isOpen ? t("tree.collapse") : t("tree.expand") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-row-name", children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshpx-side-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openProjectMenu(e, p) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  className: "dshpx-icon-btn",
                  title: t("row.newChat"),
                  disabled: !p.path,
                  onClick: (e) => {
                    e.stopPropagation();
                    if (p.path) void startProjectChat(p.path);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconNewChatOutlineRegular, { size: 16 })
                }
              )
            ] })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-side-children", children: [
        chats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-empty", children: t("sessions.empty") }),
        chats.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-side-child", role: "button", tabIndex: 0, onClick: () => openChat(r.sessionId), onKeyDown: (e) => {
          if (e.key === "Enter") openChat(r.sessionId);
        }, title: sessionTitle(r, t), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-child-title", children: sessionTitle(r, t) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openChatMenu(e, r.sessionId, sessionTitle(r, t)) }) })
        ] }, r.sessionId))
      ] })
    ] }, p.slug);
  }) });
}
function CreateForm({
  t,
  onDone,
  onCancel
}) {
  const [name, setName] = (0, import_react.useState)("");
  const [description, setDescription] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const d = await postJson("create", { name, description });
      if ((d == null ? void 0 : d.ok) && d.project) onDone(d.project);
      else setError(t("create.error"));
    } catch {
      setError(t("create.error"));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-form", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
      t("create.name"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          className: "dshpx-input",
          value: name,
          maxLength: 60,
          autoFocus: true,
          placeholder: t("create.name.placeholder"),
          onChange: (e) => setName(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") void submit();
          }
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
      t("create.description"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          className: "dshpx-input",
          value: description,
          placeholder: t("create.description.placeholder"),
          onChange: (e) => setDescription(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") void submit();
          }
        }
      )
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-btns", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-primary", disabled: busy || !name.trim(), onClick: () => void submit(), children: t("create.submit") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost", onClick: onCancel, children: t("create.cancel") })
    ] })
  ] });
}
function DetailPane({ t, slug }) {
  if (!slug) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-placeholder", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-h1", children: t("tab.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("empty.hint") })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectContent, { t, slug });
}
function HeroProjectPicker(props) {
  const t = props.t;
  const { sessionId, useSessions } = props;
  const cwd = useSessions((s) => {
    var _a;
    return (_a = s.byId[sessionId]) == null ? void 0 : _a.cwd;
  });
  const [rows, setRows] = (0, import_react.useState)([]);
  const load = (0, import_react.useCallback)(() => {
    getJson("list").then((r) => {
      var _a;
      setRows((r == null ? void 0 : r.ok) ? (_a = r.projects) != null ? _a : [] : []);
    }).catch(() => {
      setRows([]);
    });
  }, []);
  (0, import_react.useEffect)(load, [load]);
  useOnChanged(load);
  const live = rows.filter((r) => r.path && !r.archived);
  if (live.length === 0) return null;
  const current = live.find((r) => cwd === r.path || (cwd != null ? cwd : "").startsWith(r.path + "/"));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      className: "dshpx-hero-chip",
      type: "button",
      "data-active": current ? "true" : void 0,
      onClick: (e) => {
        toggleMenu("dsh-project-picker", { projects: live, current: current == null ? void 0 : current.slug }, () => true, pointOf(e));
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { width: 14, height: 14 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: current ? current.name : t("hero.project") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { width: 12, height: 12 })
      ]
    }
  );
}
function ProjectHeaderButton(props) {
  const t = props.t;
  const { sessionId, useSessions } = props;
  const cwd = useSessions((s) => {
    var _a;
    return (_a = s.byId[sessionId]) == null ? void 0 : _a.cwd;
  });
  const [rows, setRows] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let live = true;
    getJson("list").then((r) => {
      var _a;
      if (live) setRows((r == null ? void 0 : r.ok) ? (_a = r.projects) != null ? _a : [] : null);
    }).catch(() => {
      if (live) setRows(null);
    });
    return () => {
      live = false;
    };
  }, []);
  const inProject = (0, import_react.useMemo)(() => {
    if (!rows || !cwd) return false;
    return rows.some((r) => r.path && (cwd === r.path || cwd.startsWith(r.path + "/")));
  }, [rows, cwd]);
  if (!inProject) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: "dshpx-header-btn",
      type: "button",
      title: t("header.open"),
      onClick: () => appCtx == null ? void 0 : appCtx.sidebarRight.openTab("project"),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 })
    }
  );
}
function ProjectContent({ t, slug, compact }) {
  const [detail, setDetail] = (0, import_react.useState)(null);
  const [notes, setNotes] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(null);
  const load = (0, import_react.useCallback)(() => {
    setError(null);
    Promise.all([
      getJson("detail?slug=" + encodeURIComponent(slug)),
      getJson("notes?slug=" + encodeURIComponent(slug))
    ]).then(([d, n]) => {
      var _a;
      if ((d == null ? void 0 : d.ok) && d.project) {
        setDetail(d.project);
        setNotes((_a = n == null ? void 0 : n.notes) != null ? _a : "");
      } else setError(t("error.generic"));
    }).catch(() => setError(t("error.generic")));
  }, [slug, t]);
  (0, import_react.useEffect)(load, [load]);
  const [editing, setEditing] = (0, import_react.useState)(null);
  const [editErr, setEditErr] = (0, import_react.useState)(false);
  const checkEdit = (0, import_react.useCallback)(() => {
    var _a, _b;
    if (editRequest === slug && detail) {
      editRequest = null;
      setEditing({ name: detail.name, description: (_a = detail.description) != null ? _a : "", goal: (_b = detail.goal) != null ? _b : "" });
    }
  }, [slug, detail]);
  (0, import_react.useEffect)(checkEdit, [checkEdit]);
  useOnChanged(load);
  useOnChanged(checkEdit);
  (0, import_react.useEffect)(() => {
    setEditing(null);
  }, [slug]);
  const saveEdit = async () => {
    if (!detail || !editing) return;
    const d = await postJson("rename?slug=" + encodeURIComponent(detail.slug), { name: editing.name, description: editing.description, goal: editing.goal }).catch(() => null);
    if (!(d == null ? void 0 : d.ok)) {
      setEditErr(true);
      return;
    }
    setEditErr(false);
    setEditing(null);
    notifyChanged();
  };
  const togglePin = async () => {
    if (!detail) return;
    await postJson("star?slug=" + encodeURIComponent(detail.slug), { starred: !detail.starred });
    notifyChanged();
  };
  const remove = async () => {
    if (!detail) return;
    if (!confirm(t("detail.delete.confirm"))) return;
    await postJson("delete?slug=" + encodeURIComponent(detail.slug));
    select(null);
    notifyChanged();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { t, message: error, onRetry: load }),
    !error && detail === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("loading") }),
    !error && detail !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-head dshpx-edit", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "dshpx-input dshpx-edit-name",
            value: editing.name,
            maxLength: 60,
            autoFocus: true,
            "aria-label": t("create.name"),
            onChange: (e) => setEditing({ ...editing, name: e.target.value }),
            onKeyDown: (e) => {
              if (e.key === "Enter") void saveEdit();
              if (e.key === "Escape") setEditing(null);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "dshpx-input",
            value: editing.description,
            placeholder: t("create.description.placeholder"),
            "aria-label": t("create.description"),
            onChange: (e) => setEditing({ ...editing, description: e.target.value }),
            onKeyDown: (e) => {
              if (e.key === "Enter") void saveEdit();
              if (e.key === "Escape") setEditing(null);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
          t("goal.title"),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "dshpx-textarea dshpx-goal-input",
              value: editing.goal,
              placeholder: t("goal.placeholder"),
              maxLength: 2e3,
              onChange: (e) => setEditing({ ...editing, goal: e.target.value }),
              onKeyDown: (e) => {
                if (e.key === "Escape") setEditing(null);
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-btns", children: [
          editErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("create.invalid") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: () => {
            setEditing(null);
            setEditErr(false);
          }, children: t("create.cancel") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", disabled: !editing.name.trim(), onClick: () => void saveEdit(), children: t("instructions.save") })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-head-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "dshpx-h1", children: detail.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-head-actions", children: [
            detail.archived && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm",
                type: "button",
                onClick: async () => {
                  await postJson("archive?slug=" + encodeURIComponent(detail.slug), { archived: false });
                  notifyChanged();
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconUnarchiveOutlineRegular, { size: 14 }),
                  " ",
                  t("menu.unarchive")
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-icon-btn", type: "button", title: t("menu.edit"), onClick: () => {
              var _a, _b;
              return setEditing({ name: detail.name, description: (_a = detail.description) != null ? _a : "", goal: (_b = detail.goal) != null ? _b : "" });
            }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconEditOutlineRegular, { size: 16 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-icon-btn", type: "button", title: detail.starred ? t("detail.unstar") : t("detail.star"), onClick: () => void togglePin(), children: detail.starred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPinFillRegular, { size: 16, className: "dshpx-pin-on" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPinOutlineRegular, { size: 16 }) }),
            !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-icon-btn dshpx-icon-btn-danger", type: "button", title: t("detail.delete"), onClick: () => void remove(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 16 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", type: "button", disabled: !detail.path, onClick: () => {
              if (detail.path) void startProjectChat(detail.path);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconNewChatOutlineRegular, { size: 14 }),
              t("detail.newChat")
            ] })
          ] })
        ] }),
        detail.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-desc", children: detail.description }),
        detail.path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-path", children: detail.path }),
        detail.goal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-goal", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-goal-label", children: t("goal.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail.goal })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dshpx-goal dshpx-goal-empty", onClick: () => {
          var _a;
          return setEditing({ name: detail.name, description: (_a = detail.description) != null ? _a : "", goal: "" });
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-goal-label", children: t("goal.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("goal.empty") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Memory, { t, slug: detail.slug, notes, onSaved: setNotes }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeFiles, { t, detail, onChange: load })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstructionsEditor, { t, detail, onChange: load })
    ] })
  ] });
}
function ProjectInfoBody(props) {
  const t = props.t;
  const { sessionId, useSessions } = props;
  const cwd = useSessions((s) => {
    var _a;
    return (_a = s.byId[sessionId]) == null ? void 0 : _a.cwd;
  });
  const [rows, setRows] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let live = true;
    getJson("list").then((r) => {
      var _a;
      if (live) setRows((r == null ? void 0 : r.ok) ? (_a = r.projects) != null ? _a : [] : null);
    }).catch(() => {
      if (live) setRows(null);
    });
    return () => {
      live = false;
    };
  }, []);
  const project = (0, import_react.useMemo)(() => {
    var _a;
    if (!rows || !cwd) return null;
    return (_a = rows.find((r) => r.path && (cwd === r.path || cwd.startsWith(r.path + "/")))) != null ? _a : null;
  }, [rows, cwd]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-tabpane", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-detail-inner", children: [
    rows === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("loading") }),
    rows !== null && project === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-placeholder", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-h1", children: t("tab.project") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("tab.project.hint") })
    ] }),
    project !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-hint", children: t("tab.project.hint") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectContent, { t, slug: project.slug, compact: true })
    ] })
  ] }) });
}
function Memory({ t, slug, notes, onSaved }) {
  const [text, setText] = (0, import_react.useState)("");
  const [draft, setDraft] = (0, import_react.useState)(null);
  const [status, setStatus] = (0, import_react.useState)("idle");
  const lines = notes.split("\n").filter((l) => l.trim());
  const count = lines.filter((l) => /^\s*[-*]\s/.test(l)).length;
  const send = async (path, body) => {
    var _a;
    setStatus("saving");
    try {
      const d = await postJson(path + "?slug=" + encodeURIComponent(slug), body);
      if (!(d == null ? void 0 : d.ok)) {
        setStatus("error");
        return false;
      }
      onSaved((_a = d.notes) != null ? _a : "");
      setStatus("idle");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  };
  const add = async () => {
    if (text.trim() && status !== "saving" && await send("note", { text })) setText("");
  };
  const save = async () => {
    if (draft !== null && await send("notes", { text: draft })) setDraft(null);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dshpx-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-row-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "dshpx-h2", children: [
        t("memory.title"),
        " ",
        count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-count", children: count })
      ] }),
      draft === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: () => setDraft(notes), children: t("memory.edit") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-hint", children: t("memory.hint") }),
    draft !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "dshpx-textarea", value: draft, placeholder: t("memory.placeholder.edit"), onChange: (e) => setDraft(e.target.value), autoFocus: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-btns", children: [
        status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("note.error") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: () => {
          setDraft(null);
          setStatus("idle");
        }, children: t("create.cancel") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", disabled: status === "saving" || draft === notes, onClick: () => void save(), children: t("instructions.save") })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-input-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "dshpx-input",
            value: text,
            placeholder: t("note.placeholder"),
            maxLength: 2e3,
            onChange: (e) => setText(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") void add();
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "dshpx-btn dshpx-btn-primary", disabled: !text.trim() || status === "saving", onClick: () => void add(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 14 }),
          " ",
          t("note.add")
        ] })
      ] }),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("note.error") }),
      lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("note.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dshpx-notes", children: lines.map((l, i) => {
        const h = /^(#{1,6})\s+(.*)$/.exec(l);
        if (h) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: `dshpx-note-h dshpx-note-h${Math.min(h[1].length, 4)}`, children: h[2] }, i);
        const m = /^(.*?)\s*_\((\d{4}-\d\d-\d\d)\)_\s*$/.exec(l.replace(/^[-*]\s+/, ""));
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "dshpx-note", children: [
          m ? m[1] : l.replace(/^[-*]\s+/, ""),
          m && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-note-date", children: m[2] })
        ] }, i);
      }) })
    ] })
  ] });
}
function InstructionsEditor({
  t,
  detail,
  onChange
}) {
  const [text, setText] = (0, import_react.useState)(detail.instructions);
  const [status, setStatus] = (0, import_react.useState)("idle");
  (0, import_react.useEffect)(() => {
    setText(detail.instructions);
    setStatus("idle");
  }, [detail.slug, detail.instructions]);
  const save = async () => {
    setStatus("saving");
    const d = await postJson("instructions?slug=" + encodeURIComponent(detail.slug), { text });
    setStatus((d == null ? void 0 : d.ok) ? "saved" : "error");
    if (d == null ? void 0 : d.ok) onChange();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dshpx-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-card-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "dshpx-h2", children: t("section.instructions") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-hint", children: t("instructions.hint") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "textarea",
      {
        className: "dshpx-textarea",
        value: text,
        placeholder: t("instructions.placeholder"),
        onChange: (e) => setText(e.target.value)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-btns", children: [
      status === "saved" && text === detail.instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-ok", children: t("instructions.saved") }),
      status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("instructions.error") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", disabled: status === "saving" || text === detail.instructions, onClick: () => void save(), children: t("instructions.save") })
    ] })
  ] });
}
function KnowledgeFiles({
  t,
  detail,
  onChange
}) {
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [dragOver, setDragOver] = (0, import_react.useState)(false);
  const upload = async (files) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const bytes = await f.arrayBuffer();
        await postRaw(
          "knowledge-upload?slug=" + encodeURIComponent(detail.slug) + "&name=" + encodeURIComponent(f.name),
          bytes
        );
      }
    } finally {
      setBusy(false);
      onChange();
    }
  };
  const onDrop = (e) => {
    var _a, _b;
    e.preventDefault();
    setDragOver(false);
    void upload((_b = (_a = e.dataTransfer) == null ? void 0 : _a.files) != null ? _b : null);
  };
  const remove = async (name) => {
    await postJson("knowledge-delete?slug=" + encodeURIComponent(detail.slug) + "&name=" + encodeURIComponent(name));
    onChange();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "section",
    {
      className: `dshpx-card${dragOver ? " dshpx-card-drag" : ""}`,
      onDragOver: (e) => {
        e.preventDefault();
        setDragOver(true);
      },
      onDragLeave: () => setDragOver(false),
      onDrop,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-row-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "dshpx-h2", children: [
            t("section.knowledge"),
            " ",
            detail.knowledge.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-count", children: detail.knowledge.length })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", style: { cursor: "pointer" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 13 }),
            " ",
            busy ? t("loading") : t("knowledge.upload"),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "file",
                multiple: true,
                style: { display: "none" },
                disabled: busy,
                onChange: (e) => {
                  void upload(e.target.files);
                  e.target.value = "";
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-hint", children: t("knowledge.hint") }),
        detail.knowledge.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-drop", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconDeliverDocRegular, { size: 20 }),
          t("knowledge.drop"),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", multiple: true, style: { display: "none" }, disabled: busy, onChange: (e) => {
            void upload(e.target.files);
            e.target.value = "";
          } })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dshpx-files", children: detail.knowledge.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "dshpx-file", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconDeliverDocRegular, { size: 15 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-file-name", title: f.name, children: f.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-file-size", children: formatBytes(f.size) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-icon-btn dshpx-icon-btn-danger", title: t("knowledge.delete"), onClick: () => void remove(f.name), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconTrashOutlineRegular, { size: 13 }) })
        ] }, f.name)) })
      ]
    }
  );
}
function formatBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / 1024 / 1024).toFixed(1) + " MB";
}
function ErrorBox({ t, message, onRetry }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-notice", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message || t("error.generic") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: onRetry, children: t("retry") })
  ] });
}
function apply(ctx) {
  appCtx = ctx;
  ensureStyles();
  const t = ctx.locale.bind("projects");
  ctx.effect(() => {
    ctx.locale.register("projects", { en, zh });
  }, "deep-projects: locales");
  ctx.slots.inject("contextMenu.icon", function* () {
    for (const [key, Icon] of Object.entries({
      "deep-projects.open": import_dsh_client_ui_primitives.IconFolderOpenRegular,
      "deep-projects.newChat": import_dsh_client_ui_primitives.IconNewChatOutlineRegular,
      "deep-projects.edit": import_dsh_client_ui_primitives.IconEditOutlineRegular,
      "deep-projects.pin": import_dsh_client_ui_primitives.IconPinOutlineRegular,
      "deep-projects.unpin": import_dsh_client_ui_primitives.IconPinFillRegular,
      "deep-projects.delete": import_dsh_client_ui_primitives.IconTrashOutlineRegular,
      "deep-projects.archive": import_dsh_client_ui_primitives.IconArchiveOutlineRegular,
      "deep-projects.unarchive": import_dsh_client_ui_primitives.IconUnarchiveOutlineRegular
    })) yield ctx.slots.register({ name: "contextMenu.icon", key }, Icon);
  });
  ctx.effect(() => ctx.contextMenus.register({
    id: "deep-projects.actions",
    target: "dsh-project",
    order: 100,
    resolve: (p) => [
      { id: "open", label: t("menu.open"), icon: { key: "deep-projects.open" }, run: () => showProject(p.slug) },
      {
        id: "newChat",
        label: t("detail.newChat"),
        icon: { key: "deep-projects.newChat" },
        disabled: !p.path,
        run: () => {
          if (p.path) void startProjectChat(p.path);
        }
      },
      {
        id: "edit",
        label: t("menu.edit"),
        icon: { key: "deep-projects.edit" },
        separatorBefore: true,
        run: () => {
          editRequest = p.slug;
          showProject(p.slug);
          notifyChanged();
        }
      },
      ...p.archived ? [] : [{
        id: "pin",
        label: p.starred ? t("row.unpin") : t("row.pin"),
        icon: { key: p.starred ? "deep-projects.unpin" : "deep-projects.pin" },
        run: async () => {
          await postJson("star?slug=" + encodeURIComponent(p.slug), { starred: !p.starred });
          notifyChanged();
        }
      }],
      {
        id: "archive",
        label: p.archived ? t("menu.unarchive") : t("menu.archive"),
        icon: { key: p.archived ? "deep-projects.unarchive" : "deep-projects.archive" },
        run: async () => {
          await postJson("archive?slug=" + encodeURIComponent(p.slug), { archived: !p.archived });
          notifyChanged();
        }
      },
      {
        id: "delete",
        label: t("detail.delete"),
        icon: { key: "deep-projects.delete" },
        danger: true,
        separatorBefore: true,
        run: async () => {
          if (!confirm(t("detail.delete.confirm"))) return;
          await postJson("delete?slug=" + encodeURIComponent(p.slug));
          if (selectedSlug === p.slug) select(null);
          notifyChanged();
        }
      }
    ]
  }), "deep-projects: project menu");
  ctx.effect(() => ctx.contextMenus.register({
    id: "deep-projects.picker",
    target: "dsh-project-picker",
    order: 100,
    resolve: (v) => [...v.projects].sort((a, b) => Number(!!b.starred) - Number(!!a.starred)).map((p) => ({
      id: p.slug,
      label: p.name,
      icon: { key: p.slug === v.current ? "deep-projects.open" : "deep-projects.newChat" },
      disabled: p.slug === v.current,
      run: () => {
        if (p.path) void startProjectChat(p.path);
      }
    }))
  }), "deep-projects: hero picker menu");
  ctx.effect(() => {
    ctx.slots.inject(
      "conversation.hero.options",
      () => ctx.slots.register({ name: "conversation.hero.options", id: "deep-projects.picker", locale: "projects" }, HeroProjectPicker)
    );
  }, "deep-projects: hero picker");
  ctx.effect(() => {
    ctx.slots.inject(
      "sidebar.panellist",
      () => ctx.slots.register(
        { name: "sidebar.panellist", id: PANEL_ID, order: 20, label: () => t("nav"), locale: "projects" },
        ProjectsPanelIcon
      )
    );
  }, "deep-projects: sidebar");
  ctx.effect(() => {
    ctx.slots.inject(
      "sidebar.projects",
      () => ctx.slots.register({ name: "sidebar.projects", locale: "projects" }, ProjectsSidebarGroup)
    );
  }, "deep-projects: sidebar projects");
  ctx.effect(() => ctx.slots.inject("sidebar.panellist", () => {
    if (!useFallbackRows(ctx)) return () => {
    };
    let disposers = [];
    let live = true;
    const clear = () => {
      for (const off of disposers) off();
      disposers = [];
    };
    const sync = () => {
      getJson("list").then((d) => {
        if (!live) return;
        clear();
        const pinned = (Array.isArray(d == null ? void 0 : d.projects) ? d.projects : []).filter((p) => p.starred && !p.archived);
        pinned.forEach((p, i) => {
          const id = PANEL_ID + ":" + p.slug;
          const Panel = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinnedProjectPanel, { slug: p.slug });
          disposers.push(ctx.slots.register({ name: "main", key: id, locale: "projects" }, Panel));
          disposers.push(ctx.slots.register({ name: "sidebar.panellist", id, order: 21 + i, label: () => p.name, locale: "projects" }, ProjectsPanelIcon));
        });
      }).catch(() => {
      });
    };
    sync();
    changeListeners.add(sync);
    return () => {
      live = false;
      changeListeners.delete(sync);
      clear();
    };
  }), "deep-projects: sidebar rows (stock dsh)");
  ctx.effect(() => {
    ctx.sidebarRightTabs.register({
      id: TAB_ID,
      kind: "project",
      multiple: true,
      priority: "extension",
      title: () => t("tab.project")
    });
  }, "deep-projects: sidebar tab type");
  ctx.effect(() => {
    ctx.slots.inject(
      "sidebar.right.pane.tab",
      () => ctx.slots.register({ name: "sidebar.right.pane.tab", key: TAB_ID, locale: "projects" }, ProjectInfoBody)
    );
  }, "deep-projects: sidebar tab body");
  ctx.effect(() => {
    ctx.slots.inject(
      "sidebar.right.pane.tab.title",
      () => ctx.slots.register({ name: "sidebar.right.pane.tab.title", key: TAB_ID, locale: "projects" }, () => t("tab.project"))
    );
  }, "deep-projects: sidebar tab title");
  ctx.effect(() => {
    ctx.slots.inject(
      "conversation.session.header.utilities",
      () => ctx.slots.register({ name: "conversation.session.header.utilities", id: TAB_ID, order: 50, locale: "projects" }, ProjectHeaderButton)
    );
  }, "deep-projects: header button");
  ctx.effect(() => {
    ctx.slots.inject(
      "main",
      () => ctx.slots.register({ name: "main", key: PANEL_ID, locale: "projects" }, ProjectsPanel)
    );
  }, "deep-projects: main");
}

return module.exports;
}});
