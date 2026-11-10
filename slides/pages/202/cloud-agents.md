---
layout: default
section: Cloud Agents
---

# Cloud Agents: Async PR Workflow

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

### Key characteristics

- Runs on GitHub infrastructure (not your machine)
- Works against your GitHub repository
- Opens pull requests automatically
- Integrates with code review workflows

### Best candidates

- Large-scale refactoring
- Feature implementation from specs
- Addressing code review feedback
- Dependency upgrades across files

### Hand off from local

- Chat view → Session type dropdown → **Cloud**
- Full conversation context transfers to the cloud session.

</div>
<div>
<img src="/202/cloud-agent-session.png" class="w-full object-contain rounded shadow" />
</div>
</div>

<!--
Cloud agents are the "assign to @copilot" workflow from GitHub Issues.
They don't have access to VS Code built-in tools or local runtime.
They ARE limited to MCP servers configured in the cloud service.
Trade-off: more autonomy, less local context.
-->
