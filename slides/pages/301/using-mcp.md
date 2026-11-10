---
layout: default
section: Orchestration
---

# MCP as Integration Layer

MCP doesn't give Copilot a list of commands. It gives Copilot **capabilities** it can sequence autonomously.

**The shift:**
- **Before MCP:** Copilot answers questions about your code
- **With MCP:** Copilot reads your tickets, runs your tests, opens your PRs, and queries your APIs

Commit `.vscode/mcp.json`. When a developer opens the repo, their Copilot has the same tools as everyone else's.

<!--
This replaces "how to pick tools in chat" with the orchestration framing.

Key message: mcp.json is team infrastructure, not a personal config.
It should be committed, reviewed, and maintained like any other config file.
-->