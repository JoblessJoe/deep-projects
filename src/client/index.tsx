// deep-projects client: Claude-Desktop-style Projects.
//
// Main panel = 2 panes (single pane on narrow/mobile viewports):
//   left   — project tree; each project is COLLAPSIBLE and lists its chats
//            (sessions whose cwd is inside the project folder); clicking a chat
//            opens it. Pinned projects sort first; filter box on top. Each row
//            carries a pin toggle + a "new chat" button.
//   right  — selected project: quick-memory bar (append a dated bullet to
//            AGENTS.local.md, editable), knowledge files (drag-or-pick upload),
//            and the instructions editor (AGENTS.md).
//
// Sidebar: a pinnable "Projects" launcher (the shell's built-in panel pin
// system controls show/unpin) + a pinned-projects group in the sidebar column.
//
// Styling: one scoped <style> block (classes prefixed `dshpx-`) using the host
// design tokens (--dsw-alias-*), so hover/focus states and media queries work.
// No assets ship with the bundle.

import { useEffect, useMemo, useState, useSyncExternalStore, useCallback } from 'react'
import type { ReactNode, CSSProperties, DragEvent } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { MainPanelId } from '@deepseek-ai/dsh-client-ui-layout/client'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import {
  IconFolderCloseRegular as FolderClosedIcon,
  IconFolderOpenRegular as FolderOpenIcon,
  IconTriangleRightFillRegular as TriangleIcon,
  IconEllipsisOutlineRegular as MoreIcon,
  IconEditOutlineRegular as EditIcon,
  IconArchiveOutlineRegular as ArchiveIcon,
  IconUnarchiveOutlineRegular as UnarchiveIcon,
  IconFolderOpenRegular as OpenIcon,
  IconChevronLeftOutlineRegular as BackIcon,
  IconPlusOutlineRegular as AddIcon,
  IconSearchOutlineRegular as SearchIcon,
  IconPinFillRegular as PinFillIcon,
  IconPinOutlineRegular as PinOutlineIcon,
  IconNewChatOutlineRegular as NewChatIcon,
  IconTrashOutlineRegular as TrashIcon,
  IconDeliverDocRegular as DocIcon,
  IconChevronDownOutlineRegular as ChevronIcon,
} from '@deepseek-ai/dsh-client-ui-primitives'
// Type-only pulls (stripped by esbuild): augment cordis Context with the
// members we use (sessions, layout) + slot/locale types.
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar-right/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { en, zh } from '../locales'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    projects: keyof typeof en
  }
}

export const PANEL_ID = 'dsh-projects' as MainPanelId
const TAB_ID = 'dsh-projects'
export const inject = ['slots', 'locale', 'layout', 'sessions', 'sidebarRight', 'sidebarRightTabs', 'contextMenus']

// Single captured context, set once in apply(); the panel + icon read from it.
let appCtx: ClientContext | null = null
type T = (k: keyof typeof en) => string

// ---------------------------------------------------------------------------
// Scoped stylesheet — injected once. Real host tokens so light/dark themes and
// hover states work; `dshpx-` prefix avoids collisions with the host.
// ---------------------------------------------------------------------------
const STYLE_ID = 'dshpx-styles'
const CSS = `
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
`

function ensureStyles(): void {
  if (typeof document === 'undefined') return
  if (!document.getElementById(STYLE_ID)) {
    const el = document.createElement('style')
    el.id = STYLE_ID
    el.textContent = CSS
    document.head.appendChild(el)
  }
}

// ---------------------------------------------------------------------------
// Shared selection store — lets the panel remember which project is open.
// ---------------------------------------------------------------------------
let selectedSlug: string | null = null
const selectionListeners = new Set<() => void>()
function select(slug: string | null): void {
  if (selectedSlug === slug) return
  selectedSlug = slug
  for (const l of selectionListeners) l()
}
function subscribeSelection(cb: () => void): () => void {
  selectionListeners.add(cb)
  return () => { selectionListeners.delete(cb) }
}
function useSelection(): string | null {
  return useSyncExternalStore(subscribeSelection, () => selectedSlug, () => selectedSlug)
}

/** True while the viewport is narrow (phone / small window). */
function useNarrow(): boolean {
  const [narrow, setNarrow] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 820px)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow
}

// ---------------------------------------------------------------------------
// Data shapes (mirror the host routes' JSON)
// ---------------------------------------------------------------------------
interface KnowledgeFile { name: string; size: number; mtime: number }
interface ProjectRow {
  slug: string
  name: string
  description?: string
  starred?: boolean
  archived?: boolean
  createdAt: string
  path?: string
  fileCount?: number
}
interface ProjectDetail extends ProjectRow {
  goal?: string
  instructions: string
  knowledge: KnowledgeFile[]
}
interface SessionRow {
  sessionId: string
  updatedAt: number
  cwd?: string
  projections?: { values?: Record<string, unknown> } | null
}

// ---------------------------------------------------------------------------
// API helpers — slugs/names in query, JSON body where the host expects one
// ---------------------------------------------------------------------------
const q = (p: string) => '/api/deep-projects/' + p

async function getJson(path: string): Promise<any> {
  const res = await fetch(q(path), { headers: { accept: 'application/json' } })
  return res.json()
}
async function postJson(path: string, body?: unknown): Promise<any> {
  const res = await fetch(q(path), {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  return res.json()
}
// Raw binary upload: the File's bytes go straight in the body.
async function postRaw(path: string, bytes: ArrayBuffer): Promise<any> {
  const res = await fetch(q(path), { method: 'POST', body: bytes })
  return res.json()
}

/** Stable empty snapshot so the sidebar group's session hook can run before
 * the app context is ready. */
const EMPTY_SESSIONS = { byId: {}, all: [] } as const

function sessionTitle(row: SessionRow, t: T): string {
  const v = row.projections?.values
  const title = v && typeof v.title === 'string' && v.title.trim() ? v.title : ''
  return title || t('session.none.title')
}

/** Sessions whose cwd is inside the project folder. */
function sessionsFor(project: ProjectRow | null, all: SessionRow[]): SessionRow[] {
  if (!project?.path) return []
  const p = project.path
  return all
    .filter(r => (r.cwd ?? '') === p || (r.cwd ?? '').startsWith(p + '/'))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

/** Create a new chat whose cwd is the project folder and open it. */
async function startProjectChat(cwd: string): Promise<void> {
  const ctx = appCtx
  if (!ctx) return
  const sessions = ctx.get('sessions') as unknown as { create(opts?: { cwd?: string }): Promise<string> }
  const id = await sessions.create({ cwd })
  const ws = ctx.get('uiWorkspace') as unknown as { openSession(target: string): void }
  ws.openSession(id)
}

function relTime(ts: number): string {
  const d = Date.now() - ts
  if (d < 60_000) return 'now'
  if (d < 3_600_000) return Math.round(d / 60_000) + 'm'
  if (d < 86_400_000) return Math.round(d / 3_600_000) + 'h'
  if (d < 7 * 86_400_000) return Math.round(d / 86_400_000) + 'd'
  return new Date(ts).toLocaleDateString()
}

// ---------------------------------------------------------------------------
// Panel icon (sidebar entry glyph)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Change bus: any view that mutates a project calls notifyChanged(); every
// list/detail view reloads. editRequest asks the detail header to open its
// inline editor (set from the "…" menu).
// ---------------------------------------------------------------------------
const changeListeners = new Set<() => void>()
function notifyChanged(): void { for (const fn of changeListeners) fn() }
function useOnChanged(fn: () => void): void {
  useEffect(() => { changeListeners.add(fn); return () => { changeListeners.delete(fn) } }, [fn])
}
let editRequest: string | null = null

type Point = { x: number; y: number }
type Menus = { open(target: unknown, point: Point): void; close(): void; active: { getSnapshot(): any } }
const menus = (): Menus => (appCtx as any).contextMenus as Menus
function pointOf(e: { currentTarget: Element }): Point {
  const r = e.currentTarget.getBoundingClientRect()
  return { x: r.left, y: r.bottom }
}
function toggleMenu(kind: string, value: Record<string, unknown>, match: (v: any) => boolean, point: Point): void {
  const active = menus().active.getSnapshot()
  if (active?.kind === kind && match(active.value)) menus().close()
  else menus().open({ kind, value }, point)
}
/** dsh's own chat menu (rename, pin, archive, fork, …) for a session row. */
function openChatMenu(e: { currentTarget: Element; stopPropagation(): void }, sessionId: string, displayTitle: string): void {
  e.stopPropagation()
  toggleMenu('session', { sessionId, displayTitle }, v => v.sessionId === sessionId, pointOf(e))
}
/** The project menu registered in apply() (open, new chat, edit, pin, delete). */
function openProjectMenu(e: { currentTarget: Element; stopPropagation(): void }, p: ProjectRow): void {
  e.stopPropagation()
  toggleMenu('dsh-project', { slug: p.slug, name: p.name, path: p.path, starred: !!p.starred, archived: !!p.archived }, v => v.slug === p.slug, pointOf(e))
}
function showProject(slug: string): void {
  select(slug)
  appCtx!.layout.selectPanel(PANEL_ID)
}
function MoreButton({ label, onClick }: { label: string; onClick: (e: any) => void }): ReactNode {
  return <button type="button" className="dshpx-icon-btn dshpx-more" title={label} aria-label={label} aria-haspopup="menu" onClick={onClick} onKeyDown={(e) => e.stopPropagation()}><MoreIcon size={16} /></button>
}

/** Leading slot like dsh's workspace rows: closed/open folder, swaps to the
 *  expand arrow on row hover. Only the arrow toggles; the row click opens. */
function LeadSlot({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }): ReactNode {
  return (
    <span className="dshpx-lead">
      <span className="dshpx-lead-folder" aria-hidden="true">{open ? <FolderOpenIcon size={16} /> : <FolderClosedIcon size={16} />}</span>
      <button
        type="button" className="dshpx-lead-arrow" aria-label={label} aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); onToggle() }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <TriangleIcon size={12} className={open ? 'dshpx-arrow-open' : undefined} />
      </button>
    </span>
  )
}

function ProjectsPanelIcon({ size }: PropsRuntime<'sidebar.panellist'>): ReactNode {
  return <FolderClosedIcon size={size} />
}

// ---------------------------------------------------------------------------
// Panel: 2 panes desktop, single pane narrow (tree ⇄ detail with back button)
// ---------------------------------------------------------------------------
function forcedFallback(): boolean {
  try { return localStorage.getItem('deep-projects:fallback') === '1' } catch { return false }
}

/** True on stock dsh (no `sidebar.projects` seat), or when forced for testing
 *  with localStorage['deep-projects:fallback'] = '1'. */
function useFallbackRows(ctx: ClientContext): boolean {
  try { if (localStorage.getItem('deep-projects:fallback') === '1') return true } catch { /* no storage */ }
  return !(ctx.slots as any).spec?.('sidebar.projects')
}

/** Main panel behind a pinned-project row on stock dsh: the Projects page, opened on that project. */
function PinnedProjectPanel({ slug }: { slug: string }): ReactNode {
  useEffect(() => { select(slug) }, [slug])
  return <ProjectsPanel />
}

function ProjectsPanel(): ReactNode {
  const ctx = appCtx
  if (!ctx) return null
  const t = ctx.locale.bind('projects')
  const list = ctx.sessions.list
  const snapshot = useSyncExternalStore(
    (cb) => list.subscribe(cb),
    () => list.getSnapshot(),
  )
  const allSessions = useMemo(
    () => Object.values(snapshot.byId) as SessionRow[],
    [snapshot],
  )
  const selected = useSelection()
  const narrow = useNarrow()

  if (narrow && selected) {
    return (
      <div className="dshpx-root dshpx-split">
        <div className="dshpx-detail">
          <div className="dshpx-detail-inner">
            <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={() => select(null)}>
              <BackIcon size={14} /> {t('detail.back')}
            </button>
            <DetailPane t={t} slug={selected} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dshpx-root dshpx-split">
      <TreePane t={t} allSessions={allSessions} />
      {!narrow && (
        <div className="dshpx-detail">
          <div className="dshpx-detail-inner">
            <DetailPane t={t} slug={selected} />
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Left pane: project tree (collapsible, pin + new-chat per row)
// ---------------------------------------------------------------------------
function TreePane({ t, allSessions }: { t: T; allSessions: SessionRow[] }): ReactNode {
  const [rows, setRows] = useState<ProjectRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [creating, setCreating] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [showArchived, setShowArchived] = useState(false)
  const selected = useSelection()

  const load = useCallback(() => {
    setError(null)
    getJson('list')
      .then((d) => {
        const list: ProjectRow[] = Array.isArray(d?.projects) ? d.projects : []
        list.sort((a, b) =>
          a.starred === b.starred
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : a.starred ? -1 : 1,
        )
        setRows(list)
      })
      .catch(() => setError(t('error.generic')))
  }, [t])

  useEffect(load, [load])
  useOnChanged(load)

  const toggle = (slug: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug); else next.add(slug)
      return next
    })
  }
  const openProject = (p: ProjectRow) => {
    select(p.slug)
  }
  const openChat = (id: string) => {
    const ws = appCtx!.get('uiWorkspace') as unknown as { openSession(target: string): void }
    ws.openSession(id)
    appCtx!.layout.selectPanel(null)
  }
  const togglePin = async (p: ProjectRow) => {
    await postJson('star?slug=' + encodeURIComponent(p.slug), { starred: !p.starred })
    load()
  }

  const visible = (rows ?? []).filter(p => {
    if (!filter.trim()) return true
    const f = filter.toLowerCase()
    return p.name.toLowerCase().includes(f) || (p.description ?? '').toLowerCase().includes(f)
  })

  const active = visible.filter(p => !p.archived)
  const archived = visible.filter(p => p.archived)
  const renderRow = (p: ProjectRow) => {
            const isOpen = expanded.has(p.slug)
            const chats = sessionsFor(p, allSessions)
            const isActive = selected === p.slug
            return (
              <div key={p.slug}>
                <div
                  className={`dshpx-row${isActive ? ' dshpx-row-active' : ''}${p.starred ? ' dshpx-row-pinned' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => openProject(p)}
                  onKeyDown={(e) => { if (e.key === 'Enter') openProject(p) }}
                >
                  <LeadSlot open={isOpen} onToggle={() => toggle(p.slug)} label={isOpen ? t('tree.collapse') : t('tree.expand')} />
                  <span className="dshpx-row-name">{p.name}</span>
                  {chats.length > 0 && <span className="dshpx-count">{chats.length}</span>}
                  <span className="dshpx-row-actions">
                    <MoreButton label={t('menu.more')} onClick={(e) => openProjectMenu(e, p)} />
                    <button
                      className="dshpx-icon-btn"
                      title={t('row.newChat')}
                      disabled={!p.path}
                      onClick={(e) => { e.stopPropagation(); if (p.path) void startProjectChat(p.path) }}
                    >
                      <NewChatIcon size={13} />
                    </button>
                  </span>
                </div>
                {isOpen && (
                  <div className="dshpx-children">
                    {chats.length === 0 && <span className="dshpx-empty">{t('sessions.empty')}</span>}
                    {chats.map((r) => (
                      <div key={r.sessionId} className="dshpx-child" role="button" tabIndex={0} onClick={() => openChat(r.sessionId)} onKeyDown={(e) => { if (e.key === 'Enter') openChat(r.sessionId) }}>
                        <span className="dshpx-child-title">{sessionTitle(r, t)}</span>
                        <span className="dshpx-child-time">{relTime(r.updatedAt)}</span>
                        <span className="dshpx-child-actions"><MoreButton label={t('menu.more')} onClick={(e) => openChatMenu(e, r.sessionId, sessionTitle(r, t))} /></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
  }

  return (
    <div className="dshpx-tree">
      <div className="dshpx-tree-head">
        <span className="dshpx-tree-title">{t('tree.title')}</span>
        <button className="dshpx-icon-btn" title={t('create.title')} onClick={() => setCreating(true)}>
          <AddIcon size={14} />
        </button>
      </div>

      {creating && (
        <CreateForm
          t={t}
          onDone={(p) => { setCreating(false); openProject(p) }}
          onCancel={() => setCreating(false)}
        />
      )}

      <label className="dshpx-search">
        <SearchIcon size={13} />
        <input
          value={filter}
          placeholder={t('tree.search')}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>

      {error && <ErrorBox t={t} message={error} onRetry={load} />}
      {!error && rows === null && <p className="dshpx-muted">{t('loading')}</p>}
      {!error && rows !== null && visible.length === 0 && (
        <p className="dshpx-muted">{rows.length === 0 ? t('empty.title') : '—'}</p>
      )}

      {!error && rows !== null && (
        <div className="dshpx-list">
          {active.map(renderRow)}
          {archived.length > 0 && (
            <button type="button" className="dshpx-archived-head" aria-expanded={showArchived} onClick={() => setShowArchived(v => !v)}>
              <TriangleIcon size={10} className={showArchived ? 'dshpx-arrow-open' : undefined} />
              {t('tree.archived')} <span className="dshpx-count">{archived.length}</span>
            </button>
          )}
          {showArchived && <div className="dshpx-archived">{archived.map(renderRow)}</div>}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar group: pinned projects in the sidebar column.
// Registered into the `sidebar.projects` seat (host slot, ui-sidebar):
// sits between the panel buttons and the session list. Row click opens the
// project page; the arrow (shown on hover) expands its chats. Only pinned projects appear — pin a project to list it here.
// ---------------------------------------------------------------------------
function ProjectsSidebarGroup({ wide }: { wide: boolean }): ReactNode {
  const [rows, setRows] = useState<ProjectRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const selected = useSelection()
  const t = appCtx?.locale.bind('projects')

  const load = useCallback(() => {
    setError(null)
    getJson('list')
      .then((d) => {
        const list: ProjectRow[] = Array.isArray(d?.projects) ? d.projects : []
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setRows(list.filter(p => p.starred && !p.archived))
      })
      .catch(() => {
        if (t) setError(t('error.generic'))
        setRows([])
      })
  }, [t])

  // Mount, and again whenever the selected project changes (pin toggles
  // happen in the detail pane and must surface here without a refresh).
  useEffect(() => { load() }, [load, selected])
  useOnChanged(load)

  // Sessions snapshot for chat children — always mounted so hook order stays
  // stable across the conditional returns below.
  const list = appCtx?.sessions.list
  const snapshot = useSyncExternalStore(
    (cb) => list?.subscribe(cb) ?? (() => () => {}),
    () => list?.getSnapshot() ?? EMPTY_SESSIONS,
  )
  const allSessions = useMemo(
    () => Object.values(snapshot.byId) as SessionRow[],
    [snapshot],
  )

  if (!wide || !t || forcedFallback()) return null
  if (error) return <span style={{ padding: '2px 8px', fontSize: 12, opacity: 0.7 }} title={t('error.generic')}>⚠</span>
  if (rows === null) return null
  if (rows.length === 0) return null

  const toggle = (slug: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug); else next.add(slug)
      return next
    })
  }
  const openChat = (id: string) => {
    const ws = appCtx!.get('uiWorkspace') as unknown as { openSession(target: string): void }
    ws.openSession(id)
    appCtx!.layout.selectPanel(null)
  }
  const openProject = showProject

  return (
    <nav className="dshpx-side" aria-label={t('nav')}>
      {rows.map((p) => {
        const isOpen = expanded.has(p.slug)
        const chats = sessionsFor(p, allSessions)
        return (
          <div key={p.slug}>
            <div
              className={`dshpx-side-row${isOpen ? ' dshpx-side-row-open' : ''}`}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              title={p.name}
              onClick={() => openProject(p.slug)}
              onKeyDown={(e) => { if (e.key === 'Enter') openProject(p.slug) }}
            >
              <LeadSlot open={isOpen} onToggle={() => toggle(p.slug)} label={isOpen ? t('tree.collapse') : t('tree.expand')} />
              <span className="dshpx-side-row-name">{p.name}</span>
              <span className="dshpx-side-actions">
                <MoreButton label={t('menu.more')} onClick={(e) => openProjectMenu(e, p)} />
                <button
                  className="dshpx-icon-btn"
                  title={t('row.newChat')}
                  disabled={!p.path}
                  onClick={(e) => { e.stopPropagation(); if (p.path) void startProjectChat(p.path) }}
                >
                  <NewChatIcon size={16} />
                </button>
              </span>
            </div>
            {isOpen && (
              <div className="dshpx-side-children">
                {chats.length === 0 && (
                  <span className="dshpx-empty">{t('sessions.empty')}</span>
                )}
                {chats.map((r) => (
                  <div key={r.sessionId} className="dshpx-side-child" role="button" tabIndex={0} onClick={() => openChat(r.sessionId)} onKeyDown={(e) => { if (e.key === 'Enter') openChat(r.sessionId) }} title={sessionTitle(r, t)}>
                    <span className="dshpx-side-child-title">{sessionTitle(r, t)}</span>
                    <span className="dshpx-side-actions"><MoreButton label={t('menu.more')} onClick={(e) => openChatMenu(e, r.sessionId, sessionTitle(r, t))} /></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Create form (used by the tree head)
// ---------------------------------------------------------------------------
function CreateForm({
  t, onDone, onCancel,
}: { t: T; onDone: (p: ProjectRow) => void; onCancel: () => void }): ReactNode {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const d = await postJson('create', { name, description })
      if (d?.ok && d.project) onDone(d.project)
      else setError(t('create.error'))
    } catch {
      setError(t('create.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="dshpx-form">
      <label className="dshpx-label">
        {t('create.name')}
        <input
          className="dshpx-input" value={name} maxLength={60} autoFocus
          placeholder={t('create.name.placeholder')}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void submit() }}
        />
      </label>
      <label className="dshpx-label">
        {t('create.description')}
        <input
          className="dshpx-input" value={description}
          placeholder={t('create.description.placeholder')}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void submit() }}
        />
      </label>
      {error && <span className="dshpx-err">{error}</span>}
      <div className="dshpx-btns">
        <button className="dshpx-btn dshpx-btn-primary" disabled={busy || !name.trim()} onClick={() => void submit()}>
          {t('create.submit')}
        </button>
        <button className="dshpx-btn dshpx-btn-ghost" onClick={onCancel}>{t('create.cancel')}</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Right pane: detail of the selected project (or placeholder)
// ---------------------------------------------------------------------------
function DetailPane({ t, slug }: { t: T; slug: string | null }): ReactNode {
  if (!slug) {
    return (
      <div className="dshpx-placeholder">
        <p className="dshpx-h1">{t('tab.title')}</p>
        <p className="dshpx-muted">{t('empty.hint')}</p>
      </div>
    )
  }
  return <ProjectContent t={t} slug={slug} />
}

// ---------------------------------------------------------------------------
// Right-sidebar "Project" header button — a folder glyph in the chat header's
// utilities row, shown only when the session's cwd maps to a project. Clicking
// opens the project's info tab (memories, instructions, knowledge).
// ---------------------------------------------------------------------------
// New-chat hero: "Project ▾" chip. Picking a project opens a fresh chat whose
// cwd is the project folder (projects stay folders, not dsh workspaces).
function HeroProjectPicker(props: PropsRuntime<'conversation.hero.options'>): ReactNode {
  const t = props.t
  const { sessionId, useSessions } = props
  const cwd = useSessions(s => s.byId[sessionId]?.cwd)
  const [rows, setRows] = useState<ProjectRow[]>([])
  const load = useCallback(() => {
    getJson('list').then((r) => { setRows(r?.ok ? (r.projects ?? []) : []) }).catch(() => { setRows([]) })
  }, [])
  useEffect(load, [load])
  useOnChanged(load)
  const live = rows.filter(r => r.path && !r.archived)
  if (live.length === 0) return null
  const current = live.find(r => cwd === r.path || (cwd ?? '').startsWith(r.path + '/'))
  return (
    <button
      className="dshpx-hero-chip"
      type="button"
      data-active={current ? 'true' : undefined}
      onClick={(e) => { toggleMenu('dsh-project-picker', { projects: live, current: current?.slug }, () => true, pointOf(e)) }}
    >
      <FolderClosedIcon width={14} height={14} />
      <span>{current ? current.name : t('hero.project')}</span>
      <ChevronIcon width={12} height={12} />
    </button>
  )
}

function ProjectHeaderButton(props: PropsRuntime<'conversation.session.header.utilities'>): ReactNode {
  const t = props.t
  const { sessionId, useSessions } = props
  const cwd = useSessions(s => s.byId[sessionId]?.cwd)
  const [rows, setRows] = useState<ProjectRow[] | null>(null)

  useEffect(() => {
    let live = true
    getJson('list')
      .then((r) => { if (live) setRows(r?.ok ? (r.projects ?? []) : null) })
      .catch(() => { if (live) setRows(null) })
    return () => { live = false }
  }, [])

  const inProject = useMemo(() => {
    if (!rows || !cwd) return false
    return rows.some(r => r.path && (cwd === r.path || cwd.startsWith(r.path + '/')))
  }, [rows, cwd])

  if (!inProject) return null
  return (
    <button
      className="dshpx-header-btn"
      type="button"
      title={t('header.open')}
      onClick={() => appCtx?.sidebarRight.openTab('project')}
    >
      <FolderClosedIcon size={16} />
    </button>
  )
}

/**
 * Shared project content (head + quick memory + notes + knowledge +
 * instructions). Used by the main panel's right pane and by the right-sidebar
 * "Project" tab. `compact` trims the delete control for the narrow tab.
 */
function ProjectContent({ t, slug, compact }: { t: T; slug: string; compact?: boolean }): ReactNode {
  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [notes, setNotes] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    Promise.all([
      getJson('detail?slug=' + encodeURIComponent(slug)),
      getJson('notes?slug=' + encodeURIComponent(slug)),
    ])
      .then(([d, n]) => {
        if (d?.ok && d.project) { setDetail(d.project); setNotes(n?.notes ?? '') }
        else setError(t('error.generic'))
      })
      .catch(() => setError(t('error.generic')))
  }, [slug, t])

  useEffect(load, [load])
  const [editing, setEditing] = useState<{ name: string; description: string; goal: string } | null>(null)
  const [editErr, setEditErr] = useState(false)
  const checkEdit = useCallback(() => {
    if (editRequest === slug && detail) { editRequest = null; setEditing({ name: detail.name, description: detail.description ?? '', goal: detail.goal ?? '' }) }
  }, [slug, detail])
  useEffect(checkEdit, [checkEdit])
  useOnChanged(load)
  useOnChanged(checkEdit)
  useEffect(() => { setEditing(null) }, [slug])

  const saveEdit = async () => {
    if (!detail || !editing) return
    const d = await postJson('rename?slug=' + encodeURIComponent(detail.slug), { name: editing.name, description: editing.description, goal: editing.goal }).catch(() => null)
    if (!d?.ok) { setEditErr(true); return }
    setEditErr(false); setEditing(null); notifyChanged()
  }
  const togglePin = async () => {
    if (!detail) return
    await postJson('star?slug=' + encodeURIComponent(detail.slug), { starred: !detail.starred })
    notifyChanged()
  }
  const remove = async () => {
    if (!detail) return
    if (!confirm(t('detail.delete.confirm'))) return
    await postJson('delete?slug=' + encodeURIComponent(detail.slug))
    select(null)
    notifyChanged()
  }

  return (
    <>
      {error && <ErrorBox t={t} message={error} onRetry={load} />}
      {!error && detail === null && <p className="dshpx-muted">{t('loading')}</p>}

      {!error && detail !== null && (
        <>
          {editing ? (
            <div className="dshpx-head dshpx-edit">
              <input className="dshpx-input dshpx-edit-name" value={editing.name} maxLength={60} autoFocus aria-label={t('create.name')}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') void saveEdit(); if (e.key === 'Escape') setEditing(null) }} />
              <input className="dshpx-input" value={editing.description} placeholder={t('create.description.placeholder')} aria-label={t('create.description')}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') void saveEdit(); if (e.key === 'Escape') setEditing(null) }} />
              <label className="dshpx-label">{t('goal.title')}
                <textarea className="dshpx-textarea dshpx-goal-input" value={editing.goal} placeholder={t('goal.placeholder')} maxLength={2000}
                  onChange={(e) => setEditing({ ...editing, goal: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Escape') setEditing(null) }} />
              </label>
              <div className="dshpx-btns">
                {editErr && <span className="dshpx-err">{t('create.invalid')}</span>}
                <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={() => { setEditing(null); setEditErr(false) }}>{t('create.cancel')}</button>
                <button className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" disabled={!editing.name.trim()} onClick={() => void saveEdit()}>{t('instructions.save')}</button>
              </div>
            </div>
          ) : (
          <div className="dshpx-head">
            <div className="dshpx-head-row">
              <h1 className="dshpx-h1">{detail.name}</h1>
              <div className="dshpx-head-actions">
                {detail.archived && (
                  <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" type="button"
                    onClick={async () => { await postJson('archive?slug=' + encodeURIComponent(detail.slug), { archived: false }); notifyChanged() }}>
                    <UnarchiveIcon size={14} /> {t('menu.unarchive')}
                  </button>
                )}
                <button className="dshpx-icon-btn" type="button" title={t('menu.edit')} onClick={() => setEditing({ name: detail.name, description: detail.description ?? '', goal: detail.goal ?? '' })}>
                  <EditIcon size={16} />
                </button>
                <button className="dshpx-icon-btn" type="button" title={detail.starred ? t('detail.unstar') : t('detail.star')} onClick={() => void togglePin()}>
                  {detail.starred ? <PinFillIcon size={16} className="dshpx-pin-on" /> : <PinOutlineIcon size={16} />}
                </button>
                {!compact && (
                  <button className="dshpx-icon-btn dshpx-icon-btn-danger" type="button" title={t('detail.delete')} onClick={() => void remove()}>
                    <TrashIcon size={16} />
                  </button>
                )}
                <button className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" type="button" disabled={!detail.path} onClick={() => { if (detail.path) void startProjectChat(detail.path) }}>
                  <NewChatIcon size={14} />
                  {t('detail.newChat')}
                </button>
              </div>
            </div>
            {detail.description && <p className="dshpx-desc">{detail.description}</p>}
            {detail.path && <p className="dshpx-path">{detail.path}</p>}
            {detail.goal ? (
              <div className="dshpx-goal"><span className="dshpx-goal-label">{t('goal.title')}</span><p>{detail.goal}</p></div>
            ) : (
              <button type="button" className="dshpx-goal dshpx-goal-empty" onClick={() => setEditing({ name: detail.name, description: detail.description ?? '', goal: '' })}>
                <span className="dshpx-goal-label">{t('goal.title')}</span><p>{t('goal.empty')}</p>
              </button>
            )}
          </div>
          )}

          <div className="dshpx-grid">
            <Memory t={t} slug={detail.slug} notes={notes} onSaved={setNotes} />
            <KnowledgeFiles t={t} detail={detail} onChange={load} />
          </div>

          <InstructionsEditor t={t} detail={detail} onChange={load} />
        </>
      )}
    </>
  )
}

/**
 * Right-sidebar "Project" tab body. The tab is opened for the session whose cwd
 * maps to a project; it resolves that project from the session's cwd and renders
 * the shared content in the narrow tab column.
 */
function ProjectInfoBody(props: PropsRuntime<'sidebar.right.pane.tab'> & PropsLocale<'projects'>): ReactNode {
  const t = props.t
  const { sessionId, useSessions } = props
  const cwd = useSessions(s => s.byId[sessionId]?.cwd)
  const [rows, setRows] = useState<ProjectRow[] | null>(null)

  useEffect(() => {
    let live = true
    getJson('list')
      .then((r) => { if (live) setRows(r?.ok ? (r.projects ?? []) : null) })
      .catch(() => { if (live) setRows(null) })
    return () => { live = false }
  }, [])

  const project = useMemo(() => {
    if (!rows || !cwd) return null
    return rows.find(r => r.path && (cwd === r.path || cwd.startsWith(r.path + '/'))) ?? null
  }, [rows, cwd])

  return (
    <div className="dshpx-tabpane">
      <div className="dshpx-detail-inner">
        {rows === null && <p className="dshpx-muted">{t('loading')}</p>}
        {rows !== null && project === null && (
          <div className="dshpx-placeholder">
            <p className="dshpx-h1">{t('tab.project')}</p>
            <p className="dshpx-muted">{t('tab.project.hint')}</p>
          </div>
        )}
        {project !== null && (
          <>
            <p className="dshpx-hint">{t('tab.project.hint')}</p>
            <ProjectContent t={t} slug={project.slug} compact />
          </>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Memory card — the project memory (AGENTS.local.md, auto-loaded into every
// chat). Quick-add one line, or edit the whole list; agents update it too.
// ---------------------------------------------------------------------------
function Memory({ t, slug, notes, onSaved }: { t: T; slug: string; notes: string; onSaved: (notes: string) => void }): ReactNode {
  const [text, setText] = useState('')
  const [draft, setDraft] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const lines = notes.split('\n').filter(l => l.trim())
  const count = lines.filter(l => /^\s*[-*]\s/.test(l)).length

  const send = async (path: string, body: { text: string }) => {
    setStatus('saving')
    try {
      const d = await postJson(path + '?slug=' + encodeURIComponent(slug), body)
      if (!d?.ok) { setStatus('error'); return false }
      onSaved(d.notes ?? '')
      setStatus('idle')
      return true
    } catch { setStatus('error'); return false }
  }
  const add = async () => {
    if (text.trim() && status !== 'saving' && await send('note', { text })) setText('')
  }
  const save = async () => {
    if (draft !== null && await send('notes', { text: draft })) setDraft(null)
  }

  return (
    <section className="dshpx-card">
      <div className="dshpx-row-head">
        <h2 className="dshpx-h2">{t('memory.title')} {count > 0 && <span className="dshpx-count">{count}</span>}</h2>
        {draft === null && (
          <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={() => setDraft(notes)}>{t('memory.edit')}</button>
        )}
      </div>
      <p className="dshpx-hint">{t('memory.hint')}</p>
      {draft !== null ? (
        <>
          <textarea className="dshpx-textarea" value={draft} placeholder={t('memory.placeholder.edit')} onChange={(e) => setDraft(e.target.value)} autoFocus />
          <div className="dshpx-btns">
            {status === 'error' && <span className="dshpx-err">{t('note.error')}</span>}
            <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={() => { setDraft(null); setStatus('idle') }}>{t('create.cancel')}</button>
            <button className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" disabled={status === 'saving' || draft === notes} onClick={() => void save()}>{t('instructions.save')}</button>
          </div>
        </>
      ) : (
        <>
          <div className="dshpx-input-row">
            <input
              className="dshpx-input" value={text} placeholder={t('note.placeholder')} maxLength={2000}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') void add() }}
            />
            <button className="dshpx-btn dshpx-btn-primary" disabled={!text.trim() || status === 'saving'} onClick={() => void add()}>
              <AddIcon size={14} /> {t('note.add')}
            </button>
          </div>
          {status === 'error' && <span className="dshpx-err">{t('note.error')}</span>}
          {lines.length === 0 ? (
            <p className="dshpx-muted">{t('note.empty')}</p>
          ) : (
            <ul className="dshpx-notes">
              {lines.map((l, i) => {
                const h = /^(#{1,6})\s+(.*)$/.exec(l)
                if (h) return <li key={i} className={`dshpx-note-h dshpx-note-h${Math.min(h[1].length, 4)}`}>{h[2]}</li>
                const m = /^(.*?)\s*_\((\d{4}-\d\d-\d\d)\)_\s*$/.exec(l.replace(/^[-*]\s+/, ''))
                return <li key={i} className="dshpx-note">{m ? m[1] : l.replace(/^[-*]\s+/, '')}{m && <span className="dshpx-note-date">{m[2]}</span>}</li>
              })}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Instructions editor
// ---------------------------------------------------------------------------
function InstructionsEditor({
  t, detail, onChange,
}: { t: T; detail: ProjectDetail; onChange: () => void }): ReactNode {
  const [text, setText] = useState(detail.instructions)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  useEffect(() => {
    setText(detail.instructions)
    setStatus('idle')
  }, [detail.slug, detail.instructions])

  const save = async () => {
    setStatus('saving')
    const d = await postJson('instructions?slug=' + encodeURIComponent(detail.slug), { text })
    setStatus(d?.ok ? 'saved' : 'error')
    if (d?.ok) onChange()
  }

  return (
    <section className="dshpx-card">
      <div className="dshpx-card-head">
        <h2 className="dshpx-h2">{t('section.instructions')}</h2>
        <p className="dshpx-hint">{t('instructions.hint')}</p>
      </div>
      <textarea
        className="dshpx-textarea" value={text}
        placeholder={t('instructions.placeholder')}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="dshpx-btns">
        {status === 'saved' && text === detail.instructions && <span className="dshpx-ok">{t('instructions.saved')}</span>}
        {status === 'error' && <span className="dshpx-err">{t('instructions.error')}</span>}
        <button className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" disabled={status === 'saving' || text === detail.instructions} onClick={() => void save()}>
          {t('instructions.save')}
        </button>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Knowledge files — drag-or-pick
// ---------------------------------------------------------------------------
function KnowledgeFiles({
  t, detail, onChange,
}: { t: T; detail: ProjectDetail; onChange: () => void }): ReactNode {
  const [busy, setBusy] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const upload = async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return
    setBusy(true)
    try {
      for (const f of Array.from(files)) {
        const bytes = await f.arrayBuffer()
        await postRaw(
          'knowledge-upload?slug=' + encodeURIComponent(detail.slug) +
            '&name=' + encodeURIComponent(f.name),
          bytes,
        )
      }
    } finally {
      setBusy(false)
      onChange()
    }
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    void upload(e.dataTransfer?.files ?? null)
  }

  const remove = async (name: string) => {
    await postJson('knowledge-delete?slug=' + encodeURIComponent(detail.slug) + '&name=' + encodeURIComponent(name))
    onChange()
  }

  return (
    <section
      className={`dshpx-card${dragOver ? ' dshpx-card-drag' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <div className="dshpx-row-head">
        <h2 className="dshpx-h2">{t('section.knowledge')} {detail.knowledge.length > 0 && <span className="dshpx-count">{detail.knowledge.length}</span>}</h2>
        <label className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" style={{ cursor: 'pointer' }}>
          <AddIcon size={13} /> {busy ? t('loading') : t('knowledge.upload')}
          <input
            type="file" multiple style={{ display: 'none' }}
            disabled={busy}
            onChange={(e) => { void upload(e.target.files); e.target.value = '' }}
          />
        </label>
      </div>
      <p className="dshpx-hint">{t('knowledge.hint')}</p>
      {detail.knowledge.length === 0 ? (
        <label className="dshpx-drop">
          <DocIcon size={20} />
          {t('knowledge.drop')}
          <input type="file" multiple style={{ display: 'none' }} disabled={busy} onChange={(e) => { void upload(e.target.files); e.target.value = '' }} />
        </label>
      ) : (
        <ul className="dshpx-files">
          {detail.knowledge.map((f) => (
            <li key={f.name} className="dshpx-file">
              <DocIcon size={15} />
              <span className="dshpx-file-name" title={f.name}>{f.name}</span>
              <span className="dshpx-file-size">{formatBytes(f.size)}</span>
              <button className="dshpx-icon-btn dshpx-icon-btn-danger" title={t('knowledge.delete')} onClick={() => void remove(f.name)}>
                <TrashIcon size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function formatBytes(n: number): string {
  if (n < 1024) return n + ' B'
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB'
  return (n / 1024 / 1024).toFixed(1) + ' MB'
}

// ---------------------------------------------------------------------------
// Small shared bits
// ---------------------------------------------------------------------------
function ErrorBox({ t, message, onRetry }: { t: T; message: string; onRetry: () => void }): ReactNode {
  return (
    <div className="dshpx-notice">
      <span>{message || t('error.generic')}</span>
      <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={onRetry}>{t('retry')}</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------
export function apply(ctx: ClientContext): void {
  appCtx = ctx
  ensureStyles()
  const t = ctx.locale.bind('projects')

  ctx.effect(() => {
    ctx.locale.register('projects', { en, zh })
  }, 'deep-projects: locales')

  // "…" menu for project rows, through dsh's shared context-menu service
  // (same popup as workspace/chat menus). Chat rows reuse dsh's 'session' menu.
  ctx.slots.inject('contextMenu.icon', function* () {
    for (const [key, Icon] of Object.entries({
      'deep-projects.open': OpenIcon, 'deep-projects.newChat': NewChatIcon, 'deep-projects.edit': EditIcon,
      'deep-projects.pin': PinOutlineIcon, 'deep-projects.unpin': PinFillIcon, 'deep-projects.delete': TrashIcon,
      'deep-projects.archive': ArchiveIcon, 'deep-projects.unarchive': UnarchiveIcon,
    })) yield ctx.slots.register({ name: 'contextMenu.icon', key } as any, Icon as any)
  } as any)
  ctx.effect(() => (ctx as any).contextMenus.register({
    id: 'deep-projects.actions', target: 'dsh-project', order: 100,
    resolve: (p: { slug: string; name: string; path?: string; starred: boolean; archived: boolean }) => [
      { id: 'open', label: t('menu.open'), icon: { key: 'deep-projects.open' }, run: () => showProject(p.slug) },
      { id: 'newChat', label: t('detail.newChat'), icon: { key: 'deep-projects.newChat' }, disabled: !p.path,
        run: () => { if (p.path) void startProjectChat(p.path) } },
      { id: 'edit', label: t('menu.edit'), icon: { key: 'deep-projects.edit' }, separatorBefore: true,
        run: () => { editRequest = p.slug; showProject(p.slug); notifyChanged() } },
      ...(p.archived ? [] : [{ id: 'pin', label: p.starred ? t('row.unpin') : t('row.pin'), icon: { key: p.starred ? 'deep-projects.unpin' : 'deep-projects.pin' },
        run: async () => { await postJson('star?slug=' + encodeURIComponent(p.slug), { starred: !p.starred }); notifyChanged() } }]),
      { id: 'archive', label: p.archived ? t('menu.unarchive') : t('menu.archive'), icon: { key: p.archived ? 'deep-projects.unarchive' : 'deep-projects.archive' },
        run: async () => { await postJson('archive?slug=' + encodeURIComponent(p.slug), { archived: !p.archived }); notifyChanged() } },
      { id: 'delete', label: t('detail.delete'), icon: { key: 'deep-projects.delete' }, danger: true, separatorBefore: true,
        run: async () => {
          if (!confirm(t('detail.delete.confirm'))) return
          await postJson('delete?slug=' + encodeURIComponent(p.slug))
          if (selectedSlug === p.slug) select(null)
          notifyChanged()
        } },
    ],
  }), 'deep-projects: project menu')

  ctx.effect(() => (ctx as any).contextMenus.register({
    id: 'deep-projects.picker', target: 'dsh-project-picker', order: 100,
    resolve: (v: { projects: ProjectRow[]; current?: string }) => [...v.projects]
      .sort((a, b) => Number(!!b.starred) - Number(!!a.starred))
      .map(p => ({
        id: p.slug, label: p.name, icon: { key: p.slug === v.current ? 'deep-projects.open' : 'deep-projects.newChat' },
        disabled: p.slug === v.current,
        run: () => { if (p.path) void startProjectChat(p.path) },
      })),
  }), 'deep-projects: hero picker menu')

  ctx.effect(() => {
    ctx.slots.inject('conversation.hero.options', () =>
      ctx.slots.register({ name: 'conversation.hero.options', id: 'deep-projects.picker', locale: 'projects' } as any, HeroProjectPicker as any),
    )
  }, 'deep-projects: hero picker')

  // Pinnable sidebar launcher — the shell's built-in pin system
  // (sidebar.panellist.actions / "More" menu) shows/hides this row.
  ctx.effect(() => {
    ctx.slots.inject('sidebar.panellist', () =>
      ctx.slots.register(
        { name: 'sidebar.panellist', id: PANEL_ID, order: 20, label: () => t('nav'), locale: 'projects' },
        ProjectsPanelIcon,
      ),
    )
  }, 'deep-projects: sidebar')

  // Pinned projects rendered as a collapsible group directly in the sidebar
  // column — between the panel buttons and the session list — via the
  // ui-sidebar `sidebar.projects` seat.
  ctx.effect(() => {
    ctx.slots.inject('sidebar.projects', () =>
      ctx.slots.register({ name: 'sidebar.projects', locale: 'projects' }, ProjectsSidebarGroup),
    )
  }, 'deep-projects: sidebar projects')

  // Stock dsh has no `sidebar.projects` seat (it comes from a small proposed
  // ui-sidebar patch). There, each pinned project becomes a plain panel row
  // under "Projects" that opens its project page. Same pins, no chat tree.
  ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => {
    if (!useFallbackRows(ctx)) return () => {}
    let disposers: Array<() => void> = []
    let live = true
    const clear = () => { for (const off of disposers) off(); disposers = [] }
    const sync = () => {
      getJson('list').then((d) => {
        if (!live) return
        clear()
        const pinned: ProjectRow[] = (Array.isArray(d?.projects) ? d.projects : []).filter((p: ProjectRow) => p.starred && !p.archived)
        pinned.forEach((p, i) => {
          const id = (PANEL_ID + ':' + p.slug) as MainPanelId
          const Panel = () => <PinnedProjectPanel slug={p.slug} />
          disposers.push(ctx.slots.register({ name: 'main', key: id, locale: 'projects' } as any, Panel as any))
          disposers.push(ctx.slots.register({ name: 'sidebar.panellist', id, order: 21 + i, label: () => p.name, locale: 'projects' } as any, ProjectsPanelIcon as any))
        })
      }).catch(() => {})
    }
    sync()
    changeListeners.add(sync)
    return () => { live = false; changeListeners.delete(sync); clear() }
  }), 'deep-projects: sidebar rows (stock dsh)')

  // Right-sidebar "Project" tab: a page type opened from the chat header. The
  // body resolves the project from the session's cwd and renders the shared
  // content (memories, instructions, knowledge) in the narrow tab column.
  ctx.effect(() => {
    ctx.sidebarRightTabs.register({
      id: TAB_ID, kind: 'project', multiple: true, priority: 'extension',
      title: () => t('tab.project'),
    })
  }, 'deep-projects: sidebar tab type')

  ctx.effect(() => {
    ctx.slots.inject('sidebar.right.pane.tab', () =>
      ctx.slots.register({ name: 'sidebar.right.pane.tab', key: TAB_ID, locale: 'projects' }, ProjectInfoBody),
    )
  }, 'deep-projects: sidebar tab body')

  ctx.effect(() => {
    ctx.slots.inject('sidebar.right.pane.tab.title', () =>
      ctx.slots.register({ name: 'sidebar.right.pane.tab.title', key: TAB_ID, locale: 'projects' }, () => t('tab.project')),
    )
  }, 'deep-projects: sidebar tab title')

  // Header utility: a folder glyph shown only when the session's cwd maps to a
  // project; clicking it opens the project's info tab in the right sidebar.
  ctx.effect(() => {
    ctx.slots.inject('conversation.session.header.utilities', () =>
      ctx.slots.register({ name: 'conversation.session.header.utilities', id: TAB_ID, order: 50, locale: 'projects' }, ProjectHeaderButton),
    )
  }, 'deep-projects: header button')

  ctx.effect(() => {
    ctx.slots.inject('main', () =>
      ctx.slots.register({ name: 'main', key: PANEL_ID, locale: 'projects' }, ProjectsPanel),
    )
  }, 'deep-projects: main')
}
