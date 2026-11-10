---
layout: default
section: Orchestration
---

# Orchestration & Delegation Patterns

```mermaid
graph LR
    A[You] -->|describe task| B[Plan Agent]
    B -->|clarify| A
    B -->|hand off| C{Execution Surface}
    C -->|interactive| D[Local Agent]
    C -->|background| E[Copilot CLI]
    C -->|async PR| F[Cloud Agent]
    D -->|review inline| A
    E -->|review worktree| A
    F -->|review PR| A
```

---

<div class="mt-4">


### Delegation boundaries

| **Delegate to agent** | **Keep for yourself** |
|---|---|
| Well-scoped implementation | Architecture decisions |
| Repetitive multi-file changes | Security-sensitive logic |
| Documentation generation | Business-critical flows |
| Test creation from specs | Ambiguous requirements |

</div>

<!--
Orchestration is about choosing the right surface for each sub-task.
The human stays responsible for strategy, security, and architecture.
Agents handle implementation within defined boundaries.
-->
