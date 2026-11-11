---
layout: default
section: Reviewing Changes
---

# Reviewing Agent Changes

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

## Changes panel

- **Files** — workspace file list
- **Changes** — added / modified / deleted files

## Quick review

1. Open a changed file to view the diff.
2. Add inline feedback; agent will revise.

## Actions

<div class="text-sm">

| Action | What it does |
|---|---|
| **Commit** | Apply edits to working folder |
| **Merge** | Merge branch / open PR |
| **Discard** | Revert agent edits |

</div>

<div class="mt-2 text-sm opacity-70">
Review the diff; decide what to keep.

</div>

</div>
<div>
<img src="/202/agent-file-changes-v2.png" class="w-full object-contain rounded shadow" />
</div>
</div>

<!--
The review workflow is the same regardless of agent surface.
You always see diffs. You always choose what to keep.
The agent NEVER pushes to protected branches directly.
-->
