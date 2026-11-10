---
layout: default
section: Security
---

# Sandbox Configuration

Enable sandboxing per server in `mcp.json`:

```json
{
  "servers": {
    "myServer": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": { "allowWrite": ["${workspaceFolder}"] },
        "network": { "allowedDomains": ["api.example.com"] }
      }
    }
  }
}
```

- `allowWrite` - only these paths are writable; everything else is kernel-denied
- `allowedDomains` - only these domains are reachable

<div class="mt-3 text-sm opacity-70">Available on macOS and Linux (WSL2 on Windows). Not yet supported natively on Windows.</div>

<!--
The sandbox config is simple: declare what's allowed, everything else is denied.
${workspaceFolder} is the typical write scope - your project files only.
-->
