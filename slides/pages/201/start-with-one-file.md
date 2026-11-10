---
layout: two-cols-header
section: Custom Instructions
---

# Start with One File

### Begin simple. Expand only when needed.

::left::

## Step 1 - Root Instructions

```text
.github/copilot-instructions.md
```

Applies to the entire repository.

```markdown
- Use async/await
- Never hardcode credentials
- Use xUnit for backend tests
```

## Fastest Start

```text
/init
```

Generates a starter file from your project.

::right::

## Step 2 - Scoped Instructions

```text
.github/instructions/
  backend.instructions.md
  frontend.instructions.md
  tests.instructions.md
```

```yaml
---
applyTo: "src/api/**/*.cs"
---
```

Use scoped files only when different parts of the repo need specialized rules.

## Step 3 - Prompt Files

Use prompt files for repeated workflows.

> Instructions first. Prompt files second.

