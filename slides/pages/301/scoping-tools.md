---
layout: default
section: Orchestration
---

# Scoping Tools to Agents

In prompt files and agent profiles, restrict which tools are available:

```yaml
# .github/prompts/run-tests.prompt.md
---
tools: [playwright/*]
---
Run the full test suite and report failures
with file and line references.
```

This prevents agents from taking unintended actions outside their scope.

**Tool approval model:**

- By default: Copilot asks before invoking MCP tools
- You can configure auto-approval for trusted tools in low-risk scenarios
- Review tool invocations in the Chat audit trail

<div class="mt-4 text-sm opacity-70">The agent orchestrates. MCP tools execute. You review and approve.</div>

<!--
The scoping pattern (tools: in agent profiles) is important for safety in autonomous workflows.

The key security principle: always review tool invocations.
In Chat, Copilot asks for approval.
In Coding Agent, tools can run autonomously if configured - be careful.
-->
