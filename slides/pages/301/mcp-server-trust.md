---
layout: default
section: Security
---

# MCP Server Trust

When you add or modify an MCP server, VS Code requires trust confirmation before starting it.

<div class="flex justify-center mt-4">
  <img src="/301/mcp-server-trust-dialog.png" class="rounded shadow-lg max-h-80" />
</div>

- Triggered on first add, any config change, or after `MCP: Reset Trust`
- If you decline, the server does not start - chat continues without those tools
- Cloning a repo with `mcp.json` does **not** auto-run servers

<!--
Key operational point: cloning a repo with mcp.json does NOT give those servers access to your machine.
You must explicitly trust each server before it runs.
This is the first gate in the security chain.
-->
