// Compiles the Markdown decks in slides/ into the data the deck engine renders.
// The Markdown keeps the Slidev authoring format (--- separators, frontmatter, src: imports,
// ::slot:: markers, <v-clicks>), so the content is not rewritten. Speaker notes (HTML comments)
// are dropped here and never reach the published site.
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import MarkdownIt from 'markdown-it'
import { createHighlighter } from 'shiki'
import { parse as parseYaml } from 'yaml'
import { course, root } from './course.mjs'

const SLOTS = ['left', 'right', 'before', 'after']

/** Splits a Slidev Markdown file into { frontmatter, body } slides, ignoring --- inside code fences. */
export function splitSlides(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const slides = []
  let fence = null
  let current = { frontmatter: {}, body: [] }
  const readFrontmatter = start => {
    // A separator directly followed by YAML and a closing --- is that slide's frontmatter.
    if (lines[start] === undefined || lines[start].trim() === '') return null
    const end = lines.findIndex((line, k) => k >= start && line.trim() === '---')
    if (end < 0) return null
    const block = lines.slice(start, end)
    if (!block.every(line => line.trim() === '' || /^(\s+|#|[\w-]+\s*:)/.test(line))) return null
    try {
      const data = parseYaml(block.join('\n'))
      return data && typeof data === 'object' ? { data, end } : null
    } catch { return null }
  }
  let i = 0
  if (lines[0]?.trim() === '---') {
    const fm = readFrontmatter(1)
    if (fm) { current.frontmatter = fm.data; i = fm.end + 1 } else i = 1
  }
  for (; i < lines.length; i++) {
    const line = lines[i]
    const marker = line.match(/^\s*(`{3,}|~{3,})/)
    if (marker) fence = fence === null ? marker[1] : line.trim().startsWith(fence) ? null : fence
    if (fence === null && line.trim() === '---') {
      slides.push(current)
      current = { frontmatter: {}, body: [] }
      const fm = readFrontmatter(i + 1)
      if (fm) { current.frontmatter = fm.data; i = fm.end }
      continue
    }
    current.body.push(line)
  }
  slides.push(current)
  return slides.map(s => ({ frontmatter: s.frontmatter, body: s.body.join('\n') }))
}

/** Resolves src: imports the way Slidev does: the importing slide's frontmatter applies to the first imported slide. */
export function loadDeckSlides(entry) {
  const [head, ...rest] = splitSlides(readFileSync(entry, 'utf8'))
  const expand = (slide, from) => {
    const { src, ...frontmatter } = slide.frontmatter
    if (!src) return [slide]
    const file = resolve(dirname(from), src)
    const imported = splitSlides(readFileSync(file, 'utf8')).flatMap(s => expand(s, file))
    imported[0] = { ...imported[0], frontmatter: { ...imported[0].frontmatter, ...frontmatter } }
    return imported
  }
  const slides = [head, ...rest].flatMap(slide => expand(slide, entry))
  return { headmatter: head.frontmatter, slides: slides.filter(s => s.body.trim() || Object.keys(s.frontmatter).length) }
}

let highlighter
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['csharp', 'typescript', 'javascript', 'json', 'jsonc', 'yaml', 'bash', 'shell', 'powershell', 'markdown', 'html', 'css', 'python', 'sql', 'diff', 'xml', 'tsx', 'jsx', 'toml', 'dockerfile'],
  })
  return highlighter
}

const escapeHtml = text => text.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

async function createRenderer() {
  const shiki = await getHighlighter()
  const loaded = new Set(shiki.getLoadedLanguages())
  const md = new MarkdownIt({ html: true, linkify: false, typographer: false })
  md.options.highlight = (code, info) => {
    const lang = (info || '').trim().split(/\s+/)[0].replace(/\{.*$/, '').toLowerCase()
    if (lang === 'mermaid') return `<div class="mermaid-block" data-mermaid>${escapeHtml(code)}</div>`
    const alias = { cs: 'csharp', 'c#': 'csharp', ts: 'typescript', js: 'javascript', sh: 'bash', ps1: 'powershell', yml: 'yaml', md: 'markdown', py: 'python' }[lang] ?? lang
    return shiki.codeToHtml(code, { lang: loaded.has(alias) ? alias : 'text', themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false })
  }
  // markdown-it wraps highlighter output that is not a <pre> (the Mermaid source) in <pre><code>; unwrap it.
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const out = fence(tokens, idx, options, env, self)
    return out.includes('data-mermaid') ? out.replace(/^<pre><code[^>]*>/, '').replace(/<\/code><\/pre>\n?$/, '\n') : out
  }
  // External links open in a new tab; the deck keeps its position.
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = tokens[idx].attrGet('href') ?? ''
    if (/^https?:/.test(href)) { tokens[idx].attrSet('target', '_blank'); tokens[idx].attrSet('rel', 'noopener') }
    return self.renderToken(tokens, idx, options)
  }
  return md
}

/** Renders one Markdown part, turning <v-clicks> lists into stepped reveals. Returns { html, steps }. */
function renderPart(md, source, startStep) {
  let steps = startStep
  const parts = source.split(/<v-clicks>|<\/v-clicks>/)
  const html = parts.map((chunk, k) => {
    const out = md.render(chunk)
    if (k % 2 === 0) return out
    // Each top-level item of a v-clicks list appears on its own step.
    let depth = 0
    return out.replace(/<(\/?)(ul|ol|li)(\s[^>]*)?>/g, (tag, close, name, attrs = '') => {
      if (name !== 'li') { depth += close ? -1 : 1; return tag }
      if (close || depth !== 1) return tag
      steps += 1
      return `<li data-at="${steps}"${attrs}>`
    })
  }).join('')
  return { html, steps }
}

const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }
const textOf = html => html.replace(/<[^>]+>/g, '').replace(/&(amp|lt|gt|quot|#39);/g, e => entities[e]).replace(/\s+/g, ' ').trim()

export async function compileDeck(module) {
  const md = await createRenderer()
  const entry = join(root, module.deck)
  const { headmatter, slides } = loadDeckSlides(entry)
  const compiled = slides.map((slide, index) => {
    const fm = slide.frontmatter
    const body = slide.body.replace(/<!--[\s\S]*?-->/g, '')
    const [main, ...slotted] = body.split(/^::(\w+)::[ \t]*$/m)
    const html = {}
    let steps = 0
    ;({ html: html.main, steps } = renderPart(md, main, steps))
    for (let k = 0; k < slotted.length; k += 2) {
      const name = slotted[k]
      if (!SLOTS.includes(name)) throw Error(`${module.deck} slide ${index + 1}: unknown slot ::${name}::`)
      ;({ html: html[name], steps } = renderPart(md, slotted[k + 1], steps))
    }
    const heading = html.main.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/g)
    return {
      layout: fm.layout ?? (index === 0 ? 'cover' : 'default'),
      section: fm.section ?? null,
      title: heading ? textOf(heading[heading.length > 1 && (fm.layout ?? '').includes('cover') ? 1 : 0]) : (fm.section ?? `Slide ${index + 1}`),
      beforeTitle: fm.beforeTitle ?? null,
      afterTitle: fm.afterTitle ?? null,
      image: fm.image ?? null,
      html,
      steps,
    }
  })
  // Every deck closes on the author, then points to the next module.
  compiled.push({ layout: 'author', section: 'Your instructor', title: course.author.name, beforeTitle: null, afterTitle: null, image: null, html: { main: '' }, steps: 0 })
  const order = course.modules.findIndex(m => m.id === module.id)
  const neighbour = m => m && { id: m.id, title: m.title }
  return {
    id: module.id,
    title: module.title,
    deckTitle: headmatter.title ?? module.title,
    course: course.title,
    author: course.author,
    previous: neighbour(course.modules[order - 1]),
    next: neighbour(course.modules[order + 1]),
    certification: order === course.modules.length - 1 ? course.certification : null,
    slides: compiled,
  }
}

export async function compileAll() {
  return Promise.all(course.modules.map(compileDeck))
}
