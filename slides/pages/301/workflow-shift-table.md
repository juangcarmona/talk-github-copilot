---
layout: default
section: Workflow Shift
---

# What Changes - Before vs After MCP

| Capability | Without MCP | With MCP |
|---|---|---|
| **Context** | Open files only | Any connected system |
| **Actions** | Edit code, run terminal | Create PRs, trigger builds, fetch specs |
| **Validation** | Manual | Agent runs tests, checks CI |
| **Workflow** | One step at a time | Multi-step orchestration |

<br/>

The shift is not "more features." It's a different **operating model**:

- The agent reads from source-of-truth systems, validates its own work, and delivers results
- You review and approve - not manually execute

<!--
This is the companion slide to the workflow shift diagram.
The table makes the shift concrete and measurable.
Operating model change: agent reads requirements from issue tracker, validates via test runner and CI, delivers via PRs. Developer reviews and approves.
-->
