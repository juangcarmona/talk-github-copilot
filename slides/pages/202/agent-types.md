---
layout: default
section: Agent Types
---

# Three Agent Surfaces

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

## Local Agent

Runs inside VS Code. Interactive, immediate feedback. You approve each tool call.

## Copilot CLI (Background)

Runs on your machine in the background. Autonomous. Uses worktrees for isolation. You continue working.

## Cloud Agent

Runs on GitHub infrastructure. Opens PRs against your repository. Fully async - review when ready.

<div class="mt-2 text-sm opacity-70">

Each surface shares the same instruction files and custom agents. Choose based on task shape, not capability.

</div>

</div>
<div>
<img src="/202/agent-types-diagram-v3.png" class="w-full object-contain rounded shadow" />
</div>
</div>

<!--
Key insight: these are deployment surfaces, not different products.
The same instructions, tools, and agent definitions work across all three.
Local = interactive. CLI = background local. Cloud = remote async.
-->
