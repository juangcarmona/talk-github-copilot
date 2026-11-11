---
layout: default
section: Tool Types
---

# The Tools Picker

Select which tools are available for each request. More tools ≠ better results.

<div class="flex justify-center mt-4">
  <img src="/301/chat-tools-picker.png" class="rounded shadow-lg max-h-80" />
</div>

- Enable only the tools relevant to your current task
- Use `tools:` in prompt files to scope tools per workflow
- Enterprise policies can restrict which tools are available

<!--
This connects to the scoping slide in using-mcp.md.
The tools picker is how you maintain control at the request level.
The prompt file `tools:` directive is how you maintain control at the workflow level.
Both reduce noise and improve agent behavior.
Fewer enabled tools → fewer hallucinated tool calls.
-->
