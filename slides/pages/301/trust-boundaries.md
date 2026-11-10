---
layout: default
section: Security
---

# Trust Boundaries

Every MCP interaction crosses a trust boundary. VS Code enforces explicit consent at each layer.

```mermaid
flowchart TB
  subgraph Trusted["Trusted Zone (your machine)"]
    WS["Workspace Trust"]
    EXT["Extension Publisher Trust"]
    MCP["MCP Server Trust"]
  end
  subgraph Actions["What Gets Gated"]
    A1["Execute code from project"]
    A2["Run extension code"]
    A3["Start server & provide tools"]
    A4["Fetch from external domain"]
  end
  WS --> A1
  EXT --> A2
  MCP --> A3
  NET["Network Domain Trust"] --> A4
```

**Each boundary requires explicit consent before crossing.**

- **Workspace** - untrusted projects run in restricted mode, agents disabled
- **Extension publisher** - prompted before activation
- **MCP server** - prompted before first start and after config changes
- **Network domain** - prompted before fetching external content

<!--
This is NOT just about MCP. It's the full security model.
The point: trust is layered, not binary. Each layer can be revoked independently.
Attendees should understand that opening a repo with an mcp.json does NOT auto-run those servers.
-->
