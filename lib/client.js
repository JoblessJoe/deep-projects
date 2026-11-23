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
var import_client = require("react-dom/client");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/locales.ts
var en = {
  "grid.yours": "Your projects",
  "grid.sort.recent": "Sorted by recent activity",
  "grid.sort.name": "Sorted by name",
  "page.composer": "New chat in {name}",
  "page.send": "Send",
  "page.sendFailed": "Could not send. The chat was opened; type there.",
  "page.recent": "Recent",
  "page.noChats": "No chats yet. Type above to start one.",
  "page.instructions": "Instructions",
  "page.knowledge": "Knowledge",
  "page.files": "{n} files",
  "page.view": "View",
  "page.notSet": "Not set",
  "nav": "Projects",
  "tab.title": "Projects",
  "tab.project": "Project",
  "tab.project.hint": "Memories, instructions, and knowledge for this project \u2014 the agent loads them in every chat that opens here.",
  "header.open": "Project info",
  "hero.workspaces": "Workspaces",
  "menu.moveTo": "Move to project",
  "menu.removeFrom": "Remove from project",
  "menu.moveFailed": "Could not move the chat",
  "tree.title": "Projects",
  "tree.search": "Filter projects\u2026",
  "tree.collapse": "Collapse",
  "tree.expand": "Expand",
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
  "goal.title": "Goal",
  "goal.placeholder": "What is this project for? What does done look like?",
  "goal.empty": "Set a goal. Every chat in this project will see it.",
  "note.placeholder": "e.g. The production database is read-only; never write to it from here.",
  "note.add": "Add",
  "note.error": "Could not save the note.",
  "note.empty": "No memories yet.",
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
  "create.error": "Could not create the project.",
  "detail.back": "All projects",
  "detail.newChat": "New chat",
  "detail.star": "Pin to sidebar",
  "detail.unstar": "Unpin",
  "row.pin": "Pin in sidebar",
  "row.unpin": "Unpin from sidebar",
  "row.newChat": "New chat in this project",
  "detail.delete": "Delete project",
  "delete.title": 'Delete "{name}"?',
  "delete.close": "Close",
  "detail.delete.confirm": "This deletes the project folder with its instructions, memory and knowledge files. Its chats are kept.",
  "section.instructions": "Custom instructions",
  "instructions.hint": "Stored in AGENTS.md in the project folder. The agent loads it automatically in every chat that opens here.",
  "instructions.save": "Save",
  "instructions.saved": "Saved.",
  "instructions.error": "Could not save instructions.",
  "instructions.placeholder": "# Project instructions\n\nDescribe the project, conventions, and anything the agent should always know\u2026",
  "section.knowledge": "Knowledge files",
  "knowledge.hint": "Files the agent can read in this project (docs, specs, references).",
  "knowledge.upload": "Upload files",
  "knowledge.delete": "Delete",
  "sessions.empty": "No chats yet. Start one with \u201CNew chat\u201D.",
  "session.none.title": "Untitled",
  "loading": "Loading\u2026",
  "error.generic": "Something went wrong.",
  "retry": "Retry"
};
var zh = {
  "grid.yours": "\u6211\u7684\u9879\u76EE",
  "grid.sort.recent": "\u6309\u6700\u8FD1\u6D3B\u52A8\u6392\u5E8F",
  "grid.sort.name": "\u6309\u540D\u79F0\u6392\u5E8F",
  "page.composer": "\u5728 {name} \u4E2D\u65B0\u5EFA\u5BF9\u8BDD",
  "page.send": "\u53D1\u9001",
  "page.sendFailed": "\u53D1\u9001\u5931\u8D25\u3002\u5BF9\u8BDD\u5DF2\u6253\u5F00\uFF0C\u8BF7\u5728\u90A3\u91CC\u8F93\u5165\u3002",
  "page.recent": "\u6700\u8FD1",
  "page.noChats": "\u8FD8\u6CA1\u6709\u5BF9\u8BDD\u3002\u5728\u4E0A\u65B9\u8F93\u5165\u5373\u53EF\u5F00\u59CB\u3002",
  "page.instructions": "\u6307\u4EE4",
  "page.knowledge": "\u77E5\u8BC6",
  "page.files": "{n} \u4E2A\u6587\u4EF6",
  "page.view": "\u67E5\u770B",
  "page.notSet": "\u672A\u8BBE\u7F6E",
  "nav": "\u9879\u76EE",
  "goal.title": "\u76EE\u6807",
  "goal.placeholder": "\u8FD9\u4E2A\u9879\u76EE\u662F\u505A\u4EC0\u4E48\u7684\uFF1F\u600E\u6837\u7B97\u5B8C\u6210\uFF1F",
  "goal.empty": "\u8BBE\u7F6E\u76EE\u6807\uFF0C\u672C\u9879\u76EE\u7684\u6BCF\u4E2A\u5BF9\u8BDD\u90FD\u80FD\u770B\u5230\u3002",
  "menu.archive": "\u5F52\u6863",
  "menu.unarchive": "\u4ECE\u5F52\u6863\u6062\u590D",
  "tree.archived": "\u5DF2\u5F52\u6863",
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
  "hero.workspaces": "\u5DE5\u4F5C\u533A",
  "menu.moveTo": "\u79FB\u5230\u9879\u76EE",
  "menu.removeFrom": "\u79FB\u51FA\u9879\u76EE",
  "menu.moveFailed": "\u65E0\u6CD5\u79FB\u52A8\u5BF9\u8BDD",
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
  "create.error": "\u65E0\u6CD5\u521B\u5EFA\u9879\u76EE\u3002",
  "detail.back": "\u5168\u90E8\u9879\u76EE",
  "detail.newChat": "\u65B0\u5EFA\u804A\u5929",
  "detail.star": "\u56FA\u5B9A\u5230\u4FA7\u680F",
  "detail.unstar": "\u53D6\u6D88\u56FA\u5B9A",
  "row.pin": "\u56FA\u5B9A\u5728\u4FA7\u680F",
  "row.unpin": "\u53D6\u6D88\u56FA\u5B9A",
  "row.newChat": "\u5728\u6B64\u9879\u76EE\u65B0\u5EFA\u804A\u5929",
  "detail.delete": "\u5220\u9664\u9879\u76EE",
  "delete.title": "\u5220\u9664\u300C{name}\u300D\uFF1F",
  "delete.close": "\u5173\u95ED",
  "detail.delete.confirm": "\u8FD9\u5C06\u5220\u9664\u9879\u76EE\u6587\u4EF6\u5939\u53CA\u5176\u4E2D\u7684\u6307\u4EE4\u3001\u8BB0\u5FC6\u548C\u77E5\u8BC6\u6587\u4EF6\u3002\u5BF9\u8BDD\u4F1A\u4FDD\u7559\u3002",
  "section.instructions": "\u81EA\u5B9A\u4E49\u6307\u4EE4",
  "instructions.hint": "\u5B58\u50A8\u5728\u9879\u76EE\u6587\u4EF6\u5939\u7684 AGENTS.md \u4E2D\u3002\u5728\u6B64\u6253\u5F00\u7684\u6BCF\u6B21\u804A\u5929\u90FD\u4F1A\u81EA\u52A8\u52A0\u8F7D\u3002",
  "instructions.save": "\u4FDD\u5B58",
  "instructions.saved": "\u5DF2\u4FDD\u5B58\u3002",
  "instructions.error": "\u65E0\u6CD5\u4FDD\u5B58\u6307\u4EE4\u3002",
  "instructions.placeholder": "# \u9879\u76EE\u6307\u4EE4\n\n\u63CF\u8FF0\u9879\u76EE\u3001\u7EA6\u5B9A\uFF0C\u4EE5\u53CA\u4EE3\u7406\u5E94\u59CB\u7EC8\u77E5\u9053\u7684\u5185\u5BB9\u2026",
  "section.knowledge": "\u77E5\u8BC6\u6587\u4EF6",
  "knowledge.hint": "\u4EE3\u7406\u5728\u672C\u9879\u76EE\u4E2D\u53EF\u8BFB\u53D6\u7684\u6587\u4EF6\uFF08\u6587\u6863\u3001\u89C4\u683C\u3001\u53C2\u8003\u8D44\u6599\uFF09\u3002",
  "knowledge.upload": "\u4E0A\u4F20\u6587\u4EF6",
  "knowledge.delete": "\u5220\u9664",
  "sessions.empty": "\u8FD8\u6CA1\u6709\u804A\u5929\u3002\u7528\u300C\u65B0\u5EFA\u804A\u5929\u300D\u5F00\u59CB\u3002",
  "session.none.title": "\u672A\u547D\u540D",
  "loading": "\u52A0\u8F7D\u4E2D\u2026",
  "error.generic": "\u51FA\u9519\u4E86\u3002",
  "retry": "\u91CD\u8BD5"
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
.dshpx-root svg, .dshpx-side svg, .dshpx-tabpane svg, .dshpx-header-btn svg { fill: currentColor; }
.dshpx-root button, .dshpx-tabpane button { font-family: inherit; }

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

/* ---- sidebar group (own seat above the workspace list): mirrors dsh workspace rows ---- */
.dshpx-seat { flex: none; }
:is([class$="_collapsed"], [class*="_collapsed "]) .dshpx-seat { display: none; }
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
.dshpx-edit { gap: 10px; }
.dshpx-edit-name { font-size: 20px; font-weight: 650; padding: 8px 12px; }


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
/* New-chat hero: our picker chip replaces dsh's workspace chip and takes its seat.
   Styles copy dsh's chip (HeroShell .workspace). */
[class$="_heroWorkspaceRow"]:has(.dshpx-hero-chip) > button[aria-haspopup="menu"]:not(.dshpx-hero-chip) { display: none; }
:has(> [data-slot="conversation.hero.options"] .dshpx-hero-chip) { order: -1; margin-left: 0 !important; }
.dshpx-hero-chip {
  display: inline-flex; align-items: center; gap: 4px; max-width: min(100%, 360px); min-height: 28px; padding: 0 8px;
  border: none; border-radius: var(--dsw-radius-sm); background: transparent; cursor: pointer;
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; line-height: 20px; font-weight: 500;
}
.dshpx-hero-chip[aria-expanded="true"], .dshpx-hero-chip:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dshpx-hero-chip span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-hero-chip svg { flex: none; fill: currentColor; }
.dshpx-hero-chip .dshpx-hero-chevron { color: var(--dsw-alias-label-caption); }
.dshpx-danger-btn { --dsw-alias-button-primary-fill: var(--dsw-alias-state-error-primary); --dsw-alias-button-primary-hover: var(--dsw-alias-state-error-primary); }
.dshpx-header-btn {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 6px; padding: 4px; cursor: pointer;
  color: var(--dsw-alias-label-caption); transition: background 120ms ease, color 120ms ease;
}
.dshpx-header-btn:hover { background: var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-skeleton)); color: var(--dsw-alias-label-primary); }


/* ---- projects page (grid + project page) ---- */
.dshpx-page { height: 100%; overflow-y: auto; display: flex; flex-direction: column; }
.dshpx-page-inner { width: 100%; max-width: 1080px; margin: 0 auto; box-sizing: border-box; padding: 32px 40px 48px; display: flex; flex-direction: column; gap: 16px; }
.dshpx-page-title { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.01em; color: var(--dsw-alias-label-primary); overflow-wrap: anywhere; }
.dshpx-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.dshpx-toolbar-end { display: flex; align-items: center; gap: 6px; }
.dshpx-toolbar-end .dshpx-search { padding: 5px 10px; }
.dshpx-tabs { display: flex; gap: 4px; }
.dshpx-tab { border: none; background: transparent; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13.5px; color: var(--dsw-alias-label-secondary); }
.dshpx-tab:hover { background: var(--dshpx-hover); color: var(--dsw-alias-label-primary); }
.dshpx-tab[aria-selected="true"] { background: var(--dshpx-fill); color: var(--dsw-alias-label-primary); }
.dshpx-icon-btn[aria-pressed="true"] { color: var(--dsw-alias-label-primary); }
.dshpx-tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.dshpx-tile {
  display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 12px; cursor: pointer;
  background: var(--dshpx-fill); border: 1px solid transparent; transition: border-color 120ms ease, background 120ms ease;
}
.dshpx-tile:hover, .dshpx-tile:focus-visible { border-color: var(--dshpx-line); background: var(--dshpx-hover); outline: none; }
.dshpx-tile-icon { flex: none; width: 36px; height: 36px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); }
.dshpx-tile-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.dshpx-tile-name { font-size: 14.5px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-tile-date { font-size: 12.5px; color: var(--dsw-alias-label-caption); }
.dshpx-tile-pin { flex: none; color: var(--dsw-alias-label-primary); }
.dshpx-tile-more { flex: none; display: none; }
.dshpx-tile:hover .dshpx-tile-more, .dshpx-tile:focus-within .dshpx-tile-more { display: inline-flex; }
.dshpx-crumbs { flex: none; display: flex; align-items: center; gap: 4px; padding: 10px 16px; border-bottom: 1px solid var(--dshpx-line); }
.dshpx-crumb { display: inline-flex; align-items: center; gap: 4px; border: none; background: transparent; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-size: 14px; color: var(--dsw-alias-label-secondary); max-width: 50vw; }
.dshpx-crumb:hover { background: var(--dshpx-hover); color: var(--dsw-alias-label-primary); }
.dshpx-crumb-cur { color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-crumb-sep { color: var(--dsw-alias-label-caption); }
.dshpx-crumbs-end { margin-left: auto; display: flex; gap: 4px; }
.dshpx-proj { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 48px; align-items: start; }
.dshpx-proj-main { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.dshpx-composer { margin-top: 8px; border: 1px solid var(--dshpx-line); border-radius: 16px; background: var(--dshpx-fill); padding: 12px 14px 8px; display: flex; flex-direction: column; gap: 4px; }
.dshpx-composer:focus-within { border-color: color-mix(in srgb, var(--dsw-alias-label-primary) 25%, transparent); }
.dshpx-composer textarea { border: none; outline: none; resize: none; background: transparent; font: inherit; font-size: 14.5px; line-height: 1.5; color: var(--dsw-alias-label-primary); min-height: 44px; }
.dshpx-composer textarea::placeholder { color: var(--dsw-alias-label-caption); }
.dshpx-composer-foot { display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
.dshpx-send { width: 32px; height: 32px; border-radius: 999px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
  background: var(--dsw-alias-button-primary-fill, var(--dsw-alias-label-primary)); color: var(--dsw-alias-label-primary-inverted, var(--dsw-alias-bg-base)); }
.dshpx-send:disabled { opacity: 0.35; cursor: default; }
.dshpx-recent-h { margin: 24px 0 0; font-size: 13px; font-weight: 500; color: var(--dsw-alias-label-caption); }
.dshpx-recent { display: flex; flex-direction: column; }
.dshpx-recent-row { display: flex; align-items: center; gap: 12px; height: 48px; box-sizing: border-box; padding: 0 10px; border-radius: 10px; cursor: pointer; font-size: 14px; position: relative; }
.dshpx-recent-row + .dshpx-recent-row::before { content: ''; position: absolute; top: 0; left: 10px; right: 10px; border-top: 1px solid var(--dshpx-line); }
.dshpx-recent-row:hover, .dshpx-recent-row:focus-visible { background: var(--dshpx-hover); outline: none; }
.dshpx-recent-row:hover::before, .dshpx-recent-row:hover + .dshpx-recent-row::before { border-color: transparent; }
.dshpx-recent-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-primary); }
.dshpx-recent-date { flex: none; font-size: 13px; color: var(--dsw-alias-label-caption); }
.dshpx-recent-more { flex: none; display: none; }
.dshpx-recent-row:hover .dshpx-recent-more, .dshpx-recent-row:focus-within .dshpx-recent-more { display: inline-flex; }
.dshpx-recent-row:hover .dshpx-recent-date, .dshpx-recent-row:focus-within .dshpx-recent-date { display: none; }
.dshpx-proj-side { display: flex; flex-direction: column; padding-top: 64px; }
.dshpx-side-item { display: flex; align-items: center; gap: 12px; height: 48px; box-sizing: border-box; padding: 0 10px; border: none; border-radius: 10px; background: transparent; cursor: pointer; text-align: left; font-size: 14px; color: var(--dsw-alias-label-primary); }
.dshpx-side-item:hover { background: var(--dshpx-hover); }
.dshpx-side-item-icon { flex: none; display: inline-flex; color: var(--dsw-alias-label-secondary); }
.dshpx-side-item-label { flex: none; }
.dshpx-side-item-meta { flex: 1; font-size: 12px; color: var(--dsw-alias-label-caption); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-side-item-action { margin-left: auto; flex: none; font-size: 13.5px; color: var(--dsw-alias-label-secondary); }
.dshpx-side-goal { margin: 14px 4px 0; font-size: 13px; line-height: 1.5; color: var(--dsw-alias-label-secondary); white-space: pre-wrap; }
.dshpx-proj-side .dshpx-path { margin: 10px 4px 0; }
[class*="_itemWrap"]:has(> [class*="_submenu"])::after { content: ''; position: absolute; top: 0; bottom: 0; left: 100%; width: 12px; }
.dshpx-back { margin-right: 4px; }
.dshpx-modal { width: min(640px, 92vw); max-width: none; }
.dshpx-modal .dshpx-card { border: none; padding: 0; }
.dshpx-modal .dshpx-card > .dshpx-card-head > .dshpx-h2, .dshpx-modal .dshpx-row-head > .dshpx-h2 { display: none; }

/* ---- mobile: single pane (JS decides which pane; CSS keeps it full-bleed) ---- */
@media (max-width: 820px) {
  .dshpx-tiles { grid-template-columns: minmax(0, 1fr); }
  .dshpx-proj { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .dshpx-proj-side { padding-top: 0; }
  .dshpx-page-inner { padding: 20px 16px 32px; }
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
function cwdOf(row) {
  var _a, _b;
  return (_b = (_a = row == null ? void 0 : row.projectionValues) == null ? void 0 : _a.workingDirectory) != null ? _b : row == null ? void 0 : row.cwd;
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
  return ((_a = row.title) == null ? void 0 : _a.trim()) || t("session.none.title");
}
function sessionsFor(project, all) {
  if (!(project == null ? void 0 : project.path)) return [];
  const p = project.path;
  return all.filter((r) => !r.blank && r.origin !== "subagent").filter((r) => {
    var _a, _b;
    return ((_a = cwdOf(r)) != null ? _a : "") === p || ((_b = cwdOf(r)) != null ? _b : "").startsWith(p + "/");
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
var moveTargets = [];
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-lead-folder", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size: 16 }) }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size, className: "dshpx-nav-icon" });
}
var seatMounted = false;
function mountSidebarSeat() {
  const host = document.createElement("div");
  host.className = "dshpx-seat";
  const root = (0, import_client.createRoot)(host);
  root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsSidebarGroup, {}));
  const place = () => {
    const region = document.querySelector('[class$="_regionArea"], [class*="_regionArea "]');
    if (!region || host.nextElementSibling === region) return;
    region.before(host);
    if (!seatMounted) {
      seatMounted = true;
      notifyChanged();
    }
  };
  place();
  const mo = new MutationObserver(place);
  mo.observe(document.body, { childList: true, subtree: true });
  return () => {
    mo.disconnect();
    root.unmount();
    host.remove();
    seatMounted = false;
  };
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-root dshpx-page", children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPage, { t, slug: selected, allSessions }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsGrid, { t, allSessions }) });
}
function shortDate(ts) {
  const days = Math.floor((Date.now() - ts) / 864e5);
  if (days < 7) return new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }).format(-days, "day");
  const d = new Date(ts);
  return d.toLocaleDateString(void 0, { day: "numeric", month: "short", year: d.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? void 0 : "numeric" });
}
function lastActive(p, all) {
  return Math.max(new Date(p.createdAt).getTime() || 0, ...sessionsFor(p, all).map((r) => r.updatedAt));
}
function openChat(id) {
  const ws = appCtx.get("uiWorkspace");
  ws.openSession(id);
  appCtx.layout.selectPanel(null);
}
function ProjectsGrid({ t, allSessions }) {
  const [rows, setRows] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [filter, setFilter] = (0, import_react.useState)(null);
  const [creating, setCreating] = (0, import_react.useState)(false);
  const [archived, setArchived] = (0, import_react.useState)(false);
  const [byName, setByName] = (0, import_react.useState)(false);
  const load = (0, import_react.useCallback)(() => {
    setError(null);
    getJson("list").then((d) => {
      setRows(Array.isArray(d == null ? void 0 : d.projects) ? d.projects : []);
    }).catch(() => setError(t("error.generic")));
  }, [t]);
  (0, import_react.useEffect)(load, [load]);
  useOnChanged(load);
  const f = (filter != null ? filter : "").trim().toLowerCase();
  const visible = (rows != null ? rows : []).filter((p) => !!p.archived === archived).filter((p) => {
    var _a;
    return !f || p.name.toLowerCase().includes(f) || ((_a = p.description) != null ? _a : "").toLowerCase().includes(f);
  }).map((p) => ({ p, at: lastActive(p, allSessions) })).sort((a, b) => Number(!!b.p.starred) - Number(!!a.p.starred) || (byName ? a.p.name.localeCompare(b.p.name) : b.at - a.at));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-page-inner", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "dshpx-page-title", children: t("tree.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-toolbar", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-tabs", role: "tablist", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "tab", "aria-selected": !archived, className: "dshpx-tab", onClick: () => setArchived(false), children: t("grid.yours") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "tab", "aria-selected": archived, className: "dshpx-tab", onClick: () => setArchived(true), children: t("tree.archived") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-toolbar-end", children: [
        filter !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-search", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 13 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              autoFocus: true,
              value: filter,
              placeholder: t("tree.search"),
              onChange: (e) => setFilter(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Escape") setFilter(null);
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-icon-btn", title: t("tree.search"), "aria-pressed": filter !== null, onClick: () => setFilter(filter === null ? "" : null), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSearchOutlineRegular, { size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-icon-btn", title: byName ? t("grid.sort.name") : t("grid.sort.recent"), onClick: () => setByName((v) => !v), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronsUpDownOutlineRegular, { size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", onClick: () => setCreating(true), children: t("create.title") })
      ] })
    ] }),
    creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateForm, { t, onDone: (p) => {
      setCreating(false);
      notifyChanged();
      select(p.slug);
    }, onCancel: () => setCreating(false) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { t, message: error, onRetry: load }),
    !error && rows === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("loading") }),
    !error && rows !== null && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: rows.length === 0 ? t("empty.hint") : "\u2014" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-tiles", children: visible.map(({ p, at }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "dshpx-tile",
        role: "button",
        tabIndex: 0,
        onClick: () => select(p.slug),
        onKeyDown: (e) => {
          if (e.key === "Enter") select(p.slug);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-tile-icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size: 18 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dshpx-tile-text", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-tile-name", children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-tile-date", children: shortDate(at) })
          ] }),
          p.starred && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPinFillRegular, { size: 16, className: "dshpx-tile-pin" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-tile-more", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openProjectMenu(e, p) }) })
        ]
      },
      p.slug
    )) })
  ] });
}
async function sendProjectChat(cwd, text) {
  const sessions = appCtx.get("sessions");
  const id = await sessions.create({ cwd });
  openChat(id);
  const r = await sessions.using(id, { source: "controllerOperation" }, async (ref) => {
    const b = await ref.ready;
    return b.session.prompt([{ type: "text", text }], "queue");
  }).catch(() => null);
  return !!(r == null ? void 0 : r.ok);
}
function ProjectPage({ t, slug, allSessions }) {
  const [detail, setDetail] = (0, import_react.useState)(null);
  const [notes, setNotes] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(null);
  const [modal, setModal] = (0, import_react.useState)(null);
  const [text, setText] = (0, import_react.useState)("");
  const [sending, setSending] = (0, import_react.useState)(false);
  const [sendErr, setSendErr] = (0, import_react.useState)(false);
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
  useOnChanged(load);
  const checkEdit = (0, import_react.useCallback)(() => {
    if (editRequest === slug) {
      editRequest = null;
      setModal("edit");
    }
  }, [slug]);
  (0, import_react.useEffect)(checkEdit, [checkEdit]);
  useOnChanged(checkEdit);
  const send = async () => {
    const body = text.trim();
    if (!body || !(detail == null ? void 0 : detail.path) || sending) return;
    setSending(true);
    setSendErr(false);
    const ok = await sendProjectChat(detail.path, body).catch(() => false);
    setSending(false);
    if (ok) setText("");
    else setSendErr(true);
  };
  const togglePin = async () => {
    if (!detail) return;
    await postJson("star?slug=" + encodeURIComponent(detail.slug), { starred: !detail.starred });
    notifyChanged();
  };
  const chats = detail ? sessionsFor(detail, allSessions) : [];
  const memCount = notes.split("\n").filter((l) => /^\s*[-*]\s+\S/.test(l)).length;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-crumbs", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-icon-btn dshpx-back", title: t("detail.back"), "aria-label": t("detail.back"), onClick: () => select(null), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronLeftOutlineRegular, { size: 16 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-crumb", onClick: () => select(null), children: t("tree.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-crumb-sep", children: "/" }),
      detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dshpx-crumb dshpx-crumb-cur", "aria-haspopup": "menu", onClick: (e) => openProjectMenu(e, detail), children: [
        detail.name,
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 14 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-crumbs-end", children: detail && !detail.archived && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-icon-btn", title: detail.starred ? t("detail.unstar") : t("detail.star"), onClick: () => void togglePin(), children: detail.starred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPinFillRegular, { size: 16, className: "dshpx-pin-on" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPinOutlineRegular, { size: 16 }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-page-inner", children: [
      error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBox, { t, message: error, onRetry: load }),
      !error && detail === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("loading") }),
      !error && detail !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-proj", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-proj-main", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "dshpx-page-title", children: detail.name }),
          detail.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-desc", children: detail.description }),
          detail.archived && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm",
              type: "button",
              style: { alignSelf: "flex-start" },
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-composer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "textarea",
              {
                value: text,
                rows: 2,
                disabled: sending || !detail.path,
                autoFocus: true,
                placeholder: t("page.composer").replace("{name}", detail.name),
                onChange: (e) => setText(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    void send();
                  }
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-composer-foot", children: [
              sendErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("page.sendFailed") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dshpx-send", title: t("page.send"), "aria-label": t("page.send"), disabled: !text.trim() || sending, onClick: () => void send(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconSendOutlineRegular, { size: 16 }) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "dshpx-recent-h", children: t("page.recent") }),
          chats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-muted", children: t("page.noChats") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dshpx-recent", children: chats.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: "dshpx-recent-row",
              role: "button",
              tabIndex: 0,
              onClick: () => openChat(r.id),
              onKeyDown: (e) => {
                if (e.key === "Enter") openChat(r.id);
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-recent-title", children: sessionTitle(r, t) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-recent-date", children: shortDate(r.updatedAt) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-recent-more", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openChatMenu(e, r.id, sessionTitle(r, t)) }) })
              ]
            },
            r.id
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { className: "dshpx-proj-side", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size: 16 }), label: t("goal.title"), meta: detail.goal ? "" : t("page.notSet"), action: t("memory.edit"), onClick: () => setModal("edit") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconListPenOutlineRegular, { size: 16 }), label: t("page.instructions"), action: t("memory.edit"), onClick: () => setModal("instructions") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPaperclipOutlineRegular, { size: 16 }), label: t("page.knowledge"), meta: t("page.files").replace("{n}", String(detail.knowledge.length)), action: t("note.add"), onClick: () => setModal("knowledge") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideRow, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconThinkOutlineRegular, { size: 16 }), label: t("memory.title"), meta: memCount ? String(memCount) : "", action: t("page.view"), onClick: () => setModal("memory") }),
          detail.goal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-side-goal", children: detail.goal }),
          detail.path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dshpx-path", children: detail.path })
        ] })
      ] })
    ] }),
    detail && modal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_dsh_client_ui_primitives.Modal,
      {
        open: true,
        onClose: () => setModal(null),
        closeLabel: t("delete.close"),
        className: "dshpx-modal",
        contentClassName: "dshpx-root",
        title: modal === "edit" ? t("menu.edit") : modal === "instructions" ? t("section.instructions") : modal === "knowledge" ? t("section.knowledge") : t("memory.title"),
        children: [
          modal === "edit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProject, { t, detail, onDone: () => setModal(null) }),
          modal === "instructions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstructionsEditor, { t, detail, onChange: load }),
          modal === "knowledge" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeFiles, { t, detail, onChange: load }),
          modal === "memory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Memory, { t, slug: detail.slug, notes, onSaved: setNotes })
        ]
      }
    )
  ] });
}
function SideRow({ icon, label, meta, action, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "dshpx-side-item", onClick, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-item-icon", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-item-label", children: label }),
    meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-item-meta", children: meta }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-item-action", children: action })
  ] });
}
function EditProject({ t, detail, onDone }) {
  var _a, _b;
  const [v, setV] = (0, import_react.useState)({ name: detail.name, description: (_a = detail.description) != null ? _a : "", goal: (_b = detail.goal) != null ? _b : "" });
  const [err, setErr] = (0, import_react.useState)(false);
  const save = async () => {
    const d = await postJson("rename?slug=" + encodeURIComponent(detail.slug), v).catch(() => null);
    if (!(d == null ? void 0 : d.ok)) {
      setErr(true);
      return;
    }
    notifyChanged();
    onDone();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-head dshpx-edit", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
      t("create.name"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "dshpx-input", value: v.name, maxLength: 60, autoFocus: true, onChange: (e) => setV({ ...v, name: e.target.value }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
      t("create.description"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "dshpx-input", value: v.description, placeholder: t("create.description.placeholder"), onChange: (e) => setV({ ...v, description: e.target.value }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dshpx-label", children: [
      t("goal.title"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "dshpx-textarea dshpx-goal-input", value: v.goal, placeholder: t("goal.placeholder"), maxLength: 2e3, onChange: (e) => setV({ ...v, goal: e.target.value }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-btns", children: [
      err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-err", children: t("create.invalid") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-ghost dshpx-btn-sm", onClick: onDone, children: t("create.cancel") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dshpx-btn dshpx-btn-primary dshpx-btn-sm", disabled: !v.name.trim(), onClick: () => void save(), children: t("instructions.save") })
    ] })
  ] });
}
function ProjectsSidebarGroup() {
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
  if (!t) return null;
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
  const openChat2 = (id) => {
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
        chats.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dshpx-side-child", role: "button", tabIndex: 0, onClick: () => openChat2(r.id), onKeyDown: (e) => {
          if (e.key === "Enter") openChat2(r.id);
        }, title: sessionTitle(r, t), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-child-title", children: sessionTitle(r, t) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dshpx-side-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreButton, { label: t("menu.more"), onClick: (e) => openChatMenu(e, r.id, sessionTitle(r, t)) }) })
        ] }, r.id))
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
var heroMenu = { open: false, anchor: null, selected: void 0, subs: /* @__PURE__ */ new Set() };
function setHeroMenu(open, anchor, selected) {
  heroMenu.open = open;
  if (anchor !== void 0) heroMenu.anchor = anchor;
  if (selected !== void 0 || open) heroMenu.selected = selected;
  for (const fn of heroMenu.subs) fn();
}
function useHeroMenuOpen() {
  return (0, import_react.useSyncExternalStore)((cb) => {
    heroMenu.subs.add(cb);
    return () => {
      heroMenu.subs.delete(cb);
    };
  }, () => heroMenu.open);
}
function useLiveProjects() {
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
  return (0, import_react.useMemo)(() => rows.filter((r) => r.path && !r.archived).sort((a, b) => Number(!!b.starred) - Number(!!a.starred) || a.name.localeCompare(b.name)), [rows]);
}
function projectOf(projects, cwd) {
  return cwd ? projects.find((p) => p.path && (cwd === p.path || cwd.startsWith(p.path + "/"))) : void 0;
}
function workspaceList() {
  var _a;
  return (_a = appCtx == null ? void 0 : appCtx.get("workspaces")) == null ? void 0 : _a.list.getSnapshot();
}
function HeroPickerChip(props) {
  var _a, _b, _c;
  const { sessionId, useSessions } = props;
  const cwd = useSessions((s) => cwdOf(s.byId[sessionId]));
  const projects = useLiveProjects();
  const open = useHeroMenuOpen();
  const wsList = (_a = appCtx == null ? void 0 : appCtx.get("workspaces")) == null ? void 0 : _a.list;
  const ws = (0, import_react.useSyncExternalStore)((cb) => {
    var _a2;
    return (_a2 = wsList == null ? void 0 : wsList.subscribe(cb)) != null ? _a2 : (() => {
    });
  }, () => wsList == null ? void 0 : wsList.getSnapshot());
  const tc = appCtx.locale.bind("conversation");
  const project = projectOf(projects, cwd);
  const workspace = project ? void 0 : (_b = ws == null ? void 0 : ws.items) == null ? void 0 : _b.find((w) => w.sessionIds.includes(sessionId));
  const label = (_c = project == null ? void 0 : project.name) != null ? _c : workspace ? workspaceTitle(workspace.title, tc("workspace.defaultName")) : tc("hero.chooseWorkspace");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      className: "dshpx-hero-chip",
      type: "button",
      "aria-label": tc("hero.chooseWorkspace"),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: (e) => {
        setHeroMenu(!open, e.currentTarget, project ? "p:" + project.slug : workspace == null ? void 0 : workspace.workspaceId);
      },
      children: [
        project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size: 16 }) : workspace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderOpenRegular, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { size: 12, className: "dshpx-hero-chevron" })
      ]
    }
  );
}
function workspaceTitle(title, localizedDefault) {
  return title === "default-workspace" ? localizedDefault : title;
}
function wrapWorkspacePicker(Stock) {
  const empty = /* @__PURE__ */ new WeakMap();
  return function DeepProjectsPicker(props) {
    const ours = useHeroMenuOpen();
    const [adding, setAdding] = (0, import_react.useState)(false);
    const projects = useLiveProjects();
    const workspaces = props.useWorkspaces((s) => s.items);
    const t = appCtx.locale.bind("projects");
    const close = () => {
      setHeroMenu(false);
      props.onClose();
    };
    const items = [
      ...projects.length === 0 ? [] : [
        { type: "label", id: "label:projects", text: t("nav") },
        ...projects.map((p) => ({ id: "p:" + p.slug, label: p.name, icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconGoalOutlineRegular, { size: 16 }) }))
      ],
      ...workspaces.length === 0 ? [] : [
        { type: "label", id: "label:workspaces", text: t("hero.workspaces") },
        ...workspaces.map((w) => ({ id: w.workspaceId, label: workspaceTitle(w.title, props.t("workspace.defaultName")), icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 }) }))
      ]
    ];
    const onSelect = (id) => {
      close();
      if (id === "::add") setAdding(true);
      else if (id.startsWith("p:")) {
        const p = projects.find((x) => "p:" + x.slug === id);
        if (p == null ? void 0 : p.path) void startProjectChat(p.path);
      } else props.onPick(id);
    };
    const emptyWorkspaces = (0, import_react.useCallback)((sel) => props.useWorkspaces((s) => {
      let e = empty.get(s);
      if (!e) {
        e = { ...s, items: [], phase: "ready" };
        empty.set(s, e);
      }
      return sel(e);
    }), [props.useWorkspaces]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Menu,
        {
          open: (props.open || ours) && !adding,
          anchor: null,
          items,
          footer: [{ id: "::add", label: props.t("menu.addWorkspace"), icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconPlusOutlineRegular, { size: 16 }) }],
          selectedId: ours ? heroMenu.selected : props.selectedId,
          onSelect,
          onClose: close,
          side: "bottom",
          portal: true,
          getAnchorRect: () => {
            var _a, _b, _c;
            return (_c = (_b = ours ? heroMenu.anchor : (_a = props.anchorRef) == null ? void 0 : _a.current) == null ? void 0 : _b.getBoundingClientRect()) != null ? _c : null;
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stock, { ...props, open: adding, onClose: () => {
        setAdding(false);
      }, useWorkspaces: emptyWorkspaces })
    ] });
  };
}
function confirmDelete(name) {
  const t = appCtx.locale.bind("projects");
  const host = document.body.appendChild(document.createElement("div"));
  const root = (0, import_client.createRoot)(host);
  return new Promise((resolve) => {
    const done = (ok) => {
      root.unmount();
      host.remove();
      resolve(ok);
    };
    root.render(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Modal,
        {
          open: true,
          onClose: () => {
            done(false);
          },
          title: t("delete.title").replace("{name}", name),
          closeLabel: t("delete.close"),
          description: t("detail.delete.confirm"),
          footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", onClick: () => {
              done(false);
            }, children: t("create.cancel") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "primary", className: "dshpx-danger-btn", autoFocus: true, onClick: () => {
              done(true);
            }, children: t("detail.delete") })
          ] })
        }
      )
    );
  });
}
function wrapComposerBar(Stock) {
  return function DeepProjectsComposerBar(props) {
    var _a, _b, _c;
    const sid = props.sessionId;
    if (props.disabled !== true || props.variant !== "hero" || !sid || !appCtx) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stock, { ...props });
    const cwd = (_b = (_a = appCtx.get("sessions")) == null ? void 0 : _a.list.getSnapshot().byId[sid]) == null ? void 0 : _b.cwd;
    if (!projectOf(moveTargets, cwd) || ((_c = workspaceList()) == null ? void 0 : _c.items.some((w) => w.sessionIds.includes(sid)))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stock, { ...props });
    const { disabled: _d, workspacePickerOpen: _o, onRequestWorkspace: _r, ...rest } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stock, { ...rest, placeholder: appCtx.locale.bind("conversation")("placeholder.hero") });
  };
}
function wrapStockSlot(ctx, name, wrap) {
  let entry;
  let original;
  let timer;
  let tries = 0;
  const attempt = () => {
    var _a, _b, _c;
    entry = (_c = (_b = (_a = ctx.slots).entriesOfSlot) == null ? void 0 : _b.call(_a, name)) == null ? void 0 : _c[0];
    if (!entry) {
      if (++tries < 40) timer = setTimeout(attempt, 250);
      return;
    }
    original = entry.component;
    entry.component = wrap(original);
  };
  attempt();
  return () => {
    clearTimeout(timer);
    if (entry && original) entry.component = original;
  };
}
function ProjectHeaderButton(props) {
  const t = props.t;
  const { sessionId, useSessions } = props;
  const cwd = useSessions((s) => cwdOf(s.byId[sessionId]));
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
    if (!await confirmDelete(detail.name)) return;
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
  const cwd = useSessions((s) => cwdOf(s.byId[sessionId]));
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
      "deep-projects.unarchive": import_dsh_client_ui_primitives.IconUnarchiveOutlineRegular,
      "deep-projects.check": import_dsh_client_ui_primitives.IconCheckOutlineRegular
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
          if (!await confirmDelete(p.name)) return;
          await postJson("delete?slug=" + encodeURIComponent(p.slug));
          if (selectedSlug === p.slug) select(null);
          notifyChanged();
        }
      }
    ]
  }), "deep-projects: project menu");
  ctx.effect(() => {
    ctx.slots.inject(
      "conversation.hero.options",
      () => ctx.slots.register({ name: "conversation.hero.options", id: "deep-projects.picker", locale: "projects" }, HeroPickerChip)
    );
  }, "deep-projects: hero picker chip");
  ctx.effect(() => wrapStockSlot(ctx, "conversation.hero.workspace", wrapWorkspacePicker), "deep-projects: hero picker menu");
  ctx.effect(() => wrapStockSlot(ctx, "conversation.composer.bar", wrapComposerBar), "deep-projects: project chat input");
  ctx.effect(() => ctx.contextMenus.register({
    id: "deep-projects.move",
    target: "session",
    order: 450,
    observe: () => [ctx.sessions.list],
    resolve: ({ sessionId }) => {
      var _a;
      const row = ctx.sessions.list.getSnapshot().byId[sessionId];
      const cwd = (_a = cwdOf(row)) != null ? _a : "";
      const rows = moveTargets.filter((p) => p.path && !p.archived);
      const current = rows.find((p) => cwd === p.path || cwd.startsWith(p.path + "/"));
      const move = (slug) => async () => {
        var _a2;
        const sessions = ctx.sessions;
        const r = await sessions.using(sessionId, { source: "controllerOperation" }, () => postJson("move", { sessionId, slug }));
        if (!(r == null ? void 0 : r.ok)) throw new Error((_a2 = r == null ? void 0 : r.error) != null ? _a2 : "move failed");
        await sessions.refreshProjections(sessionId).catch(() => {
        });
        notifyChanged();
      };
      return [
        {
          id: "move",
          label: t("menu.moveTo"),
          icon: { key: "deep-projects.open" },
          disabled: rows.length === 0,
          children: rows.map((p) => p === current ? { id: p.slug, label: p.name, icon: { key: "deep-projects.check" }, run: () => {
          } } : { id: p.slug, label: p.name, run: move(p.slug), failureLabel: t("menu.moveFailed") })
        },
        ...current ? [{ id: "remove", label: t("menu.removeFrom"), icon: { key: "deep-projects.archive" }, run: move(null), failureLabel: t("menu.moveFailed") }] : []
      ];
    }
  }), "deep-projects: move chat menu");
  ctx.effect(() => {
    const fit = () => {
      for (const el of document.querySelectorAll('[role="menu"][class*="_submenu"]')) {
        const r = el.getBoundingClientRect();
        if (r.top >= 12) continue;
        el.style.maxHeight = Math.max(120, r.bottom - 12) + "px";
        el.style.overflowY = "auto";
      }
    };
    const mo = new MutationObserver(() => {
      requestAnimationFrame(fit);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
    };
  }, "deep-projects: submenu fit");
  const loadTargets = () => {
    getJson("list").then((r) => {
      var _a;
      moveTargets = (r == null ? void 0 : r.ok) ? (_a = r.projects) != null ? _a : [] : [];
    }).catch(() => {
    });
  };
  loadTargets();
  changeListeners.add(loadTargets);
  ctx.effect(() => {
    ctx.slots.inject(
      "sidebar.panellist",
      () => ctx.slots.register(
        { name: "sidebar.panellist", id: PANEL_ID, order: 20, label: () => t("nav"), locale: "projects" },
        ProjectsPanelIcon
      )
    );
  }, "deep-projects: sidebar");
  ctx.effect(mountSidebarSeat, "deep-projects: sidebar projects");
  ctx.effect(() => {
    const onClick = (e) => {
      var _a, _b;
      const row = (_b = (_a = e.target) == null ? void 0 : _a.closest) == null ? void 0 : _b.call(_a, 'button, a, [role="button"], [role="menuitem"]');
      if (row == null ? void 0 : row.querySelector(".dshpx-nav-icon")) select(null);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, "deep-projects: projects row resets to tiles");
  ctx.effect(() => ctx.slots.inject("sidebar.panellist", () => {
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
        if (seatMounted) return;
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
