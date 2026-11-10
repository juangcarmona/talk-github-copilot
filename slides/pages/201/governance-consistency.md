---
layout: center
section: Repository Governance
---

# Governed Repos Produce Consistent Output

<div class="grid grid-cols-2 gap-8 mt-8">
<div>

### Chaotic Repository (101-level)

```
├── server.js          ← CommonJS
├── src/
│   ├── handler.ts     ← TypeScript
│   └── utils.mjs      ← ESM
├── README.md          ← outdated
└── (no instructions)
```

**Copilot output:** mirrors whatever file is open.
Three styles, three patterns, three problems.

</div>
<div>

### Governed Repository (201-level)

```
├── .github/
│   ├── copilot-instructions.md
│   └── instructions/
│       ├── backend.instructions.md
│       └── frontend.instructions.md
├── docs/architecture/
│   └── adr-001-typescript-only.md
└── src/                ← all TypeScript
```

**Copilot output:** follows declared standards.
One team, one style, one review pass.

</div>
</div>

<!--
Side-by-side comparison showing the concrete difference.

Left: a repo without governance. Copilot has no anchor - it mimics whatever context it sees.
Right: a repo with instructions + architecture docs. Copilot follows declared standards.

This is the payoff of Module 201:
- Reduced variance in generated code
- Faster code reviews (less style discussion)
- Shorter onboarding (new devs get standards immediately)
- Higher trust in AI-assisted output

The jump from "chaotic" to "governed" in the engineering maturity model.
-->
