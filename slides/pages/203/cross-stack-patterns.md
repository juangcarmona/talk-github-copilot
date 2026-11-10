---
layout: two-cols-header
section: Cross-Stack Patterns
---

# AI-Ready Repositories Across Stacks

::left::

## Modern Monorepos
Scoped instructions by workspace:
```
.github/instructions/
├── api.instructions.md
├── web.instructions.md
└── shared.instructions.md
```
Each workspace gets tailored AI behavior without duplication.

## .NET / C# Projects
Type system and XML docs are strong context signals:
```csharp
/// <summary>
/// Processes an order and returns the transaction ID.
/// </summary>
public async Task<string> ProcessOrder(Order order) { }
```
Reference the solution structure and package conventions from `README.md` and `ARCHITECTURE.md`.

::right::

## Legacy & COBOL Systems

Documentation-poor systems benefit from small, discoverable docs that explain structure and constraints (README, ARCHITECTURE.md, or docs/). These files give context where implicit knowledge is missing.

## Power Platform

Use API specs, governance rules, and Dataverse schema docs as explicit context.

<div class="mt-4 text-sm opacity-70">The AI-ready patterns are the same across stacks. The investment pays higher dividends where documentation is scarce.</div>

<!--
This slide broadens the module beyond TypeScript/React examples.

Key message: the patterns are universal. The urgency is higher for legacy and heterogeneous stacks, because those teams benefit most from small, discoverable docs that replace missing tribal knowledge.

This directly serves the mixed-audience workshop requirement.
-->
