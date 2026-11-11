---
layout: default
section: Configuration
---

# MCP Configuration as Team Infrastructure

The `.vscode/mcp.json` file is committed to your repository - it's shared team infrastructure.

| Scope | File | Use case |
|---|---|---|
| **Workspace** | `.vscode/mcp.json` (via Git) | Team tools for this project |
| **User** | Profile `mcp.json` | Personal tools across all projects |

**Security rule:** Never hardcode secrets. Use input variables or `.env` files.

<!--
This is the "mcp.json is infrastructure" message.
When a new team member clones the repo, they get the same tool configuration.
They still need to trust each server individually - the config alone doesn't grant access.
-->
