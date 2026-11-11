---
layout: default
section: Workflow
---

# AI Output is Draft Code

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="leading-snug">

## What this means operationally

Every Copilot output - inline, chat, agent - is a **draft**.

It requires the same steps as any code change:

- Read the diff
- Run tests
- Review before committing

</div>
<div class="leading-snug">

## The autonomy tradeoff

The more autonomous the interaction, the larger the diff to review.

| Mode | Output scope | Review effort |
|------|-------------|---------------|
| Autocomplete | A few lines | Low |
| Chat | A function/file | Medium |
| Agent | Multiple files | High |

</div>
</div>

<div class="mt-4 text-sm opacity-70">Compilation is a syntax check. The workflow on the next slide is the verification check.</div>

<!--
One framing slide for the whole module - not a philosophy lecture.

The trust idea is collapsed into operational steps: read, verify, run, check, review.
The autonomy table is practical: more autonomy = more review, not more trust.

This replaces trust-boundaries.md which was too abstract.

Additional detail for the trainer (not on the slide to avoid previewing the validation workflow):
- "Verify APIs exist" — Copilot can call methods that don't exist. Compilation catches syntax,
  not semantic correctness. If it compiles, check that the APIs are real and current.
- "Check behavior, not just syntax" — a function can be syntactically perfect and logically wrong.
  The validation workflow on the next slide makes this concrete.

Demo suggestion: show a Copilot-generated function that compiles but calls a nonexistent API method.
The diff looks clean. The build fails. This sets up the validation workflow.

Talking point: "Compilation is necessary but not sufficient. The validation workflow is the
sufficient check."
-->
