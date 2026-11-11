# GitHub Copilot: from zero to hero

A practical GitHub Copilot course by [Juan G. Carmona](https://jgcarmona.com), published at [github-copilot.jgcarmona.com](https://github-copilot.jgcarmona.com). Ten modules take you from your first suggestion to running AI-assisted engineering across a team:

| Group | Modules |
|---|---|
| 0 Start here | 000 Workshop Orientation |
| 100 Foundations | 101 Using Copilot Effectively · 102 Prompt Engineering · 103 Engineering Workflows with AI |
| 200 Team practice | 201 Custom Instructions · 202 Agents & Workflow Automation · 203 AI-Ready Repositories |
| 300 Scale | 301 MCP & Orchestration · 302 Spec-Driven Development · 303 AI in the SDLC |
| Final step | [GitHub Copilot certification](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot) |

Modules 101, 102 and 103 have hands-on labs in their own repositories ([101](https://github.com/juangcarmona/github_copilot_101_copilot_basics), [102](https://github.com/juangcarmona/github_copilot_102_prompting), [103](https://github.com/juangcarmona/github_copilot_103_validation_testing_prs)).

The slide content came from [github_copilot_000_hub](https://github.com/juangcarmona/github_copilot_000_hub), where it was written for Slidev. This repository keeps that Markdown as written and renders it with its own deck engine, in the jgcarmona.com brand.

## URLs

Every module and slide has a stable, shareable URL:

- `/` is the course.
- `/201/` opens module 201, and `/201/5` opens its fifth slide. Both survive a refresh.
- `?presenter` opens the speaker view (or press `P`), `?print` lays out every slide for printing to PDF, and `?embed` shows one still slide.

In a deck: `→`/Space next, `←` back, `O` all slides, `F` full screen, `B` blackout. Click the right two thirds of the slide to go forward and the left third to go back, or swipe on a phone.

## Run locally

Requires Node.js 24 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run preview
```

`npm run preview` serves `dist/` at http://127.0.0.1:8788 with Wrangler's Cloudflare Pages emulator, so routing behaves as in production. Add `--ip 0.0.0.0` to open it from another device on the network.

To edit with live reload, run `npm run dev` and open http://localhost:5173/201/. The deck Markdown is recompiled on every reload.

`npm test` runs the unit, compiler and build checks, then Playwright. The browser tests check the landing page with axe in light and dark, deep links, reveals, and that every slide of every module fits its sheet. The first run needs `npx playwright install chromium`. `OFFLINE=1 npm test` skips the external link check.

## Source map

- `course/modules.json`: the course. It holds groups, titles, what each module covers, audience, time, labs, the certification and the instructor. It is the single source for the landing page, the decks and the tests.
- `slides/`: one deck per module (`copilot-<id>.md`), its pages in `pages/<id>/` and images in `public/<id>/`. Speaker notes are the HTML comments at the end of each page; they are never published.
- `scripts/decks.mjs`: compiles the Markdown into `deck.json` at build time. It understands the authoring format the decks use: `---` slides with frontmatter, `src:` imports, `::left::`/`::right::`/`::before::`/`::after::` slots, `<v-clicks>` reveals, Shiki code and Mermaid diagrams.
- `src/deck/`: the deck engine (React). It has a fixed 980×552 sheet scaled to the screen, URL and keyboard navigation (`nav.ts`), overview, presenter, print and embed modes, and the instructor slide that closes every module.
- `src/styles/`:
  - `brand.css`: the jgcarmona.com site layer on top of [`@juangcarmona/lighthouse-ui`](https://www.npmjs.com/package/@juangcarmona/lighthouse-ui), copied from the main site.
  - `landing.css`, `deck.css` and `slide.css`: the course on top of the site layer. `slide.css` also maps the utility classes used in the Markdown onto `--lh-*` roles.
- `index.html`, `deck.html`, `404.html`: page templates. `vite.config.ts` fills in the shared header, footer, theme script and GoatCounter, renders the landing page and emits each `deck.json`.
- `scripts/routes.mjs`: writes a static page per slide after the build. `scripts/verify-static.mjs` fails the build if a route, image or landing link is missing, or if a speaker note was published.
- `tests/`: `node:test` checks for navigation, the compiler and the built site, plus Playwright in `tests/browser/`.

### Brand

The site follows jgcarmona.com:
- Lighthouse UI semantic tokens (`--lh-*`), with Light, Dark and System stored as `lh-theme` in localStorage.
- Square corners, the 40px blueprint grid, mono uppercase eyebrows, the blue rule under titles, hard offset shadows, and the same header and footer.
- System fonts only.

Use `--lh-*` roles in new CSS, never raw colours. When the main site's `site.css` changes, bring the change into `src/styles/brand.css`.

### Dense slides

The decks were written for Slidev's spacing. When a slide does not fit the sheet, the engine shrinks that slide's content just enough to fit, down to 60 %. Wide code blocks shrink to their column the same way. Each slide's `data-fit` attribute shows its zoom; 25 slides currently use one between 0.77 and 0.99. The browser test fails if any slide still overflows.

### How deep links work on Cloudflare Pages

The deck is one app with history URLs, so `/201/5` must return the deck's HTML with a 200. On Cloudflare Pages a `_redirects` rewrite also applies to files that exist, which would replace images and scripts with HTML. The build therefore writes:

- `dist/201/<n>.html` for every slide, which Pages serves at `/201/<n>`.
- `dist/201/404.html`, the same app, for any other path under `/201/`.

`dist/` must not contain a `_redirects` file, and the tests check that.

## Add a module

1. Add the deck as `slides/copilot-<id>.md`, with its pages in `slides/pages/<id>/` and images in `slides/public/<id>/`. Reference images as `/<id>/image.png`.
2. Add an entry to `course/modules.json` with `id`, `level`, `deck`, `title`, `covers`, `audience`, `time` and, if it has one, `lab`. Modules appear in file order within their group.
3. Update the expected module list and slide counts in `tests/`.
4. Run `npm run build && npm test`.

## Publish

`npm run build` writes a self-contained static site to `dist/`. Configure the Cloudflare Pages project with:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm ci --ignore-scripts && npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=24` (also in `.nvmrc`) |

Then attach `github-copilot.jgcarmona.com` as a custom domain. `dist/_headers` gives hashed assets a one-year immutable cache.

## Analytics

The landing page and every deck count visits under the shared GoatCounter account (`jgcarmona-com`), keyed by host, as on jgcarmona.com and the other talks. GoatCounter sets no cookies. The snippet lives in `scripts/course.mjs`.
