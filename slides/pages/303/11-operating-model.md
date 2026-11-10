---
layout: default
section: Operating Model
---

# AI Operating Model

```mermaid
graph TD
    subgraph Organization
        P[Policy & Governance]
        V[Visibility & Measurement]
    end
    
    subgraph Platform
        I[Instruction Templates]
        A[Shared Agents & Skills]
        Q[Quality Gates]
    end
    
    subgraph Teams
        T1[Team workflows]
        T2[Domain agents]
        T3[Model selection]
    end
    
    P --> I
    P --> Q
    V --> P
    I --> T1
    A --> T1
    A --> T2
    Q --> T1
    T1 --> V
    T2 --> V
    T3 --> V
```


---

# AI Operating Model


<div class="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-center">

💬 **What should our organization centralize vs leave to teams?**

</div>

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div class="p-3 rounded border">
<strong>Centralize</strong><br/>
Data policy · Approved tools · Quality gates · Budget caps
</div>

<div class="p-3 rounded border">
<strong>Enable</strong><br/>
Instruction templates · Shared agents · Platform integrations
</div>

<div class="p-3 rounded border">
<strong>Decentralize</strong><br/>
Workflow design · Agent configuration · Model selection · Team conventions
</div>

</div>


<!--
The operating model answers: who owns what?

Organization level: hard constraints that apply everywhere.
Platform level: shared enablement that reduces duplication.
Team level: freedom to optimize for their domain and workflow.

This maps directly to the workshop progression:
- Modules 201–203 taught the team layer (instructions, agents, AI-ready repos)
- Modules 301–302 taught the platform layer (MCP, spec-driven development)
- Module 303 addresses the organizational layer

The feedback loop matters:
teams produce visibility data → organization refines policy → platform evolves enablement → teams benefit.

Without the loop, governance becomes stale and teams work around it.
-->
