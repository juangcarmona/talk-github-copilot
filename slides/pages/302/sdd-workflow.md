---
layout: default
section: SDD Workflow
---

# The Spec-Driven Workflow - Steps

<div class="leading-snug">

## Thinking Before Building

```
Constitution          "What are our non-negotiables?"
      ↓                Principles, quality standards,
                       architectural constraints.

Specify               "What are we building and why?"
      ↓                User outcomes, acceptance criteria,
                       scope boundaries. No tech decisions yet.

Plan                  "How will we build it?"
      ↓                Stack, architecture, component breakdown.
                       First point where technical choices appear.

Tasks                 "What are the implementable units?"
      ↓                Scoped, testable, independently reviewable.
                       Each task connects back to a spec requirement.

Implement             "Build one task at a time."
                       Each implementation step validates against tasks.
                       Each task validates against the spec.
```

</div>

<!--
This merges constitution-specify and plan-tasks-implement into a connected narrative.

The key message: the value is NOT the slash commands.
The value is the discipline of separating thinking from building.

Copilot makes implementation fast. SDD ensures you're implementing the right thing.
-->
