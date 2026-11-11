---
layout: default
section: MCP Ecosystem
---

# Finding & Building MCP Servers

## Where to Find More

- [modelcontextprotocol.io/servers](https://modelcontextprotocol.io/servers) - official registry
- VS Code Extensions view → `@mcp` search - gallery with one-click install
- npm - search `@mcp-server` for community packages

## Building Custom Servers

When no existing server fits, build one:

- **TypeScript SDK:** `@modelcontextprotocol/sdk`
- **Python SDK:** `mcp` package
- **Use for:** internal APIs, legacy systems, proprietary tools

A custom MCP server is how you connect COBOL-era systems, internal databases, or any tool not yet in the ecosystem.

<div class="mt-3 text-sm opacity-70">Servers communicate via stdio or HTTP. Architecture details in the next slide.</div>

<!--
Custom servers are the key extensibility point for enterprise and legacy integrations.
The SDKs handle protocol negotiation - you just implement tool handlers.
TypeScript or Python are the fastest path to a working server.
-->
