---
layout: two-cols-header
section: Coding Agent
---

# Coding Agent: Issue → PR

::left::

## The Workflow

**1. Create or assign an issue** — the issue is the prompt; include acceptance criteria and scope.

**2. Assign to @copilot** — creates a branch and starts work.

**3. Review the plan** — approve, adjust, or redirect the proposed plan.

**4. Review the PR** — inspect diffs and request changes as for any colleague.

::right::

## From VS Code

Start locally, then hand off to a cloud session:

- Plan locally; choose `Cloud` session.
- Full context transfers and cloud agent opens a PR.

## Limitations

Cloud agents — quick notes:

- Cannot: access VS Code built-ins, local runtime/tests, or local MCP servers.
- Can: use cloud MCPs, operate repository-wide, and collaborate via PR comments.

<!--
The coding agent workflow hasn't changed fundamentally,
but the VS Code integration now allows seamless handoff from local planning.
The key addition: you can plan locally and delegate to cloud.
-->
