// deep-projects client: Claude-Desktop-style Projects.
//
// Main panel = Claude-Desktop-style pages:
//   grid    — 2-column tiles (Your projects / Archived), search, sort, New project.
//   project — breadcrumb, composer that starts a chat right away, Recent chats,
//             side rows (goal, instructions, knowledge, memory) opening modals.
//
// Sidebar: a pinnable "Projects" launcher (the shell's built-in panel pin
// system controls show/unpin) + a pinned-projects group in the sidebar column.
//
// Styling: one scoped <style> block (classes prefixed `dshpx-`) using the host
// design tokens (--dsw-alias-*), so hover/focus states and media queries work.
// No assets ship with the bundle.

import { useEffect, useMemo, useState, useSyncExternalStore, useCallback } from 'react'
import type { ReactNode, CSSProperties, DragEvent } from 'react'
import { createRoot } from 'react-dom/client'
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
  IconChevronsUpDownOutlineRegular as SortIcon,
  IconSendOutlineRegular as SendIcon,
  IconListPenOutlineRegular as InstructionsIcon,
  IconPaperclipOutlineRegular as PaperclipIcon,
  IconThinkOutlineRegular as MemoryIcon,
  IconPlusOutlineRegular as AddIcon,
  IconSearchOutlineRegular as SearchIcon,
  IconPinFillRegular as PinFillIcon,
  IconPinOutlineRegular as PinOutlineIcon,
  IconNewChatOutlineRegular as NewChatIcon,
  IconTrashOutlineRegular as TrashIcon,
  IconDeliverDocRegular as DocIcon,
  IconChevronDownOutlineRegular as ChevronIcon,
  IconGoalOutlineRegular as ProjectIcon,
  Menu,
  Modal,
  Button,
  type MenuEntry,
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
.dshpx-recent-row { display: flex; align-items: center; gap: 12px; padding: 14px 4px; border-bottom: 1px solid var(--dshpx-line); cursor: pointer; font-size: 14px; }
.dshpx-recent-row:hover { background: var(--dshpx-hover); }
.dshpx-recent-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-primary); }
.dshpx-recent-date { flex: none; font-size: 13px; color: var(--dsw-alias-label-caption); }
.dshpx-recent-more { flex: none; display: none; }
.dshpx-recent-row:hover .dshpx-recent-more, .dshpx-recent-row:focus-within .dshpx-recent-more { display: inline-flex; }
.dshpx-recent-row:hover .dshpx-recent-date, .dshpx-recent-row:focus-within .dshpx-recent-date { display: none; }
.dshpx-proj-side { display: flex; flex-direction: column; padding-top: 64px; }
.dshpx-side-item { display: flex; align-items: center; gap: 12px; padding: 14px 4px; border: none; border-bottom: 1px solid var(--dshpx-line); background: transparent; cursor: pointer; text-align: left; font-size: 14px; color: var(--dsw-alias-label-primary); }
.dshpx-side-item:hover { background: var(--dshpx-hover); }
.dshpx-side-item-icon { flex: none; display: inline-flex; color: var(--dsw-alias-label-secondary); }
.dshpx-side-item-label { flex: none; }
.dshpx-side-item-meta { flex: 1; font-size: 12px; color: var(--dsw-alias-label-caption); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dshpx-side-item-action { margin-left: auto; flex: none; font-size: 13.5px; color: var(--dsw-alias-label-secondary); }
.dshpx-side-goal { margin: 14px 4px 0; font-size: 13px; line-height: 1.5; color: var(--dsw-alias-label-secondary); white-space: pre-wrap; }
.dshpx-proj-side .dshpx-path { margin: 10px 4px 0; }
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
  projectionValues?: { workingDirectory?: string | null } | null
}

/** A chat's current folder: dsh's working directory once moved, else where it started. */
function cwdOf(row: SessionRow | undefined): string | undefined {
  return row?.projectionValues?.workingDirectory ?? row?.cwd
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
    .filter(r => (cwdOf(r) ?? '') === p || (cwdOf(r) ?? '').startsWith(p + '/'))
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
let moveTargets: ProjectRow[] = []

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
// dsh has no plugin seat between the panel rows and the workspace list, so the
// plugin mounts its own React root right above dsh's workspace region.
// ponytail: keyed to dsh's CSS-module class names (regionArea, collapsed). If a
// dsh update renames them, the seat never mounts and pinned projects fall back
// to plain panel rows.
let seatMounted = false
function mountSidebarSeat(): () => void {
  const host = document.createElement('div')
  host.className = 'dshpx-seat'
  const root = createRoot(host)
  root.render(<ProjectsSidebarGroup />)
  const place = (): void => {
    const region = document.querySelector('[class$="_regionArea"], [class*="_regionArea "]')
    if (!region || host.nextElementSibling === region) return
    region.before(host)
    if (!seatMounted) { seatMounted = true; notifyChanged() }
  }
  place()
  const mo = new MutationObserver(place)
  mo.observe(document.body, { childList: true, subtree: true })
  return () => { mo.disconnect(); root.unmount(); host.remove(); seatMounted = false }
}

/** Main panel behind a fallback pinned-project row: the Projects page, opened on that project. */
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
  return (
    <div className="dshpx-root dshpx-page">
      {selected
        ? <ProjectPage t={t} slug={selected} allSessions={allSessions} />
        : <ProjectsGrid t={t} allSessions={allSessions} />}
    </div>
  )
}

/** "vor 6 Tagen" under a week, else "14. Nov." (year added when not this year). */
function shortDate(ts: number): string {
  const days = Math.floor((Date.now() - ts) / 86_400_000)
  if (days < 7) return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(-days, 'day')
  const d = new Date(ts)
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' })
}
/** Last activity: newest chat in the project, else creation time. */
function lastActive(p: ProjectRow, all: SessionRow[]): number {
  return Math.max(new Date(p.createdAt).getTime() || 0, ...sessionsFor(p, all).map(r => r.updatedAt))
}
function openChat(id: string): void {
  const ws = appCtx!.get('uiWorkspace') as unknown as { openSession(target: string): void }
  ws.openSession(id)
  appCtx!.layout.selectPanel(null)
}

// ---------------------------------------------------------------------------
// Projects page: header (tabs, search, sort, new) + 2-column tile grid
// ---------------------------------------------------------------------------
function ProjectsGrid({ t, allSessions }: { t: T; allSessions: SessionRow[] }): ReactNode {
  const [rows, setRows] = useState<ProjectRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [archived, setArchived] = useState(false)
  const [byName, setByName] = useState(false)

  const load = useCallback(() => {
    setError(null)
    getJson('list')
      .then((d) => { setRows(Array.isArray(d?.projects) ? d.projects : []) })
      .catch(() => setError(t('error.generic')))
  }, [t])
  useEffect(load, [load])
  useOnChanged(load)

  const f = (filter ?? '').trim().toLowerCase()
  const visible = (rows ?? [])
    .filter(p => !!p.archived === archived)
    .filter(p => !f || p.name.toLowerCase().includes(f) || (p.description ?? '').toLowerCase().includes(f))
    .map(p => ({ p, at: lastActive(p, allSessions) }))
    .sort((a, b) => byName ? a.p.name.localeCompare(b.p.name) : b.at - a.at)

  return (
    <div className="dshpx-page-inner">
      <h1 className="dshpx-page-title">{t('tree.title')}</h1>
      <div className="dshpx-toolbar">
        <div className="dshpx-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={!archived} className="dshpx-tab" onClick={() => setArchived(false)}>{t('grid.yours')}</button>
          <button type="button" role="tab" aria-selected={archived} className="dshpx-tab" onClick={() => setArchived(true)}>{t('tree.archived')}</button>
        </div>
        <div className="dshpx-toolbar-end">
          {filter !== null && (
            <label className="dshpx-search">
              <SearchIcon size={13} />
              <input autoFocus value={filter} placeholder={t('tree.search')} onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setFilter(null) }} />
            </label>
          )}
          <button type="button" className="dshpx-icon-btn" title={t('tree.search')} aria-pressed={filter !== null} onClick={() => setFilter(filter === null ? '' : null)}>
            <SearchIcon size={16} />
          </button>
          <button type="button" className="dshpx-icon-btn" title={byName ? t('grid.sort.name') : t('grid.sort.recent')} onClick={() => setByName(v => !v)}>
            <SortIcon size={16} />
          </button>
          <button type="button" className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" onClick={() => setCreating(true)}>{t('create.title')}</button>
        </div>
      </div>

      {creating && (
        <CreateForm t={t} onDone={(p) => { setCreating(false); notifyChanged(); select(p.slug) }} onCancel={() => setCreating(false)} />
      )}
      {error && <ErrorBox t={t} message={error} onRetry={load} />}
      {!error && rows === null && <p className="dshpx-muted">{t('loading')}</p>}
      {!error && rows !== null && visible.length === 0 && (
        <p className="dshpx-muted">{rows.length === 0 ? t('empty.hint') : '—'}</p>
      )}

      <div className="dshpx-tiles">
        {visible.map(({ p, at }) => (
          <div key={p.slug} className="dshpx-tile" role="button" tabIndex={0}
            onClick={() => select(p.slug)} onKeyDown={(e) => { if (e.key === 'Enter') select(p.slug) }}>
            <span className="dshpx-tile-icon"><ProjectIcon size={18} /></span>
            <span className="dshpx-tile-text">
              <span className="dshpx-tile-name">{p.name}</span>
              <span className="dshpx-tile-date">{shortDate(at)}</span>
            </span>
            {p.starred && <PinFillIcon size={16} className="dshpx-tile-pin" />}
            <span className="dshpx-tile-more"><MoreButton label={t('menu.more')} onClick={(e) => openProjectMenu(e, p)} /></span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** New chat in the project folder, opened, with the first message queued. */
async function sendProjectChat(cwd: string, text: string): Promise<boolean> {
  const sessions = appCtx!.get('sessions') as any
  const id: string = await sessions.create({ cwd })
  openChat(id)
  const r = await sessions.using(id, { source: 'controllerOperation' }, async (ref: any) => {
    const b = await ref.ready
    return b.session.prompt([{ type: 'text', text }], 'queue')
  }).catch(() => null)
  return !!r?.ok
}

// ---------------------------------------------------------------------------
// Project page: breadcrumb, title, composer, recent chats | side rows
// ---------------------------------------------------------------------------
type SideModal = 'instructions' | 'knowledge' | 'memory' | 'edit' | null
function ProjectPage({ t, slug, allSessions }: { t: T; slug: string; allSessions: SessionRow[] }): ReactNode {
  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState<SideModal>(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sendErr, setSendErr] = useState(false)

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
  useOnChanged(load)
  // "Edit" from the project "…" menu lands here.
  const checkEdit = useCallback(() => { if (editRequest === slug) { editRequest = null; setModal('edit') } }, [slug])
  useEffect(checkEdit, [checkEdit])
  useOnChanged(checkEdit)

  const send = async () => {
    const body = text.trim()
    if (!body || !detail?.path || sending) return
    setSending(true); setSendErr(false)
    const ok = await sendProjectChat(detail.path, body).catch(() => false)
    setSending(false)
    if (ok) setText(''); else setSendErr(true)
  }
  const togglePin = async () => {
    if (!detail) return
    await postJson('star?slug=' + encodeURIComponent(detail.slug), { starred: !detail.starred })
    notifyChanged()
  }

  const chats = detail ? sessionsFor(detail, allSessions) : []
  const memCount = notes.split('\n').filter(l => /^\s*[-*]\s+\S/.test(l)).length

  return (
    <>
      <div className="dshpx-crumbs">
        <button type="button" className="dshpx-crumb" onClick={() => select(null)}>{t('tree.title')}</button>
        <span className="dshpx-crumb-sep">/</span>
        {detail && (
          <button type="button" className="dshpx-crumb dshpx-crumb-cur" aria-haspopup="menu" onClick={(e) => openProjectMenu(e, detail)}>
            {detail.name} <ChevronIcon size={14} />
          </button>
        )}
        <span className="dshpx-crumbs-end">
          {detail && !detail.archived && (
            <button type="button" className="dshpx-icon-btn" title={detail.starred ? t('detail.unstar') : t('detail.star')} onClick={() => void togglePin()}>
              {detail.starred ? <PinFillIcon size={16} className="dshpx-pin-on" /> : <PinOutlineIcon size={16} />}
            </button>
          )}
        </span>
      </div>

      <div className="dshpx-page-inner">
        {error && <ErrorBox t={t} message={error} onRetry={load} />}
        {!error && detail === null && <p className="dshpx-muted">{t('loading')}</p>}
        {!error && detail !== null && (
          <div className="dshpx-proj">
            <div className="dshpx-proj-main">
              <h1 className="dshpx-page-title">{detail.name}</h1>
              {detail.description && <p className="dshpx-desc">{detail.description}</p>}
              {detail.archived && (
                <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" type="button" style={{ alignSelf: 'flex-start' }}
                  onClick={async () => { await postJson('archive?slug=' + encodeURIComponent(detail.slug), { archived: false }); notifyChanged() }}>
                  <UnarchiveIcon size={14} /> {t('menu.unarchive')}
                </button>
              )}
              <div className="dshpx-composer">
                <textarea
                  value={text} rows={2} disabled={sending || !detail.path} autoFocus
                  placeholder={t('page.composer').replace('{name}', detail.name)}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send() } }}
                />
                <div className="dshpx-composer-foot">
                  {sendErr && <span className="dshpx-err">{t('page.sendFailed')}</span>}
                  <button type="button" className="dshpx-send" title={t('page.send')} aria-label={t('page.send')} disabled={!text.trim() || sending} onClick={() => void send()}>
                    <SendIcon size={16} />
                  </button>
                </div>
              </div>

              <h2 className="dshpx-recent-h">{t('page.recent')}</h2>
              {chats.length === 0 && <p className="dshpx-muted">{t('page.noChats')}</p>}
              <div className="dshpx-recent">
                {chats.map(r => (
                  <div key={r.sessionId} className="dshpx-recent-row" role="button" tabIndex={0}
                    onClick={() => openChat(r.sessionId)} onKeyDown={(e) => { if (e.key === 'Enter') openChat(r.sessionId) }}>
                    <span className="dshpx-recent-title">{sessionTitle(r, t)}</span>
                    <span className="dshpx-recent-date">{shortDate(r.updatedAt)}</span>
                    <span className="dshpx-recent-more"><MoreButton label={t('menu.more')} onClick={(e) => openChatMenu(e, r.sessionId, sessionTitle(r, t))} /></span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="dshpx-proj-side">
              <SideRow icon={<ProjectIcon size={16} />} label={t('goal.title')} meta={detail.goal ? '' : t('page.notSet')} action={t('memory.edit')} onClick={() => setModal('edit')} />
              <SideRow icon={<InstructionsIcon size={16} />} label={t('page.instructions')} action={t('memory.edit')} onClick={() => setModal('instructions')} />
              <SideRow icon={<PaperclipIcon size={16} />} label={t('page.knowledge')} meta={t('page.files').replace('{n}', String(detail.knowledge.length))} action={t('note.add')} onClick={() => setModal('knowledge')} />
              <SideRow icon={<MemoryIcon size={16} />} label={t('memory.title')} meta={memCount ? String(memCount) : ''} action={t('page.view')} onClick={() => setModal('memory')} />
              {detail.goal && <p className="dshpx-side-goal">{detail.goal}</p>}
              {detail.path && <p className="dshpx-path">{detail.path}</p>}
            </aside>
          </div>
        )}
      </div>

      {detail && modal && (
        <Modal open onClose={() => setModal(null)} closeLabel={t('delete.close')} className="dshpx-modal" contentClassName="dshpx-root"
          title={modal === 'edit' ? t('menu.edit') : modal === 'instructions' ? t('section.instructions') : modal === 'knowledge' ? t('section.knowledge') : t('memory.title')}>
          {modal === 'edit' && <EditProject t={t} detail={detail} onDone={() => setModal(null)} />}
          {modal === 'instructions' && <InstructionsEditor t={t} detail={detail} onChange={load} />}
          {modal === 'knowledge' && <KnowledgeFiles t={t} detail={detail} onChange={load} />}
          {modal === 'memory' && <Memory t={t} slug={detail.slug} notes={notes} onSaved={setNotes} />}
        </Modal>
      )}
    </>
  )
}

function SideRow({ icon, label, meta, action, onClick }: { icon: ReactNode; label: string; meta?: string; action: string; onClick: () => void }): ReactNode {
  return (
    <button type="button" className="dshpx-side-item" onClick={onClick}>
      <span className="dshpx-side-item-icon">{icon}</span>
      <span className="dshpx-side-item-label">{label}</span>
      {meta && <span className="dshpx-side-item-meta">{meta}</span>}
      <span className="dshpx-side-item-action">{action}</span>
    </button>
  )
}

function EditProject({ t, detail, onDone }: { t: T; detail: ProjectDetail; onDone: () => void }): ReactNode {
  const [v, setV] = useState({ name: detail.name, description: detail.description ?? '', goal: detail.goal ?? '' })
  const [err, setErr] = useState(false)
  const save = async () => {
    const d = await postJson('rename?slug=' + encodeURIComponent(detail.slug), v).catch(() => null)
    if (!d?.ok) { setErr(true); return }
    notifyChanged(); onDone()
  }
  return (
    <div className="dshpx-head dshpx-edit">
      <label className="dshpx-label">{t('create.name')}
        <input className="dshpx-input" value={v.name} maxLength={60} autoFocus onChange={(e) => setV({ ...v, name: e.target.value })} />
      </label>
      <label className="dshpx-label">{t('create.description')}
        <input className="dshpx-input" value={v.description} placeholder={t('create.description.placeholder')} onChange={(e) => setV({ ...v, description: e.target.value })} />
      </label>
      <label className="dshpx-label">{t('goal.title')}
        <textarea className="dshpx-textarea dshpx-goal-input" value={v.goal} placeholder={t('goal.placeholder')} maxLength={2000} onChange={(e) => setV({ ...v, goal: e.target.value })} />
      </label>
      <div className="dshpx-btns">
        {err && <span className="dshpx-err">{t('create.invalid')}</span>}
        <button className="dshpx-btn dshpx-btn-ghost dshpx-btn-sm" onClick={onDone}>{t('create.cancel')}</button>
        <button className="dshpx-btn dshpx-btn-primary dshpx-btn-sm" disabled={!v.name.trim()} onClick={() => void save()}>{t('instructions.save')}</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar group: pinned projects in the sidebar column.
// Mounted by mountSidebarSeat right above dsh's workspace list:
// sits between the panel buttons and the session list. Row click opens the
// project page; the arrow (shown on hover) expands its chats. Only pinned projects appear — pin a project to list it here.
// ---------------------------------------------------------------------------
function ProjectsSidebarGroup(): ReactNode {
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

  if (!t) return null
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
// Right-sidebar "Project" header button — a folder glyph in the chat header's
// utilities row, shown only when the session's cwd maps to a project. Clicking
// opens the project's info tab (memories, instructions, knowledge).
// ---------------------------------------------------------------------------
// New-chat hero: one picker for dsh workspaces and projects, in dsh's own UI.
// - dsh's workspace chip is hidden (CSS); HeroPickerChip takes its place.
// - The menu lives inside dsh's `conversation.hero.workspace` slot (its
//   component is wrapped), so workspace picks keep dsh's own flow: draft
//   carry-over and the "Add workspace…" folder dialog.
// - dsh greys out its input for a chat outside any workspace, which is every
//   project chat; the wrapped `conversation.composer.bar` lifts that lock.
// ponytail: wrapping swaps the component on dsh's registered slot entry. If a
// dsh update changes that, project chats show dsh's greyed-out input again.
// ---------------------------------------------------------------------------
const heroMenu = { open: false, anchor: null as HTMLElement | null, selected: undefined as string | undefined, subs: new Set<() => void>() }
function setHeroMenu(open: boolean, anchor?: HTMLElement | null, selected?: string): void {
  heroMenu.open = open
  if (anchor !== undefined) heroMenu.anchor = anchor
  if (selected !== undefined || open) heroMenu.selected = selected
  for (const fn of heroMenu.subs) fn()
}
function useHeroMenuOpen(): boolean {
  return useSyncExternalStore((cb) => { heroMenu.subs.add(cb); return () => { heroMenu.subs.delete(cb) } }, () => heroMenu.open)
}

/** Live, unarchived projects that have a folder. */
function useLiveProjects(): ProjectRow[] {
  const [rows, setRows] = useState<ProjectRow[]>([])
  const load = useCallback(() => {
    getJson('list').then((r) => { setRows(r?.ok ? (r.projects ?? []) : []) }).catch(() => { setRows([]) })
  }, [])
  useEffect(load, [load])
  useOnChanged(load)
  return useMemo(() => rows.filter(r => r.path && !r.archived)
    .sort((a, b) => Number(!!b.starred) - Number(!!a.starred) || a.name.localeCompare(b.name)), [rows])
}

function projectOf(projects: readonly ProjectRow[], cwd: string | undefined): ProjectRow | undefined {
  return cwd ? projects.find(p => p.path && (cwd === p.path || cwd.startsWith(p.path + '/'))) : undefined
}

type WorkspaceItem = { workspaceId: string; title: string; sessionIds: readonly string[] }
function workspaceList(): { phase: string; items: WorkspaceItem[] } | undefined {
  return (appCtx?.get('workspaces') as any)?.list.getSnapshot()
}

/** Chip in place of dsh's workspace chip: the chat's project or workspace. */
function HeroPickerChip(props: PropsRuntime<'conversation.hero.options'>): ReactNode {
  const { sessionId, useSessions } = props
  const cwd = useSessions(s => cwdOf(s.byId[sessionId] as SessionRow | undefined))
  const projects = useLiveProjects()
  const open = useHeroMenuOpen()
  const wsList = (appCtx?.get('workspaces') as any)?.list
  const ws = useSyncExternalStore((cb) => wsList?.subscribe(cb) ?? (() => {}), () => wsList?.getSnapshot())
  const tc = appCtx!.locale.bind('conversation') as (k: string) => string
  const project = projectOf(projects, cwd)
  const workspace = project ? undefined : (ws?.items as WorkspaceItem[] | undefined)?.find(w => w.sessionIds.includes(sessionId))
  const label = project?.name
    ?? (workspace ? workspaceTitle(workspace.title, tc('workspace.defaultName')) : tc('hero.chooseWorkspace'))
  return (
    <button
      className="dshpx-hero-chip"
      type="button"
      aria-label={tc('hero.chooseWorkspace')}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(e) => { setHeroMenu(!open, e.currentTarget, project ? 'p:' + project.slug : workspace?.workspaceId) }}
    >
      {project ? <ProjectIcon size={16} /> : workspace ? <FolderOpenIcon size={16} /> : <FolderClosedIcon size={16} />}
      <span>{label}</span>
      <ChevronIcon size={12} className="dshpx-hero-chevron" />
    </button>
  )
}

function workspaceTitle(title: string, localizedDefault: string): string {
  return title === 'default-workspace' ? localizedDefault : title
}

/** Wraps dsh's workspace picker: one menu with projects and workspaces. */
function wrapWorkspacePicker(Stock: (p: any) => ReactNode): (p: any) => ReactNode {
  const empty = new WeakMap<object, object>()
  return function DeepProjectsPicker(props: any): ReactNode {
    const ours = useHeroMenuOpen()
    const [adding, setAdding] = useState(false)
    const projects = useLiveProjects()
    const workspaces = props.useWorkspaces((s: { items: WorkspaceItem[] }) => s.items) as WorkspaceItem[]
    const t = appCtx!.locale.bind('projects')
    const close = (): void => { setHeroMenu(false); props.onClose() }
    const items: MenuEntry[] = [
      ...(projects.length === 0 ? [] : [
        { type: 'label', id: 'label:projects', text: t('nav') } as const,
        ...projects.map(p => ({ id: 'p:' + p.slug, label: p.name, icon: <ProjectIcon size={16} /> })),
      ]),
      ...(workspaces.length === 0 ? [] : [
        { type: 'label', id: 'label:workspaces', text: t('hero.workspaces') } as const,
        ...workspaces.map(w => ({ id: w.workspaceId, label: workspaceTitle(w.title, props.t('workspace.defaultName')), icon: <FolderClosedIcon size={16} /> })),
      ]),
    ]
    const onSelect = (id: string): void => {
      close()
      if (id === '::add') setAdding(true)
      else if (id.startsWith('p:')) { const p = projects.find(x => 'p:' + x.slug === id); if (p?.path) void startProjectChat(p.path) }
      else props.onPick(id)
    }
    // dsh's own picker, fed an empty list, runs only its "Add workspace" flow:
    // with nothing to list it opens the folder dialog straight away.
    const emptyWorkspaces = useCallback(<S,>(sel: (s: any) => S): S => props.useWorkspaces((s: object) => {
      let e = empty.get(s)
      if (!e) { e = { ...s, items: [], phase: 'ready' }; empty.set(s, e) }
      return sel(e)
    }), [props.useWorkspaces])
    return (
      <>
        <Menu
          open={(props.open || ours) && !adding}
          anchor={null}
          items={items}
          footer={[{ id: '::add', label: props.t('menu.addWorkspace'), icon: <AddIcon size={16} /> }]}
          selectedId={ours ? heroMenu.selected : props.selectedId}
          onSelect={onSelect}
          onClose={close}
          side="bottom"
          portal
          getAnchorRect={() => ((ours ? heroMenu.anchor : props.anchorRef?.current) as HTMLElement | null)?.getBoundingClientRect() ?? null}
        />
        <Stock {...props} open={adding} onClose={() => { setAdding(false) }} useWorkspaces={emptyWorkspaces} />
      </>
    )
  }
}

/** dsh-style delete confirmation (same Modal + red primary button as dsh's
 *  plugin-uninstall dialog), in its own short-lived React root. */
function confirmDelete(name: string): Promise<boolean> {
  const t = appCtx!.locale.bind('projects')
  const host = document.body.appendChild(document.createElement('div'))
  const root = createRoot(host)
  return new Promise((resolve) => {
    const done = (ok: boolean): void => { root.unmount(); host.remove(); resolve(ok) }
    root.render(
      <Modal
        open
        onClose={() => { done(false) }}
        title={t('delete.title').replace('{name}', name)}
        closeLabel={t('delete.close')}
        description={t('detail.delete.confirm')}
        footer={(
          <>
            <Button variant="outline" onClick={() => { done(false) }}>{t('create.cancel')}</Button>
            <Button variant="primary" className="dshpx-danger-btn" autoFocus onClick={() => { done(true) }}>{t('detail.delete')}</Button>
          </>
        )}
      />,
    )
  })
}

/** Wraps dsh's input bar: a blank project chat gets the normal, usable input. */
function wrapComposerBar(Stock: (p: any) => ReactNode): (p: any) => ReactNode {
  return function DeepProjectsComposerBar(props: any): ReactNode {
    const sid = props.sessionId as string | undefined
    if (props.disabled !== true || props.variant !== 'hero' || !sid || !appCtx) return <Stock {...props} />
    const cwd = (appCtx.get('sessions') as any)?.list.getSnapshot().byId[sid]?.cwd as string | undefined
    if (!projectOf(moveTargets, cwd) || workspaceList()?.items.some(w => w.sessionIds.includes(sid))) return <Stock {...props} />
    const { disabled: _d, workspacePickerOpen: _o, onRequestWorkspace: _r, ...rest } = props
    return <Stock {...rest} placeholder={(appCtx.locale.bind('conversation') as (k: string) => string)('placeholder.hero')} />
  }
}

/** Swap the component of dsh's registered entry for `name`; undo on dispose. */
function wrapStockSlot(ctx: ClientContext, name: string, wrap: (c: any) => any): () => void {
  let entry: any
  let original: unknown
  let timer: ReturnType<typeof setTimeout> | undefined
  let tries = 0
  const attempt = (): void => {
    entry = (ctx.slots as any).entriesOfSlot?.(name)?.[0]
    if (!entry) { if (++tries < 40) timer = setTimeout(attempt, 250); return }
    original = entry.component
    entry.component = wrap(original)
  }
  attempt()
  return () => { clearTimeout(timer); if (entry && original) entry.component = original }
}

function ProjectHeaderButton(props: PropsRuntime<'conversation.session.header.utilities'>): ReactNode {
  const t = props.t
  const { sessionId, useSessions } = props
  const cwd = useSessions(s => cwdOf(s.byId[sessionId] as SessionRow | undefined))
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
    if (!await confirmDelete(detail.name)) return
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
  const cwd = useSessions(s => cwdOf(s.byId[sessionId] as SessionRow | undefined))
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
          if (!await confirmDelete(p.name)) return
          await postJson('delete?slug=' + encodeURIComponent(p.slug))
          if (selectedSlug === p.slug) select(null)
          notifyChanged()
        } },
    ],
  }), 'deep-projects: project menu')

  ctx.effect(() => {
    ctx.slots.inject('conversation.hero.options', () =>
      ctx.slots.register({ name: 'conversation.hero.options', id: 'deep-projects.picker', locale: 'projects' } as any, HeroPickerChip as any),
    )
  }, 'deep-projects: hero picker chip')
  ctx.effect(() => wrapStockSlot(ctx, 'conversation.hero.workspace', wrapWorkspacePicker), 'deep-projects: hero picker menu')
  ctx.effect(() => wrapStockSlot(ctx, 'conversation.composer.bar', wrapComposerBar), 'deep-projects: project chat input')

  // "Move to project" on dsh's own chat "…" menu. dsh changes the chat's
  // working directory; the chat keeps its history and stays in its workspace list.
  ctx.effect(() => (ctx as any).contextMenus.register({
    id: 'deep-projects.move', target: 'session', order: 450,
    observe: () => [(ctx as any).sessions.list],
    resolve: ({ sessionId }: { sessionId: string }) => {
      const row = (ctx as any).sessions.list.getSnapshot().byId[sessionId] as SessionRow | undefined
      const cwd = cwdOf(row) ?? ''
      const rows = moveTargets.filter(p => p.path && !p.archived)
      const current = rows.find(p => cwd === p.path || cwd.startsWith(p.path + '/'))
      const move = (slug: string | null) => async () => {
        const sessions = (ctx as any).sessions
        const r = await sessions.using(sessionId, { source: 'controllerOperation' }, () => postJson('move', { sessionId, slug }))
        if (!r?.ok) throw new Error(r?.error ?? 'move failed')
        await sessions.refreshProjections(sessionId).catch(() => {})
        notifyChanged()
      }
      return [
        { id: 'move', label: t('menu.moveTo'), icon: { key: 'deep-projects.open' }, disabled: rows.length === 0,
          children: rows.filter(p => p !== current).map(p => ({ id: p.slug, label: p.name, run: move(p.slug), failureLabel: t('menu.moveFailed') })) },
        ...(current ? [{ id: 'remove', label: t('menu.removeFrom'), icon: { key: 'deep-projects.archive' }, run: move(null), failureLabel: t('menu.moveFailed') }] : []),
      ]
    },
  }), 'deep-projects: move chat menu')
  // dsh's submenus hang upward from the parent menu with no height cap, so a
  // long project list runs off the top of the window. Cap any submenu that
  // overflows the top and let it scroll.
  ctx.effect(() => {
    const fit = (): void => {
      for (const el of document.querySelectorAll<HTMLElement>('[role="menu"][class*="_submenu"]')) {
        const r = el.getBoundingClientRect()
        if (r.top >= 12) continue
        el.style.maxHeight = Math.max(120, r.bottom - 12) + 'px'
        el.style.overflowY = 'auto'
      }
    }
    const mo = new MutationObserver(() => { requestAnimationFrame(fit) })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { mo.disconnect() }
  }, 'deep-projects: submenu fit')
  const loadTargets = () => { getJson('list').then((r) => { moveTargets = r?.ok ? (r.projects ?? []) : [] }).catch(() => {}) }
  loadTargets()
  changeListeners.add(loadTargets)

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

  // Pinned projects as a collapsible group between the panel rows and the
  // workspace list (see mountSidebarSeat).
  ctx.effect(mountSidebarSeat, 'deep-projects: sidebar projects')

  // Until the sidebar seat mounts (or if it never can), each pinned project is a
  // plain panel row under "Projects" that opens its project page. No chat tree.
  ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => {
    let disposers: Array<() => void> = []
    let live = true
    const clear = () => { for (const off of disposers) off(); disposers = [] }
    const sync = () => {
      getJson('list').then((d) => {
        if (!live) return
        clear()
        if (seatMounted) return
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
