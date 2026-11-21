# Agent instructions: apply the sidebar patch for deep-projects

You are an AI coding agent. Your user installed the **deep-projects** plugin for
DeepSeek Harness (dsh) and wants its full sidebar view: pinned projects shown as
expandable rows with their chats underneath and a "…" menu, between the panel
rows and the workspace list.

Stock dsh has no plugin seat for that spot, so the plugin falls back to plain
sidebar rows. This patch adds the seat (`sidebar.projects`) to dsh's
`ui-sidebar` package. Once the seat exists, the plugin uses it by itself.
Nothing in the plugin needs to change.

Follow the steps in order. Stop and report to the user if a step fails.

## What the patch changes

`ui-sidebar-projects-seat.patch` touches four files in
`packages/client/ui-sidebar/src/client/`, about 50 added lines in total:

- `contract/slots.ts`: declares the `sidebar.projects` slot type.
- `index.ts`: registers the slot.
- `SidebarRoot.tsx`: renders the slot between the panel list and the workspace region.
- `SidebarRoot.module.css`: lays the seat out and hides it in the collapsed rail.

When no plugin fills the seat it renders nothing, so the patch is safe with or
without deep-projects installed.

## Step 1: find a dsh source checkout

The patch edits dsh **source** files. It works only on a git checkout of
<https://github.com/deepseek-ai/deepseek-harness> that the user runs dsh from
(for example with `pnpm dsh web`).

- Ask the user where their checkout is, or look for a folder that contains
  `packages/client/ui-sidebar/src/client/SidebarRoot.tsx`.
- **If dsh was installed from npm** (`npx @deepseek-ai/dsh`, a global install,
  or a desktop app), there is no source to patch. Do **not** edit the built
  files under `node_modules`. Tell the user the fallback rows already work, and
  that the full view needs a source checkout. Then stop.

In the steps below, `$DSH` is the checkout folder and `$PATCH` is the full path
to `ui-sidebar-projects-seat.patch` (it sits next to this file; download it from
<https://raw.githubusercontent.com/JoblessJoe/deep-projects/main/patches/ui-sidebar-projects-seat.patch>
if you only have this text).

## Step 2: check before changing anything

```bash
cd "$DSH"
git status --short packages/client/ui-sidebar   # note any local changes
git apply --check "$PATCH"
```

- No output from `git apply --check` means the patch fits. Go on.
- `git apply --check --reverse "$PATCH"` succeeding means it is **already
  applied**. Skip to step 4.
- If both fail, the user's dsh version differs from the one the patch was made
  for (dsh 0.2.2). Try `git apply --3way "$PATCH"`. If that leaves conflicts,
  undo with `git checkout -- packages/client/ui-sidebar` (only if that folder
  had no local changes before), and make the four changes listed above by hand,
  using the patch as the reference. Keep the slot name exactly
  `sidebar.projects`, `kind: 'single'`, `scope: 'root'`, and render it with the
  props `{ wide, expandSidebar }`.

## Step 3: apply

```bash
cd "$DSH"
git apply "$PATCH"
git diff --stat packages/client/ui-sidebar   # expect the 4 files above
```

## Step 4: rebuild the sidebar package

The web GUI loads the built client bundle `packages/client/ui-sidebar/lib/client.js`,
so rebuild that package:

```bash
cd "$DSH"
pnpm --filter @deepseek-ai/dsh-client-ui-sidebar run bundle
grep -c "sidebar.projects" packages/client/ui-sidebar/lib/client.js   # must be 1 or more
```

If the `bundle` script is missing in their version, run the repo-wide client
build instead: `pnpm run build:lib:client`.

## Step 5: restart and verify

1. Before restarting, make sure no dsh session is in the middle of a reply,
   because a restart stops it. Ask the user if unsure.
2. Restart the dsh web server the way the user runs it (for example stop and
   start `pnpm dsh web`, or restart their service).
3. Ask the user to reload the browser tab and pin a project (the "…" menu on a
   project, then "Pin to sidebar").
4. Expected result: the pinned project appears between the panel rows and the
   workspace list with a folder icon. Hovering shows an arrow and a "…" button;
   the arrow lists the project's chats.

## Undo

```bash
cd "$DSH"
git apply --reverse "$PATCH"
pnpm --filter @deepseek-ai/dsh-client-ui-sidebar run bundle
```

Then restart dsh. deep-projects goes back to plain sidebar rows.

## Notes for the agent

- A dsh update that replaces `packages/client/ui-sidebar` removes the patch.
  Re-apply it after updating, using the same steps.
- Do not change the plugin to make the patch "work". The plugin checks for the
  seat on load and picks the right view.
- Report back to the user in a few lines: whether the patch was applied, rebuilt,
  and whether the restart is done or still up to them.
