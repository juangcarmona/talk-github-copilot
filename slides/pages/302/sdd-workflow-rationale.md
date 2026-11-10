---
layout: default
section: SDD Workflow
---

# The Spec-Driven Workflow - Why Order Matters

<div class="leading-snug">

**Specify before Plan** prevents architecture-first thinking, where technical choices drive requirements instead of serving them.

**Plan before Tasks** prevents task-level chaos, where developers implement disconnected pieces without shared architectural intent.

**Tasks before Implement** prevents scope creep and makes AI output verifiable: every generated code artifact has a task it belongs to.

</div>

## With Copilot

```
/speckit.constitution  →  Set the foundation
/speckit.specify       →  Describe the feature
/speckit.clarify       →  Ask the agent to find gaps
/speckit.plan          →  Technical approach
/speckit.tasks         →  Break into implementable units
[implement task by task with Copilot]
```

<div class="mt-3 text-sm opacity-70">

The prompts are tools. The thinking is yours.

</div>

<!--
The value is the discipline of separating thinking from building.

Each step narrows the solution space:
- Constitution: infinite → bounded by principles
- Specify: bounded → scoped to outcomes
- Plan: scoped → architecturally constrained
- Tasks: constrained → individually implementable
- Implement: implementable → done and verifiable
-->
