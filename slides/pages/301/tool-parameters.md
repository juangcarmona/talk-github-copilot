---
layout: default
section: Security
---

# Inspecting & Editing Tool Parameters

You can review and modify the parameters before a tool executes.

<div class="flex justify-center mt-4">
  <img src="/301/mcp-tool-edit-parameters.png" class="rounded shadow-lg max-h-80" />
</div>

- The agent chooses parameters autonomously - it might be wrong
- Prompt injection can influence subsequent tool calls
- A tool reading `../../.env` looks like `src/config.ts` unless you inspect it

<!--
This is the "review what's actually happening" slide.
It connects to the prompt injection risk: malicious content from one tool can lead the agent to invoke another tool with dangerous parameters.
Inspecting parameters is the last line of defense before execution.
Operational habit: Expand tool details. Read the parameters. Then approve.
-->
