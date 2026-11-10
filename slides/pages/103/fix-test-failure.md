---
layout: default
section: Testing
---

# Diagnosing Test Failures

<div class="grid grid-cols-[1fr_1.1fr] gap-6 mt-2">
<div>

<img src="/103/copilot-chat-fix-test-failure.png" class="w-full object-contain rounded shadow" />

</div>
<div class="leading-snug">

## When a test fails after AI generation

**1. The code is wrong** → fix the implementation

**2. The test is wrong** → fix the assertion

Copilot will happily "fix" either one.
**You decide which is actually broken.**

<div class="mt-6 text-sm opacity-70">

Anti-pattern: Copilot changes the assertion to match a broken implementation. The test passes. The bug remains.

<b>Be careful, agents are lazy and will often take the path of least resistance to make the test pass.</b>

</div>

</div>
</div>

<!--
This screenshot shows the /fixTestFailure workflow in Copilot Chat.

The two-option framing is the key lesson. Without it, participants default to
"Copilot fixed it" without questioning which side was actually wrong.

Demo suggestion: deliberately break an implementation, run /fixTestFailure, and show
Copilot changing the assertion instead of the code. This is the anti-pattern.

Exercise 2 in the lab intentionally sets up this scenario.
Let participants discover it before revealing the pattern.
-->
