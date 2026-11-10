// Builds every deck into dist/<id>/ and the course landing page into dist/.
// Usage: node scripts/build.mjs            (all modules)
//        node scripts/build.mjs 201 302    (only these decks; the landing page is always rebuilt)
import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { load } from '@slidev/parser/fs'
import { course, root } from './course.mjs'
import { renderLanding } from './landing.mjs'

const dist = join(root, 'dist')
const only = process.argv.slice(2)
const modules = only.length ? course.modules.filter(m => only.includes(m.id)) : course.modules
if (only.length && modules.length !== only.length) throw Error(`Unknown module in: ${only.join(', ')}`)

if (!only.length) rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

const slidev = join(root, 'node_modules', '.bin', 'slidev')
for (const m of modules) {
  const out = join(dist, m.id)
  rmSync(out, { recursive: true, force: true })
  console.log(`\n▶ Building ${m.id} (${m.deck}) → /${m.id}/`)
  const run = spawnSync(slidev, ['build', join(root, m.deck), '--base', `/${m.id}/`, '--out', out], { cwd: root, stdio: 'inherit' })
  if (run.status !== 0) throw Error(`slidev build failed for ${m.id}`)
  // Slidev's _redirects (/201/* /201/index.html 200) is a Netlify rule: Cloudflare Pages rejects it as a
  // loop, and any working rewrite there would also shadow the deck's JS and images. Instead, each slide
  // gets a real file: Pages serves /201/5 from 201/5.html with a 200. Other client routes
  // (/201/presenter/5, /201/overview) fall back to the deck's own 404.html, which is the same app.
  rmSync(join(out, '_redirects'), { force: true })
  const html = readFileSync(join(out, 'index.html'), 'utf8')
  const { slides } = await load(dirname(join(root, m.deck)), join(root, m.deck))
  for (let no = 1; no <= slides.length; no++) writeFileSync(join(out, `${no}.html`), html)
  console.log(`  ${slides.length} slide routes: /${m.id}/1 … /${m.id}/${slides.length}`)
}

// Landing page and static site files.
writeFileSync(join(dist, 'index.html'), renderLanding(course))
cpSync(join(root, 'site'), dist, { recursive: true })

// Hashed build assets never change; everything else revalidates.
writeFileSync(join(dist, '_headers'), `${course.modules.map(m => `/${m.id}/assets/*\n  Cache-Control: public, max-age=31536000, immutable`).join('\n')}\n`)

console.log(`\n✓ Built ${modules.length} deck(s) and the landing page into dist/`)
