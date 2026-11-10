---
layout: default
section: How It Works
---

# How Copilot Sees Your Code

VS Code assembles a **context window** — everything the model can reason about.

<v-clicks>

1. **System instructions** — built-in behavior rules
2. **Custom instructions** — your `.github/copilot-instructions.md`
3. **Your message** — the prompt you just typed
4. **Conversation history** — what you've discussed so far
5. **Implicit context** — active file, selection, errors
6. **Explicit references** — `#file`, `#codebase`, `#fetch`
7. **Tool outputs** — search results, terminal output

</v-clicks>

<div class="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-sm">

The model can only reason about what's inside this window. Everything else is **invisible**.

</div>

<div class="mt-4 text-sm">
  <strong>Live Demo:</strong> <a href="https://ashy-dune-0b4215a0f.7.azurestaticapps.net/" target="_blank">Token Optimization</a>
</div>

<!--
This is the single most important mental model for working with Copilot effectively.

If you understand that the model only sees what's in the context window, you understand:
- why adding #file references improves answers
- why vague prompts get vague results
- why starting a new session for a new task matters
-->
