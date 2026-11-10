---
layout: two-cols-header
section: Code Review
---

# AI-Assisted PR Review

::left::

## When it adds value

- Large changes touching multiple files
- Security-sensitive code paths
- Complex refactoring with subtle regressions
- Unfamiliar codebases or languages

## When to skip it

- Formatting-only changes
- Dependency updates
- Simple documentation edits

::right::

## The workflow

**1.** Request a Copilot review or configure auto-review on PR creation.

**2.** Focus it: *"Review only the payment processing changes."*

**3.** Triage: fix blockers, note suggestions, dismiss false positives with a reason.

**4.** Iterate: *"Why is this flagged? How do I fix it?"*

**5.** Fix or document why it's acceptable.

<div class="mt-4 text-sm opacity-70">Copilot does not catch everything. Compare its findings with your own review.</div>

<!--
Trimmed from the previous version. Removed:
- "review cost scales with PR size" (obvious)
- lab exercise references in the main content area
- excessive agent review theory

The core: when to use it, five steps, one warning.

Talking point: "Copilot review is not a replacement for human review. It's a first pass.
It catches patterns. Humans catch intent."

Demo suggestion: show a PR with a subtle behavioral regression that Copilot flags,
and one it misses. This sets up the closing message.

Lab exercises:
- Exercise 3: three intentionally problematic PRs in pr-examples/
  pr-001: subtle behavioral regression
  pr-002: incomplete security fix introducing a new vulnerability
  pr-003: test "improvements" that are still fake-green
-->