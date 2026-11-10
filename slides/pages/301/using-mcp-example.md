---
layout: default
section: Orchestration
---

# Team `mcp.json` Example

Your team's tool configuration is a repo artifact:

```json
// .vscode/mcp.json (commit this)
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

- New team members clone the repo → same tools, same workflows
- Each server still requires individual trust approval before running

<!--
This is the concrete mcp.json example split from the concept slide.
Keep JSON readable - this is what attendees will replicate.
The key point: configuration is shared, but trust is personal.
-->
