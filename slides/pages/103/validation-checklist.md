---
layout: default
section: Workflow
---

# The Validation Workflow

```
Generate / Modify
       ↓
  Review diff
  └─ Does every changed line make sense? ──► No → Ask Copilot to explain / adjust
       ↓ Yes
  Run tests
  └─ All tests pass? ──► No → /fixTestFailure → back to Review diff
       ↓ Yes
  Security check
  └─ Vulnerabilities found? ──► Yes → Security Review Workflow
       ↓ No
  Ready to commit
```

<div class="mt-6 text-sm opacity-70">

This workflow applies to every Copilot interaction - autocomplete, chat, and agent mode alike.
The steps are the same. The scope scales with the change size.

</div>

<!--
The validation workflow is the most important operational takeaway from 103.

It replaces the old checklist with a decision graph:
each step has a Yes/No branch, making it actionable rather than aspirational.

For agent mode changes: the diff can be large. Read it carefully. The same workflow applies.

Trainer note:
- The point is not to make Copilot look bad. The point is to teach where Copilot output must be verified.
- Participants should compare Copilot's findings with their own manual review.
- Copilot is useful in this module, but only inside a disciplined validation loop.
- The starter codebase passes all tests. That's not the goal state - it's the starting problem.
-->