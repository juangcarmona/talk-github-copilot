---
layout: two-cols-header
section: Custom Instructions
---

# Scoped Instructions Example

## Scoped files specialize the root instructions

::left::

`.github/instructions/react.instructions.md`

```yaml
---
applyTo: "src/**/*.tsx"
---
```

```markdown
- Use React functional components
- Use TypeScript strict mode
- Use PascalCase for components
```

::right::

```
Root instructions
  └── Backend rules   (src/**/*.cs)
  └── Frontend rules  (src/**/*.tsx)
  └── Test rules      (**/*.test.*)
```

<div class="mt-8 text-xl font-semibold text-center">

Specialize. Never contradict.

</div>

<!--
The applyTo pattern activates the file only when Copilot is working on matching paths.
Scoped files ADD detail to the root - they never override or contradict it.
-->
