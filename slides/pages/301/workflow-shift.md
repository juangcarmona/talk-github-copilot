---
layout: default
section: Workflow Shift
---

# How MCP Changes AI Workflows

MCP shifts Copilot from **code assistant** to **workflow operator**.

```mermaid
flowchart TB

  subgraph After["With MCP"]
    direction LR
    A1["Developer"] --> A2["Copilot Agent"]
    A2 --> A3["Read tickets"]
    A2 --> A4["Run tests"]
    A2 --> A5["Open PRs"]
    A2 --> A6["Query APIs"]
    A2 --> A7["Check CI"]
    A2 --> A8["Browse docs"]
  end
  subgraph Before["Without MCP"]
    direction LR
    B1["Developer"] --> B2["Copilot"]
    B2 --> B3["Code suggestions"]
  end
```

<!--
This is the conceptual shift slide.
Before MCP: Copilot is a fast typist.
After MCP: Copilot is a workflow participant that can read, act, and validate across systems.
The value isn't "more tools" - it's "connected workflows."
-->
