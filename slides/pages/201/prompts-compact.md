---
layout: two-cols-header
section: Prompt Files
---

# Prompt Files

::left::

Invoke in Chat with `/command-name`. Not automatic - you call them explicitly.

```markdown
---
name: 'scaffold-endpoint'
description: 'Add a new API endpoint'
agent: 'agent'
tools: ['search/codebase']
---
Add a new REST endpoint for ${input:resource}.
Follow the patterns in [the API layer](../src/api/).
Apply all instructions from .github/copilot-instructions.md.
```

::right::

| | Instructions | Prompt Files |
|---|---|---|
| Applied | Automatically | On demand |
| Purpose | Standards | Workflows |
| Invoke | - | `/name` in Chat |

**Use for:**
- Scaffolding (component, endpoint, migration)
- Code review workflows
- PR summary generation

**Not a replacement for instructions.** A prompt file without a governed repo produces inconsistent results.

<!--
Prompt files are workflow automation on top of the instruction foundation.
Instructions govern every response. Prompt files automate specific repeated tasks.
-->
