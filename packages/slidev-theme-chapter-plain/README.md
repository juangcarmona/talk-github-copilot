# slidev-theme-plain

A Slidev theme with Plain Concepts brand identity.

## Usage

```md
---
theme: plain
layout: main-cover-1
background: /your-cover.jpg
---

# Plain Concepts

## Your Presentation Title

Supporting description
```

## Layouts

| Layout            | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `cover`           | Alias for `main-cover-2` (Slidev auto-assigns to slide 1) |
| `main-cover-1`    | Photo cover with background image and gradient overlay    |
| `main-cover-2`    | Dark navy cover with geometric dot pattern                |
| `agenda`          | Split navy/blue panel with numbered agenda items          |
| `default`         | Standard content with staggered motion                    |
| `statement`       | Minimal section intro with bold title and section label   |
| `quote`           | Dark navy full-bleed for impactful quotes                 |
| `comparison`      | Before/after two-column layout                            |
| `section-divider` | Blue/white split panel for phase intros                   |
| `two-cols-header` | Header + two columns                                      |
| `cards`           | Grid of frontmatter-defined cards                         |
| `topics`          | Grid of topics with icons and badges                      |
| `timeline`        | Vertical timeline with year cards                         |
| `list`            | Styled numbered list items                                |
| `table`           | Styled markdown table                                     |

## Features

- **Global footer** with page number badge and Plain Concepts logo on every slide
- **Section label pattern** - blue accent bar + uppercase label (used by `statement`, `section-divider`)
- **Staggered animations** on all layouts via `@vueuse/motion`
- **PPT brand palette** - Open Sans, #3D5AFE blue, #0F1729 navy
