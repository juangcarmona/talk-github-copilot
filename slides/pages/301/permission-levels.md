---
layout: default
section: Security
---

# Permission Levels

The permissions picker controls how much autonomy the agent has during a session.

| Level | Tool calls | Clarifying questions | Use case |
|---|---|---|---|
| **Default Approvals** | Shows confirmation | Asks when needed | Daily work - review everything |
| **Bypass Approvals** | Auto-approved | Asks when needed | Trusted project, fast iteration |
| **Autopilot** | Auto-approved | Auto-responded | Fully autonomous tasks |

<br/>

```mermaid
flowchart LR
  D["Default Approvals"] -->|"more autonomy"| B["Bypass Approvals"]
  B -->|"fully autonomous"| A["Autopilot"]
  style D fill:#e0e7ff,stroke:#818cf8,color:#3730a3
  style B fill:#ddd6fe,stroke:#8b5cf6,color:#5b21b6
  style A fill:#d8b4fe,stroke:#a855f7,color:#6b21a8
```

**Security implication:** Bypass and Autopilot skip approval prompts for potentially destructive actions. Only use in sandboxed environments or with trusted tools.

<!--
This is the autonomy spectrum.
Default Approvals is the safe baseline. Autopilot is powerful but risky.
Enterprise orgs can disable Bypass/Autopilot via the ChatToolsAutoApprove policy.
-->
