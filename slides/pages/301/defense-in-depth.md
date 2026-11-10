---
layout: default
section: Security
---

# Defense in Depth

Each security layer operates independently. Compromise of one doesn't bypass the others.

```mermaid
flowchart TB
  ORG["Org Policy<br/>what's allowed"] --> TRUST["Trust Boundaries<br/>what's trusted"]
  TRUST --> APPROVE["Approval Flow<br/>what's reviewed"]
  APPROVE --> SANDBOX["Sandboxing<br/>what's contained"]
  SANDBOX --> AUDIT["Hooks & Audit<br/>what's logged"]
```

- **Org Policy** controls which tools and modes are available
- **Trust** gates server startup
- **Approvals** gate each tool invocation
- **Sandboxing** limits what can happen even if approved
- **Audit** logs what did happen

<!--
This complements the enterprise policy table.
The layered model means: even if one layer fails, the others still protect.
Start restrictive, widen as trust builds.
-->
