---
layout: default
section: Architecture
---

# MCP Transport Comparison

| Transport | Runs | Use case | Example |
|---|---|---|---|
| **stdio** | Your machine | Personal tools, fast local access | Playwright, file-based servers |
| **HTTP** | Remote / cloud | Team infrastructure, shared services | GitHub, Azure DevOps |

<br/>

- **stdio** servers are simpler - no auth needed, start as child processes
- **HTTP** servers support OAuth/token auth and can be shared across teams

<!--
Local servers are the fastest path to a working MCP setup.
Remote servers are for team-wide infrastructure - CI/CD, shared APIs, enterprise tools.
Choose based on whether the tool needs to be personal or shared.
-->
