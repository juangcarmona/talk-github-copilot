# GitHub Copilot: from zero to hero

A practical GitHub Copilot course by Juan G. Carmona, published at [github-copilot.jgcarmona.com](https://github-copilot.jgcarmona.com). Ten modules take you from your first suggestion to running AI-assisted engineering across a team, grouped in three levels:

| Level | Modules |
|---|---|
| 100 Foundations | 000 Orientation · 101 Using Copilot Effectively · 102 Prompt Engineering · 103 Engineering Workflows with AI |
| 200 Team practice | 201 Custom Instructions · 202 Agents & Workflow Automation · 203 AI-Ready Repositories |
| 300 Scale | 301 MCP & Orchestration · 302 Spec-Driven Development · 303 AI in the SDLC |

The course ends with the [GitHub Copilot certification](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot). Modules 101, 102 and 103 have hands-on labs in their own repositories ([101](https://github.com/juangcarmona/github_copilot_101_copilot_basics), [102](https://github.com/juangcarmona/github_copilot_102_prompting), [103](https://github.com/juangcarmona/github_copilot_103_validation_testing_prs)).

This repository owns the course: the Slidev decks, the Plain Concepts Chapters theme and the landing page. They were brought over from [github_copilot_000_hub](https://github.com/juangcarmona/github_copilot_000_hub) unchanged, apart from one image path in `slides/pages/203/why-ai-ready.md` that broke `slidev build`.

## URLs

Every module has a stable URL that can be linked from a learning catalogue:

- `/` lists the course.
- `/201/` opens a deck and `/201/5` opens slide 5. Both survive a refresh and can be shared.
- `/201/presenter/5`, `/201/overview` and other Slidev routes also work after a refresh.

## Run locally

Requires Node.js 24 or newer.

```sh
npm ci --ignore-scripts
npm run build
npm run preview
```

`npm run preview` serves `dist/` at http://127.0.0.1:8788 with Wrangler's Cloudflare Pages emulator, so routing behaves as in production.

To edit one deck with live reload, run `npm run dev -- 201`. To rebuild only some decks into an existing `dist/`, run `node scripts/build.mjs 201 302`.

`npm test` checks the built site. The first run needs `npx playwright install chromium`, and `OFFLINE=1 npm test` skips the external link check.

## Source map

- `course/modules.json`: the course. It holds titles, levels, what each module covers, audience, time and labs, and is the single source for the landing page, the build and the tests.
- `slides/`: one Slidev deck per module (`copilot-<id>.md`), its pages in `pages/<id>/` and its images in `public/<id>/`. `slides/index.html` adds GoatCounter to every deck.
- `packages/slidev-theme-chapter-plain/`: the Plain Concepts Chapters Slidev theme, linked into `node_modules`.
- `site/`: landing page styles and the site-wide 404 page. The landing HTML is rendered by `scripts/landing.mjs`.
- `scripts/build.mjs`: builds each deck with `slidev build --base /<id>/` into `dist/<id>/`, then renders the landing page.
- `scripts/verify-static.mjs`: runs after the build. It fails if a deck, slide route, landing link, referenced asset or GoatCounter snippet is missing.
- `tests/`: build and link checks (`node:test`), plus a Playwright smoke test of the landing page and one deck.
- `.github/`: Copilot instructions, agents and prompts for authoring slides.

### How deep links work on Cloudflare Pages

Slidev uses history routing, so `/201/5` has to return the deck's HTML. On Cloudflare Pages a `_redirects` rewrite also applies to files that exist, which would serve HTML in place of the deck's JavaScript and images. Slidev's own `/201/* /201/index.html 200` rule is also rejected as a loop. The build therefore writes static files instead:

- `dist/201/<n>.html` for every slide, which Pages serves at `/201/<n>` with status 200.
- The deck's `404.html` (the same app), which Pages uses for any other route under `/201/`.

`dist/` must not contain a `_redirects` file, and the tests check that.

## Add a module

1. Add the deck as `slides/copilot-<id>.md`, with its pages in `slides/pages/<id>/` and images in `slides/public/<id>/`. Reference images as `/<id>/image.png`, never with `./public/…`.
2. Add an entry to `course/modules.json` with `id`, `level`, `deck`, `title`, `covers`, `audience`, `time` and, if it has one, `lab`. Modules appear in file order within their level.
3. Update the expected module list in `tests/build.test.mjs`.
4. Run `npm run build && npm test`.

## Publish

`npm run build` writes a self-contained static site to `dist/`. Configure the Cloudflare Pages project with:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm ci --ignore-scripts && npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=24` |

Then attach `github-copilot.jgcarmona.com` as a custom domain. `dist/_headers` gives hashed deck assets a one-year immutable cache.

## Analytics

The landing page and every deck count visits under the shared GoatCounter account (`jgcarmona-com`), keyed by host, as in talk-se2 and talk-aligned. GoatCounter uses no cookies. To remove it, delete the snippet from `scripts/course.mjs` and `slides/index.html`, along with the matching checks.
