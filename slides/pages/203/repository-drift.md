---
layout: default
section: Repository Drift
---

# Repository Drift (1/2)

## What Is Repository Drift?

The gap between your **intended architecture** and your **actual codebase**.

```
Intended:                              Actual (6 months later):
  orders/ → only order logic             orders/ → imports payment internals
  payments/ → only payment logic         payments/ → has order validation logic
  shared/ → truly shared utilities       shared/ → 47 files, half unused
```

## Why Drift Hurts AI

- **Embeddings become noisy** - retrieval returns wrong context
- **Naming loses meaning** - `orders/` contains non-order code
- **Instructions become stale** - rules reference outdated structure
 - **Instructions become stale** - rules reference outdated structure
 - **Tools navigate incorrectly** - file paths don't match expectations

---

## Manual Signals

- "Copilot keeps suggesting imports from the wrong module"
- "Chat references files I deleted months ago"
 - "The tooling places new code in the wrong folders"

## Detecting Drift

- Architecture tests (e.g., layer import rules)
- Dependency analysis and import hygiene checks
- Periodic repository reviews and naming audits

---

## Corrective Actions

| Action | Effort | Impact |
|---|---:|---:|
| Add or update `ARCHITECTURE.md` | Low | Clarifies intent for humans and tools |
| Move misplaced files into correct modules | Medium | Structural clarity |
| Add lightweight architecture tests in CI | Medium | Prevents future regression |
| Run periodic naming and dependency audits | Low | Reduces noisy embeddings |

Drift detection should be continuous — add simple checks that surface misplacements before they compound.

<!--
Drift is the silent killer of AI-ready repositories.

A repo can start perfectly structured and gradually
lose its AI-friendliness through organic growth.

The key insight: drift detection should be continuous,
not a one-time cleanup effort.
-->
