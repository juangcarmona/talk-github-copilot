---
layout: two-cols-header
section: Instruction Hierarchy
---

# Instruction Layers in Practice

::left::

## **The File Map**

```
your-repo/
├── .github/
│   ├── copilot-instructions.md        ← repo-wide instructions
│   ├── instructions/
│   │   ├── backend.instructions.md    ← scoped instructions
│   │   ├── frontend.instructions.md   ← scoped instructions
│   │   └── tests.instructions.md      ← scoped instructions
│   ├── prompts/
│   │   ├── review.prompt.md           ← reusable workflows
│   │   └── onboarding.prompt.md       ← reusable workflows
│   ├── skills/
│   │   ├── api-design/
│   │   │   └── SKILL.md
│   │   └── incident-response/
│   │       └── SKILL.md
│   ├── agents/
│   │   └── reviewer.agent.md          ← custom agents (advanced)
│   └── hooks/
│       └── pre-review.json            ← workflow hooks/policies

```

::right::

## How They Stack

**Repo-wide** (`.github/copilot-instructions.md`)
→ Applied to every interaction in the repo.
Use for: language, conventions, architecture rules, security standards.

**Path-specific** (`.github/instructions/*.instructions.md`)
→ Applied only when Copilot is working in matched paths.
Use for: framework rules, test conventions, domain-specific patterns.

**Prompt files** (`.github/prompts/*.prompt.md`)
→ Reusable prompts invoked explicitly.
Use for: repeated workflows (code review, PR summary, onboarding).

<div class="mt-4 text-sm opacity-70">Lower layers add to, not replace, higher layers.</div>
<div class="mt-2 text-sm opacity-70">All active layers are composed together.</div>

<!--
This is the most important operational slide in Module 201.

The file map makes it concrete - show the actual paths.
Teams should be able to open their repo and know exactly where to create each file.

Key message: instruction files are first-class repo artifacts. They belong in version control, reviewed like code.

The agents/ path is shown here for completeness - it belongs to Module 202.

Lab exercise mapping:
- Exercise 02: create `.github/copilot-instructions.md`
- Exercise 03: create `.github/instructions/backend.instructions.md` with `applyTo: "**/*.cs"`
- Exercise 04: create `.github/instructions/frontend.instructions.md` with `applyTo: "**/*.ts,**/*.tsx"`
- Exercise 05: add architecture docs and ADRs to `docs/` - these become rich context for Copilot when referenced
- Exercise 06: create a second `.instructions.md` that conflicts with the root - observe unpredictable output; conclusion is that scoped instructions must specialize, not contradict
-->
