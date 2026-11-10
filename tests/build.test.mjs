import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { course, root } from '../scripts/course.mjs'

const dist = join(root, 'dist')
const landing = readFileSync(join(dist, 'index.html'), 'utf8')
const links = [...landing.matchAll(/href="([^"]+)"/g)].map(([, href]) => href)

// How Cloudflare Pages maps a clean URL to a file in dist/.
const fileFor = path => {
  const clean = path.split(/[?#]/)[0]
  return clean.endsWith('/') ? join(dist, clean, 'index.html') : [join(dist, clean), join(dist, `${clean}.html`)].find(existsSync)
}

test('the build produces all ten decks and the landing page', () => {
  assert.equal(course.modules.length, 10)
  assert.deepEqual(course.modules.map(m => m.id), ['000', '101', '102', '103', '201', '202', '203', '301', '302', '303'])
  for (const m of course.modules) {
    const html = readFileSync(join(dist, m.id, 'index.html'), 'utf8')
    assert.match(html, new RegExp(`src="/${m.id}/assets/`), `${m.id} is built with --base /${m.id}/`)
    assert.ok(existsSync(join(dist, m.id, '1.html')), `${m.id} has static slide routes`)
    assert.ok(existsSync(join(dist, m.id, '404.html')), `${m.id} has its client-route fallback`)
  }
  assert.match(landing, /<title>GitHub Copilot: from zero to hero<\/title>/)
})

test('the landing page lists the modules in order, grouped by level, ending with the certification', () => {
  const order = [...landing.matchAll(/id="(level-\d00|module-\d{3}|certification)"/g)].map(([, id]) => id)
  assert.deepEqual(order, ['level-100', 'module-000', 'module-101', 'module-102', 'module-103', 'level-200', 'module-201', 'module-202', 'module-203', 'level-300', 'module-301', 'module-302', 'module-303', 'certification'])
  for (const m of course.modules) assert.equal(landing.includes(`href="${m.lab}"`), Boolean(m.lab), `lab link for ${m.id}`)
  assert.deepEqual(course.modules.filter(m => m.lab).map(m => m.id), ['101', '102', '103'])
})

test('every same-site link on the landing page resolves to a file in dist/', () => {
  const internal = links.filter(href => href.startsWith('/') && !href.startsWith('//'))
  assert.ok(internal.length >= 11)
  for (const href of internal) assert.ok(fileFor(href), `${href} resolves`)
})

test('every external link on the landing page answers', { skip: process.env.OFFLINE === '1' && 'OFFLINE=1' }, async () => {
  const external = [...new Set(links.filter(href => /^https?:/.test(href) && !href.includes('fonts.')))]
  for (const href of external) {
    const response = await fetch(href, { redirect: 'follow', headers: { 'user-agent': 'talk-github-copilot link check' } })
    assert.ok(response.ok, `${href} → ${response.status}`)
  }
})

test('no _redirects file shadows deck assets on Cloudflare Pages', () => {
  assert.equal(existsSync(join(dist, '_redirects')), false)
})

test('the landing page and every deck count under the shared GoatCounter account and host path', () => {
  for (const html of [landing, ...course.modules.map(m => readFileSync(join(dist, m.id, 'index.html'), 'utf8'))]) {
    assert.match(html, /window\.goatcounter\s*=\s*\{\s*path:\s*function\s*\(p\)\s*\{\s*return location\.host \+ p\s*\}/)
    assert.match(html, /data-goatcounter="https:\/\/jgcarmona-com\.goatcounter\.com\/count"/)
  }
})
