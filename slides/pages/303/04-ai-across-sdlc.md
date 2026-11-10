---
layout: default
section: AI Across the SDLC
---

# AI Across the SDLC

<div class="text-sm mt-4">

| Phase | AI Capability | Primary Risk | Guardrail |
|---|---|---|---|
| **Requirements** | Draft stories, acceptance criteria | Confident nonsense | Stakeholder validation |
| **Design** | Architecture exploration, prototyping | Plausible but wrong patterns | Architectural constraints + ADRs |
| **Code** | Generation, refactoring, migration | Incorrect implementation | Tests + instruction files |
| **Test** | Test generation, edge case discovery | Shallow happy-path coverage | Coverage of failure paths enforced |
| **Review** | First-pass analysis, pattern detection | Reviewer fatigue → rubber-stamping | Explicit human approval required |
| **CI/CD** | Pipeline generation, config changes | Unsafe automation changes | Protected branches + status checks |
| **Operate** | Incident triage, log analysis | Missing context, data leakage | Data classification + audit trail |

</div>

<!--
This table is the operational core of AI governance.

Key insight: you cannot govern AI with a single policy.
Each SDLC phase introduces different risks and requires different controls.

The guardrails listed here are starting points. Each organization must define
specific thresholds that match their risk profile and regulatory requirements.

Facilitate a quick round-table: which phase are you most concerned about?
-->
