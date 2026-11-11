---
layout: two-cols-header
section: Chat
---

# A Coding Session with Chat

::left::

## The Workflow

**Understand** - `@workspace explain the authentication flow` / `#file:auth.ts what does this do?`

**Modify** - `add rate limiting to this endpoint` / `translate this to C#` / `/fix`

**Test** - `/tests` / `generate edge cases for this function` / `/fixTestFailure`

**Commit** - `write a commit message for these changes` / `summarize what changed`

::right::

## Interaction Patterns

**Context variables** - attach what Copilot needs to see:
`#file` `#selection` `#codebase` `#git` `#editor`

**Scope participants** - direct the question:
`@workspace` (project-wide) · `@vscode` (editor) · `@terminal` (shell) · `@github` (GitHub data)

**Slash shortcuts** - common actions:
`/explain` · `/fix` · `/tests` · `/fixTestFailure` · `/new`

<div class="mt-4 text-sm opacity-70">GitHub UX evolves - check docs for new participants and variables as they ship.</div>

<!--
This slide has two layers:
1. The workflow: how a real coding session flows (understand → modify → test → commit)
2. The interaction map: what tools you have and when to use each

The workflow layer is the primary message. The interaction map is a reference to return to during labs.

Do NOT enumerate all slash commands - the docs are the catalog. Show the patterns.
-->