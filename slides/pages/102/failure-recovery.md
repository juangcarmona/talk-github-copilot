---
layout: default
section: Recovery
---

# When Copilot Gets It Wrong 

## Diagnose First

**Amplified ambiguity** → Remove misleading context. Close stale tabs. Attach the authoritative file.

**Hallucination** → Attach the actual API file or type definition. Add a concrete example.

**Context gap** → Use `#file`, `#codebase`, or paste a representative snippet.

**Scope creep** → Ask for smaller, targeted changes. Specify exactly which function to touch.

<!--
This is a diagnostic workflow, not a list of failure modes.
The pattern: understand WHY it went wrong, then apply the right recovery.

Scenarios in detail:

1. Amplified ambiguity — Copilot didn't invent a problem. It amplified one already
   present in the repository. Stale docs, old component names, competing data formats,
   duplicated utilities, partial migrations — all context signals. Copilot follows them.

2. Hallucination — generated code references APIs, functions, or types that don't exist.
   This often happens when the model extrapolates from partial information.

3. Context gap — output is generic rather than project-specific.
   Copilot only reasons about what it sees.

4. Scope creep — more was changed than asked.
   Common with broad prompts.

Key insight: most prompt failures are context failures, not model failures.
If the repository contains two versions of the truth, open tabs decide which one
Copilot believes. Fixing the context fixes the output.

Additional recovery patterns (from failure-recovery-2.md, mention verbally):
- Conflicting output → restart the conversation. Long context accumulates contradictions.
- Repetitive bad results → explicitly state what NOT to do.
- Confident wrong answer → validate with docs, tests, or a second opinion.

Transition: "A well-structured prompt is worth ten retries."
-->
