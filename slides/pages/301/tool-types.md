---
layout: default
section: Tool Types
---

# Three Types of Tools

Copilot can use tools from three sources. Each has different trust, scope, and capabilities.

```mermaid
flowchart TB
  subgraph Agent["Copilot Agent"]
    direction LR
    B["Built-in Tools"]
    M["MCP Tools"]
    E["Extension Tools"]
  end
  B --> B1["File edits, terminal,<br/>codebase search, web fetch"]
  M --> M1["External APIs, databases,<br/>browsers, CI/CD, issue trackers"]
  E --> E1["Language servers, linters,<br/>debuggers, test runners"]
```

- **Built-in:** what Copilot can do out of the box
- **MCP:** how you extend Copilot to reach external systems
- **Extensions:** what VS Code extensions contribute to the agent

<!--
This is the mental model slide.
The key insight: MCP is the extensibility layer for connecting to YOUR infrastructure.
The comparison table follows on the next slide.
-->
