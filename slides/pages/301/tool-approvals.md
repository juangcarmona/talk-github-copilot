---
layout: default
section: Security
---

# Tool Invocation Approvals

Every MCP tool call shows a confirmation dialog before execution.

| Scope | Duration |
|---|---|
| **Once** | Single invocation |
| **Session** | Current chat session |
| **Workspace** | This project always |
| **User** | All projects always |

**Rule:** Start narrow, widen only when you understand the tool's behavior.

<!--
Attendees will see this dialog every time a tool runs (unless they've pre-approved).
The key message: review the parameters, not just the tool name.
A "read file" tool with a path to /etc/passwd is very different from reading src/index.ts.
Use when: Unknown tools → Once. Iterating on a task → Session. Trusted project tools → Workspace. Personal infrastructure → User.
-->
