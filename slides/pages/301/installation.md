---
layout: list
section: Installation
---

# Adding MCP Servers to VS Code

- `MCP Registry` Install from the VS Code marketplace registry
- `Workspace mcp.json` Configure in `.vscode/mcp.json` for team sharing
- `User Settings` Add to personal VS Code settings
- `Dev Containers` Include in dev container configuration
- `Auto-discovery` VS Code auto-detects registered servers
- `CLI` Install via command line tools

<!--
The most common approaches:
1. Workspace mcp.json - shared with the team via Git
2. User settings - personal servers that apply to all projects

For team consistency, use workspace mcp.json.

Be careful: tools can access sensitive data or perform actions on your behalf.
Always review and approve tool invocations when prompted.
-->