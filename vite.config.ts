import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error plain ESM build scripts without type declarations
import { course, goatcounter } from './scripts/course.mjs'
// @ts-expect-error plain ESM build scripts without type declarations
import { compileAll, compileDeck } from './scripts/decks.mjs'
// @ts-expect-error plain ESM build scripts without type declarations
import { renderFooter, renderHeader, renderLanding, renderLandingHead } from './scripts/landing.mjs'

const deckRoute = /^\/(\d{3})(?:\/(\d+)(?:\.html)?)?\/?(\?.*)?$/
const moduleIds = new Set(course.modules.map((m: { id: string }) => m.id))

/** Builds the course: shared page parts, the landing page, and one deck.json per module. */
function coursePlugin(): Plugin {
  let slideCounts: Record<string, number> = {}
  return {
    name: 'github-copilot-course',
    async buildStart() {
      const decks = await compileAll()
      slideCounts = Object.fromEntries(decks.map((d: { id: string; slides: unknown[] }) => [d.id, d.slides.length]))
      for (const deck of decks) this.emitFile({ type: 'asset', fileName: `${deck.id}/deck.json`, source: JSON.stringify(deck) })
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, context) {
        if (!Object.keys(slideCounts).length) slideCounts = Object.fromEntries((await compileAll()).map((d: { id: string; slides: unknown[] }) => [d.id, d.slides.length]))
        const page = context.path.replace(/^\//, '')
        return html
          .replace('<!--inline:theme-init-->', `<script>${readFileSync('src/theme-init.js', 'utf8')}</script>`)
          .replace('<!--goatcounter-->', goatcounter)
          .replace('<!--header-->', renderHeader(page === 'index.html' ? 'course' : null))
          .replace('<!--footer-->', renderFooter())
          .replace('<!--landing:head-->', renderLandingHead(course))
          .replace('<!--landing:body-->', renderLanding(course, slideCounts))
      },
    },
    configureServer(server) {
      // Dev server: /201/5 renders the deck app and /201/deck.json is compiled on request, so Markdown edits show on reload.
      server.middlewares.use(async (req, res, nextMiddleware) => {
        const url = req.url ?? ''
        const json = url.match(/^\/(\d{3})\/deck\.json$/)
        if (json && moduleIds.has(json[1])) {
          const deck = await compileDeck(course.modules.find((m: { id: string }) => m.id === json[1]))
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify(deck))
          return
        }
        const route = url.match(deckRoute)
        if (route && moduleIds.has(route[1])) req.url = `/deck.html${route[3] ?? ''}`
        nextMiddleware()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), coursePlugin()],
  publicDir: 'slides/public',
  server: { host: '0.0.0.0', port: 5173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 3000,
    rollupOptions: { input: { index: 'index.html', deck: 'deck.html', 404: '404.html' } },
  },
})
