---
layout: default
section: Code Review
---

# Reviewing AI-Generated Changes

<div class="grid grid-cols-[1.1fr_1fr] gap-6 mt-2">
<div>

<img src="/103/copilot-edits-changed-files-full.png" class="w-full object-contain rounded shadow" />

</div>
<div class="leading-snug">

## The review discipline

Every AI edit is a **pending change**. Treat it like a PR from a junior dev.

- Files with pending edits are marked for review
- Open the diff - read every changed line
- **Keep** what's correct, **Undo** what isn't
- Hover for line-level accept/reject

## Do not skip

Staging in Source Control auto-accepts pending edits.

Review first. Stage second.

<div class="mt-4 text-sm opacity-70">Once the diff looks right, validate behavior with tests.</div>

</div>
</div>

<!--
Merged from review-discipline.md and review-controls.md.

The left side shows the changed files view (the big picture: which files changed).
The right side is the operational workflow: what to do with each pending change.

The "staging auto-accepts" warning is the most dangerous footgun - keep it.
The inline review controls (↑/↓) navigate between individual edits across files.

Demo: generate a multi-file edit in agent mode, then walk through the changed files panel.
Show accept/reject at line level.

Warning to trainer: staging in Source Control auto-accepts. Demo this footgun live —
participants remember what they see go wrong.
-->
