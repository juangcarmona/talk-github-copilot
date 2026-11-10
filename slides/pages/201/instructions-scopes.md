---
layout: two-cols-header
section: Custom Instructions
---

# Custom Instructions - Scopes

::left::

## **Repository-Wide**

`.github/copilot-instructions.md`

Applies to all Copilot requests in the repository.

- Coding standards and conventions
- Project architecture overview
- Technology stack and versions
- Common patterns to follow

::right::

## **Path-Specific**

`.github/instructions/NAME.instructions.md`

Applies only to files matching a glob pattern.

```yaml
---
applyTo: "src/components/**/*.tsx"
---
Use React functional components.
Always use TypeScript strict mode.
Follow the naming convention: PascalCase.
```

Scoped files specialize the root - they add detail, never contradict.

<!--
The scope hierarchy:
1. Repo-wide → every interaction
2. Path-specific → matched files only

Start with repo-wide, then add path-specific as your codebase grows.

Lab mapping:
- Exercise 02 - Create Root Instructions: `.github/copilot-instructions.md`
- Exercise 03 - Add Backend Instructions: `.github/instructions/backend.instructions.md`
- Exercise 04 - Add Frontend Instructions: `.github/instructions/frontend.instructions.md`
-->