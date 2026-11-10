---
layout: center
section: Instructions vs Prompts
---

# Next: **Instructions vs Prompt Files**

<div class="text-sm">

| | **Instructions** | **Prompt Files** |
|---|---|---|
| **When applied** | Automatically (always-on or pattern-matched) | Manually invoked via `/command` |
| **Purpose** | Encode standards and conventions | Automate specific workflows |
| **Scope** | Every matching interaction | One interaction when called |
| **Analogy** | Team constitution | Team playbook |
| **Example** | "Use async/await, never callbacks" | "Scaffold a new API endpoint" |
| **Changes** | All Copilot output | One specific task |

</div>

<div class="mt-6 text-center text-lg font-semibold">

First govern the default. Then automate the plays.

</div>

<!--
This is the most common confusion teams have.

Instructions = always-on governance. They shape every single response.
Prompt files = on-demand workflows. They encode a multi-step recipe you invoke deliberately.

The order matters:
1. First: establish instructions (the standards Copilot follows by default)
2. Then: create prompt files that BUILD ON those instructions for specific tasks

A prompt file without good instructions underneath produces inconsistent results.
-->
