---
layout: default
section: How It Works
---

# Workspace Indexing

How does `#codebase` find relevant code in a large project?

<div class="grid grid-cols-3 gap-6 mt-6">

<div class="p-4 border border-gray-300 rounded">

### Remote Index
GitHub-hosted search for repos on GitHub. Fast, scales to large codebases.

</div>

<div class="p-4 border border-gray-300 rounded">

### Local Index
Semantic index on your machine. Works offline, good accuracy.

</div>

<div class="p-4 border border-gray-300 rounded">

### Basic Fallback
Simple text matching. Used when other indexes aren't available.

</div>

</div>

<div class="mt-8">

### What this means for you

- **Open relevant files** — open tabs improve context quality
- **Use `#file` when you know exactly what's needed** — more precise than search
- **Use `#codebase` when exploring** — lets the index find relevant snippets
- **Workspace size matters** — smaller, focused workspaces produce better results

</div>


<!--
This slide demystifies the "magic" of @workspace and #codebase.

It's not reading every file every time — it's searching an index.
The quality of that index determines how well broad queries work.

For workshop attendees: this explains why AI-ready repositories (203) matter.
A well-structured repo with clear file names and focused modules indexes better.
-->
