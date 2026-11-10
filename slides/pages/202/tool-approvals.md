---
layout: default
section: Tool Approvals
---

# Tool Usage & Approvals

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

## Tool types

- **Built-in** - file edits, terminal, search, web
- **MCP servers** - external APIs, databases, services
- **Extension tools** - from VS Code extensions

## Approval workflow

Each tool invocation shows:
- What tool is being called
- With what parameters
- Approve once / session / workspace / always

## URL approval (two-step)

1. **Pre-approval** - trust the domain?
2. **Post-approval** - trust the response content?



</div>
<div>
<img src="/202/chat-approve-tool.png" class="w-full object-contain rounded shadow" />
Review parameters carefully. Tools can modify files, run commands, and fetch external content. Post-approval catches prompt injection in fetched content.
</div>
</div>


<!--
Tool approvals are the primary security boundary in agent mode.
The two-step URL approval is specifically designed to prevent prompt injection
via user-generated content on otherwise trusted domains.
Organizations can enforce manual approvals for specific tools via policies.
-->
