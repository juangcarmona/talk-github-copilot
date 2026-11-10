---
layout: two-cols-header
section: Custom Agents
---

# Custom Agent Profiles

::left::

## File location

```
.github/
  copilot-instructions.md      ← always loaded
  agents/
    documenter.agent.md
    security-reviewer.agent.md
    onboarder.agent.md
```

## What they define

```markdown
---
name: documenter
description: Generates API documentation
tools: [read_file, create_file, create_pull_request]
---

You are a documentation specialist for
the festival-platform API...
```


::right::


## Key fields

| Field | Purpose |
|---|---|
| `name` | How you invoke it (`@documenter`) |
| `description` | What the agent does |
| `tools` | Allowed tool list |
| `instructions` | System prompt / persona |

## Works across all surfaces

Custom agents work with:
- ✅ Local agent sessions
- ✅ Copilot CLI (background)
- ✅ Cloud agent sessions

<!--
Custom agents encode team expertise into reusable, invocable profiles.
They share instructions with the hierarchy from module 201.
Enable for CLI with: github.copilot.chat.cli.customAgents.enabled
-->