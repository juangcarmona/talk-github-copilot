---
layout: default
section: Context
---

# Attach Context Explicitly

<div class="grid grid-cols-2 gap-8">
<div class="leading-snug">

**#-mentions**

Type `#` in chat to attach specific context:

- `#file:auth.ts` — a specific file
- `#folder:src/services` — a directory
- `#symbol:UserService` — a class or function
- `#codebase` — let VS Code search relevant files
- `#git` — recent source control changes

</div>
<div>

<img src="/102/copilot-chat-view-attach-context.png" class="w-full object-contain rounded shadow" />

</div>
</div>

<!--
The image shows the attach context picker in VS Code Chat.

Don't hope Copilot finds the right file — tell it. Explicit > implicit, always.

When to use explicit attachment:
- Questions about specific code
- You need the current version, not a cached/stale one
- The relevant file is not already open in a tab

This is the most direct way to improve Copilot output: give it exactly what it needs.
Automatic context gathering works, but explicit attachment removes ambiguity.

Demo: type # in chat, walk through the picker. Show #file, #folder, #symbol, #codebase.
Emphasize that #codebase uses VS Code's workspace index — good for discovery,
but explicit #file is better when you know what you need.

Transition: "Context matters at the prompt level and at the repository level."
-->
