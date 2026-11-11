---
layout: default
section: Tool Types
---

# Tool Types - Comparison

| | Built-in | MCP Servers | Extensions |
|---|---|---|---|
| **Source** | VS Code core | `mcp.json` / registry | Marketplace |
| **Scope** | Workspace files | Any system | IDE features |
| **Trust** | Always available | Explicit trust | Publisher trust |
| **Sharing** | Automatic | Commit `mcp.json` | Team installs |
| **Sandboxing** | Workspace-limited | Configurable | Extension host |

<br/>

**Key difference:** MCP servers are the only tool type you configure per-project and share via Git.

<!--
This is the companion table to the three-sources diagram.
Highlight the "Sharing" row - mcp.json is team infrastructure.
The trust model differs: built-in tools are always trusted, MCP requires explicit consent.
-->
