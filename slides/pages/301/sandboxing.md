---
layout: default
section: Security
---

# Agent Sandboxing

OS-level isolation that restricts what agent-executed processes can access - regardless of approval.

```mermaid
flowchart LR
  CMD["Agent Command"]
  CMD --> FS["✅ Allowed Paths"]
  CMD --> NET["✅ Allowed Domains"]
  CMD -.-x B1["❌ ~/.ssh/"]
  CMD -.-x B2["❌ ~/.aws/"]
  CMD -.-x B3["❌ *.malicious.com"]
```

**Key insight:** sandboxing shifts from "ask before doing" to **"can't do even if approved."**

When sandboxing is enabled, tool calls are auto-approved - because they physically cannot escape the sandbox.

<div class="mt-3 text-sm opacity-70">Available on macOS and Linux (WSL2 on Windows).</div>

<!--
This is the strongest protection available.
This is what enables safe Autopilot usage.
Kernel-level deny means even a compromised agent can't read SSH keys or cloud credentials.
-->
