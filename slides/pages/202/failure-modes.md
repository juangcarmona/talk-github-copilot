---
layout: default
section: Failure Modes
---

# Agent Failure Modes

<div class="leading-snug mt-4">

**Context loss** - agent forgets earlier conversation in long sessions

**Scope creep** - agent "improves" beyond what was asked

**Hallucinated tools** - references APIs or patterns that don't exist

**Loop errors** - retries the same failing approach repeatedly

**Incomplete work** - declares done when tests still fail

**Wrong file edits** - modifies the wrong file due to ambiguous naming

</div>

<div class="mt-6 text-sm opacity-70">

These are not edge cases - they happen regularly. The more autonomous the agent, the higher the likelihood. Design your workflow to catch them.

</div>

<!--
This is the key lesson from 103 applied to agents:
AI output requires validation regardless of how impressive it looks.
The more autonomy you grant, the more verification you need.
-->
