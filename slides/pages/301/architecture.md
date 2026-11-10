---
layout: default
section: Architecture
---

# MCP Architecture - Operational View

How tools flow from configuration to execution in your development environment.

```mermaid
flowchart LR
  subgraph Config["Configuration"]
    J[".vscode/mcp.json"]
    U["User mcp.json"]
  end
  subgraph Runtime["VS Code Runtime"]
    D["Discovery & Trust"]
    C["MCP Client"]
    A["Agent Loop"]
  end
  subgraph Servers["MCP Servers"]
    S1["Local (stdio)"]
    S2["Remote (HTTP)"]
  end
  subgraph Targets["External Systems"]
    T1["APIs · Databases"]
    T2["CI/CD · Issue Trackers"]
  end
  J --> D
  U --> D
  D -->|"trust gate"| C
  C --> S1
  C --> S2
  A <-->|"tool calls"| C
  S1 --> T1
  S2 --> T2
```

The flow: **config → trust → client → server → external system.**

<!--
This replaces the protocol-focused architecture slide with an operational one.
The key gate is trust - nothing runs without explicit consent.
Transport comparison follows on the next slide.
-->