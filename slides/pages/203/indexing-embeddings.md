---
layout: default
section: Indexing & Embeddings
---

# Indexing, Embeddings, and Retrieval

## The Retrieval Pipeline

```
Your code files
    ↓
Chunked into segments (~100-200 lines)
    ↓
Each chunk → embedding vector
    ↓
Stored in local index
    ↓
Query → embedding → similarity search
    ↓
Top-K relevant chunks → context window
```

## What helps retrieval

- Focused files (one concept per file)
- Descriptive file names
- Clear module boundaries and docs
- Inline documentation on exports
---

## File size vs retrieval quality

Large multipurpose files produce noisy, mixed chunks; small focused files produce precise retrieval.

```
File: utils.ts (2400 lines)  -> noisy mixed chunks
File: order.validator.ts (45 lines) -> focused, precise chunk
```

Smaller, focused files = precise retrieval = better AI output.
