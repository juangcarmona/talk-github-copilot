---
layout: default
section: Discoverability
---

# Repository Discoverability

## What discoverable means

A discoverable repository lets readers (human or machine) answer: what the project does, where to find code, and where decisions live — from the file tree alone.

## Key files and locations

- `README.md` — project purpose and quick start
- `ARCHITECTURE.md` — system map, layers, and rules
- `docs/adr/` — decisions: what, why, alternatives
- `SETUP.md` / `Makefile` — how to run or build

## Discoverability checklist

```markdown
✓ README.md explains purpose in first paragraph
✓ ARCHITECTURE.md maps layers and rules
✓ docs/adr/ contains numbered decisions
✓ Folder names reflect domain concepts
✓ Entry points and setup are obvious
```

---

## Anti-patterns

- Implicit knowledge kept in people's heads
- Configuration or conventions outside the repo
- Generic file names that hide intent

Make implicit knowledge explicit by adding small guiding docs where the project structure needs explanation.
