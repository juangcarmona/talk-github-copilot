---
layout: two-cols-header
section: Context
---

# Your Repository Is Context

### Copilot responds to the repository it sees - not just the prompt you type

::left::

<div class="text-sm">

| Repository signal | AI behavior |
|---|---|
| Consistent naming | Follows conventions |
| Stale docs | Follows outdated patterns |
| Competing implementations | Picks randomly |

</div>

::right::

> The repository is part of the prompt.

<!--
Conceptual bridge — Modules 201 and 203 own repository governance.

The table shows three signals:
- Consistent naming → Copilot follows conventions
- Stale docs → Copilot follows outdated patterns
- Competing implementations → Copilot picks randomly

Names, structure, tests, and documentation all shape Copilot output
before you even type a prompt. The repository is part of the prompt.

Teams can define always-on conventions through repository-level instruction
files — covered in Modules 201 and 203.

Example: if your codebase has both pricing.js and priceCalculator.js,
Copilot will import one of them — and which one depends on open tabs.

Transition: "So the repo shapes output. Let's move to the core prompting techniques."
-->