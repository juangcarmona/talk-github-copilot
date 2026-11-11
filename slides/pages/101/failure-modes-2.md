---
layout: default
section: Pitfalls
---

# Beginner Failure Modes (2/2)

### ❌ The One-Shot Expectation
Expecting a perfect implementation from a single prompt.

**Fix:** Break tasks into small steps. Iterate.

### ❌ The Stale Context
Asking follow-up questions in a long, divergent conversation.

**Fix:** Start new sessions for new tasks.

### ❌ The Missing Reference
`"Update the database schema"` - which database? which schema?

**Fix:** Use `#file` to attach what Copilot needs to see.

<div class="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-sm">

The fix is almost always the same: **provide better context, be more specific, review the output.**

</div>

<!--
These patterns set up the prompting cornerstones that come next (in Module 102).
-->
