---
layout: default
section: Copilot CLI
---

# Copilot CLI: Background Agents

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

## How it works

- Runs autonomously on your local machine
- You continue editing while it works
- Multiple sessions in parallel
- Commits to worktree at end of each turn
- Full conversation history preserved

## Start a session

1. Chat view → **New Chat** → **Copilot CLI**
2. Choose isolation mode (worktree / workspace)
3. Submit prompt → agent works in background

## Hand off from Plan

Plan agent → **Start Implementation** → **Continue in Copilot CLI**

<div class="mt-2 text-sm opacity-70">


</div>

</div>
<div>
<img src="/202/copilot-cli-session.png" class="w-full object-contain rounded shadow" />

Best for: well-defined tasks that don't need constant interaction.

</div>
</div>

<!--
Copilot CLI is NOT the same as GitHub cloud agent.
It runs locally, uses your machine's resources, and can access local MCP servers.
Worktree isolation prevents conflicts with your active work.
-->
