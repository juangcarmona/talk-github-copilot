---
layout: table
section: Economics
---

# Workflow Consumption at a Glance

| Workflow | Credit Level | Notes |
|---|---|---|
| 🟢 Autocomplete | Free | Always available; zero AI credit impact |
| 🟡 Chat / CLI | Standard | Token-based; context size drives consumption |
| 🟠 Agent sessions | Elevated | Multi-step execution; each internal step = model invocation |
| 🟠 Code review | Elevated | Large-context analysis; scales with PR size |
| 🔴 Spark / External agents | High | Continuous autonomous execution; requires governance |

<small>

🟢 Baseline · 🟡 Standard interactive · 🟠 Elevated cost · 🔴 Active governance required

</small>

<!--
This consolidates the workflow consumption taxonomy.

The key operational shift:
- Before: count requests
- Now: optimize workflow efficiency

The variables that drive consumption:
- Context size (larger context = more tokens)
- Model choice (reasoning models cost significantly more)
- Iteration count (corrective turns compound cost)
- Execution patterns (agent sessions multiply invocations)
-->

<!--
Before:
we optimized request count.

Now:
we optimize workflow efficiency.

The key variables are:
- context
- iteration
- model choice
- execution patterns

The important shift:
AI stopped being isolated prompting.
It became workflow execution.
-->