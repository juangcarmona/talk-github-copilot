---
layout: default
section: Security
---

# Prompt Injection - Mitigations

VS Code provides layered defenses against prompt injection:

- **Two-step URL approval** - review content after fetch, before it enters context
- **Tool approval** - destructive actions still prompt unless explicitly bypassed
- **Agent sandboxing** - even if injected, commands can't escape the sandbox
- **Workspace Trust** - untrusted projects disable agents entirely

<br/>

**Defense in depth:** no single layer is sufficient. Together they make exploitation significantly harder.

<!--
The defense is layered: approvals + sandboxing + workspace trust + parameter review.
No single mitigation is bulletproof - the combination is what matters.
Remind attendees: always inspect tool parameters before approving.
-->
