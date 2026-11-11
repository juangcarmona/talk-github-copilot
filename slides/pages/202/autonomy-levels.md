---
layout: default
section: Autonomy & Permissions
---

# **Permission Levels:** Controlling Autonomy

<div class="text-sm">

| Level | Tool Calls | Errors | Questions | Use When |
|---|---|---|---|---|
| **Default Approvals** | Ask before running | Manual retry | Asks you | Exploring, sensitive code |
| **Bypass Approvals** | Auto-approve all | Auto-retry | Asks you | Trusted tasks, worktree isolation |
| **Autopilot** (Preview) | Auto-approve all | Auto-retry | Auto-responds | Fire-and-forget, well-scoped tasks |

</div>

<div class="mt-6">

### Escalation path

```
Default Approvals → Bypass Approvals → Autopilot
     (safest)          (productive)       (autonomous)
```

</div>

<div class="mt-4 text-sm opacity-70">

**Worktree + Bypass Approvals** is the default for Copilot CLI sessions - safe autonomy through isolation. Autopilot removes ALL human checkpoints - use only for well-defined, low-risk tasks.

</div>

<!--
The permission level applies per session - you can change it mid-session.
Autopilot consumes premium requests continuously until the task is done.
Organizations can enforce specific levels via device management policies.
-->
