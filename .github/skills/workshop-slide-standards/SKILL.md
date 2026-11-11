---
name: workshop-slide-standards
description: Use when creating, reviewing, or refactoring Slidev workshop slides. Applies the workshop slide standards: one strong idea per slide, engineering workflow orientation, layout consistency, deduplication, and avoidance of feature-catalog or marketing-style content.
argument-hint: "[slide file or selected slide content]"
user-invocable: true
disable-model-invocation: false
---

# Workshop Slide Standards

Use this skill when editing slides in this GitHub Copilot workshop repository.

## Slide Structure

- Keep one strong idea per slide.
- Split overloaded slides instead of compressing unrelated ideas.
- Prefer workflows, comparisons, diagrams, and progressive disclosure over bullet walls.
- Keep titles short, explicit, and useful.
- Preserve speaker notes when they add facilitation value.

## Workshop Style

Convert:

- feature lists → engineering workflows
- command catalogs → realistic developer scenarios
- isolated tips → reusable operating patterns
- motivational claims → concrete engineering implications

## Layout Guidance

Use the existing Plain Concepts Slidev layout system.

Use these as visual references:

- `pages/subscription-efficiency/`
- `subscription-efficiency.md`

Maintain consistent:

- spacing
- typography
- section naming
- visual hierarchy
- slide density
- diagram placement

## Tone

Write for developers, architects, and tech leads.

Use:

- technical language
- pragmatic framing
- operational thinking
- clear trade-offs

Avoid:

- AI hype
- marketing tone
- shallow productivity claims
- generic motivational filler
- excessive feature enumeration

## Module Ownership

Respect module boundaries:

- 101: fundamentals
- 102: prompt engineering
- 103: validation, testing, PRs
- 201: custom instructions
- 202: agents and skills
- 203: AI-ready repositories
- 301: MCP integration
- 302: spec-driven development
- 303: enterprise adoption

Do not duplicate deep explanations across modules.