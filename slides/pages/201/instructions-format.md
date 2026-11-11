---
layout: two-cols-header
section: Custom Instructions
---

# Writing Effective Instructions

::left::

## Format

Optional YAML frontmatter:

<div class="text-sm">

| Field | Purpose |
|---|---|
| `description` | Short description for UI |
| `name` | Display name (defaults to filename) |
| `applyTo` | Glob pattern for auto-apply |

</div>

Body: plain Markdown. Reference tools with `#tool:<tool-name>`.

::right::

## Principles

- One rule per statement - keep each instruction self-contained
- Explain the *why*: "Use `date-fns`, not `moment.js` - moment is deprecated"
- Show examples over abstract descriptions
- Split by path rather than growing one long file

## Example

```markdown
# Project: MyApp
React 18 + TypeScript 5.4 + Vite

## Conventions
- Functional components only
- Use `zod` for validation
- Tests with Vitest
```

<!--
The most common mistake: instructions that are too long or too abstract.
Each rule should be a single, actionable statement.
If you need task-specific guidance, use prompt files instead.
-->