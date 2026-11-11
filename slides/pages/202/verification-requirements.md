---
layout: default
section: Verification Requirements
---

# Verification Requirements

<div class="leading-snug mt-4">

**Always validate agent output:**

- Run the test suite after agent changes
- Review diffs - don't trust "task complete"
- Check for unintended modifications
- Verify imports and dependencies resolve
- Run linters and type checkers

**Operational safeguards:**

- Protected branches prevent direct pushes
- Worktree isolation limits blast radius
- PR reviews catch what agents miss
- Tool approvals gate destructive actions

</div>

<div class="mt-4 text-sm opacity-70">

Agents are productive, not infallible. Build verification into your workflow, not after it.

</div>

<!--
Verification is not optional overhead - it's the cost of autonomy.
The more you bypass approvals, the more you must verify after the fact.
Automated checks (CI, linters, tests) are the best verification layer.
-->
