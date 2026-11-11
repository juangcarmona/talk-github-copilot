---
layout: default
section: Context
---

# Neighboring Tabs

<div class="grid grid-cols-2 gap-8">
<div class="leading-snug">

**What to keep open**

- Interface or type definitions
- Related utility or service files
- A representative test file
- Relevant config

</div>
<div>

<img src="/102/neighboring-tabs.png" class="w-full object-contain rounded shadow" />

</div>
</div>

<!--
One of the simplest and most effective context management techniques.

Open files are implicit context — Copilot reads them even when you don't attach
them explicitly. Same prompt + different open tabs = different suggestions.

What to keep open: interfaces, related services, representative tests, relevant config.

What to close: stale docs that contradict current code, old versions of refactored
modules, unrelated large files that crowd the context window.

Demo idea: open a prompt in two setups — one with the correct interface file open,
one with a stale doc open. Show how the suggestions diverge.

Key message: tab management is context engineering. Treat your open tabs as a
curated context set, not a workspace.

Transition: "Open tabs are implicit. But you can also attach context explicitly."
-->