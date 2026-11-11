import { useLayoutEffect, useRef, useEffect } from 'react'
import portrait from '../assets/portrait.jpg'
import { renderMermaid } from './mermaid'
import type { DeckData, Slide } from './types'

export const SHEET = { width: 980, height: 552 }
const MIN_ZOOM = 0.6

/**
 * Dense slides were written for Slidev's spacing. Instead of clipping, shrink what does not fit:
 * wide code blocks to their column, then the whole slide body to the sheet. data-fit records the zoom.
 */
export function fitContent(article: HTMLElement) {
  const body = article.querySelector<HTMLElement>('.slide-body')
  if (!body) return
  body.style.zoom = ''
  for (const pre of body.querySelectorAll<HTMLElement>('pre')) {
    pre.style.zoom = ''
    if (pre.scrollWidth > pre.clientWidth + 1) pre.style.zoom = String(Math.max(MIN_ZOOM, pre.clientWidth / pre.scrollWidth))
  }
  // Compare on-screen boxes: with CSS zoom, an element's own scroll metrics stay in its zoomed coordinates.
  const available = article.getBoundingClientRect()
  let zoom = 1
  for (let pass = 0; pass < 4; pass++) {
    const box = body.getBoundingClientRect()
    const over = Math.max(box.height / available.height, (body.scrollWidth / body.clientWidth) || 1)
    if (over <= 1.002 || zoom <= MIN_ZOOM) break
    zoom = Math.max(MIN_ZOOM, zoom / over * 0.995)
    body.style.zoom = String(zoom)
  }
  article.dataset.fit = zoom.toFixed(2)
}

function Html({ html, className }: { html?: string; className?: string }) {
  return html ? <div className={className} dangerouslySetInnerHTML={{ __html: html }} /> : null
}

function Cover({ deck, slide }: { deck: DeckData; slide: Slide }) {
  return <>
    <Html className="region cover-text" html={slide.html.main} />
    <p className="cover-author"><span>{deck.author.name}</span><span>{deck.author.headline}</span></p>
  </>
}

function Author({ deck }: { deck: DeckData }) {
  const after = deck.next
    ? <a className="lh-button" href={`/${deck.next.id}/`}>Next: {deck.next.id} {deck.next.title}</a>
    : deck.certification && <a className="lh-button" href={deck.certification.url} target="_blank" rel="noopener">Final step: {deck.certification.title}</a>
  return <div className="author">
    <img className="author-photo" src={portrait} alt={`Portrait of ${deck.author.name}`} width={240} height={300} />
    <div className="author-text">
      <p className="eyebrow">Your instructor</p>
      <h1 className="author-name">{deck.author.name}</h1>
      <p className="author-headline">{deck.author.headline}</p>
      <p className="author-description">{deck.author.description}</p>
      <ul className="author-links">{deck.author.profiles.map(p => <li key={p.url}><a href={p.url} target="_blank" rel="noopener me">{p.name}</a></li>)}</ul>
      <p className="author-actions">{after}<a className="lh-button" data-variant="secondary" href="/">All modules</a></p>
    </div>
  </div>
}

function Body({ deck, slide }: { deck: DeckData; slide: Slide }) {
  const { html } = slide
  switch (slide.layout) {
    case 'main-cover-1': case 'main-cover-2': case 'cover': return <Cover deck={deck} slide={slide} />
    case 'author': return <Author deck={deck} />
    case 'two-cols-header': return <>
      <Html className="region header" html={html.main} />
      <div className="columns"><Html className="region col" html={html.left} /><Html className="region col" html={html.right} /></div>
    </>
    case 'comparison': return <>
      <Html className="region header" html={html.main} />
      <div className="columns compare">
        <section className="col before">{slide.beforeTitle && <p className="compare-title">{slide.beforeTitle}</p>}<Html className="region" html={html.before} /></section>
        <section className="col after">{slide.afterTitle && <p className="compare-title">{slide.afterTitle}</p>}<Html className="region" html={html.after} /></section>
      </div>
    </>
    case 'image': return <>
      {slide.image && <img className="slide-image" src={slide.image} alt={slide.section ?? slide.title} />}
      <Html className="region" html={html.main} />
    </>
    default: return <Html className="region" html={html.main} />
  }
}

type Props = { deck: DeckData; index: number; step: number; still?: boolean }

/** One slide at a given step, on a fixed 980×552 sheet that the viewport scales to fit. */
export function Stage({ deck, index, step, still = false }: Props) {
  const slide = deck.slides[index]
  const article = useRef<HTMLElement>(null)

  useLayoutEffect(() => { if (article.current) fitContent(article.current) }, [index])

  // Reveal v-clicks items up to the current step.
  useLayoutEffect(() => {
    article.current?.querySelectorAll<HTMLElement>('[data-at]').forEach(el => {
      const on = Number(el.dataset.at) <= step
      el.classList.toggle('on', on)
      el.setAttribute('aria-hidden', String(!on))
    })
  }, [index, step])

  useEffect(() => {
    const element = article.current
    if (!element) return
    const draw = () => renderMermaid(element).then(() => fitContent(element))
    draw()
    // Screenshots and diagrams change the height once they load.
    const refit = () => fitContent(element)
    const images = [...element.querySelectorAll('img')].filter(img => !img.complete)
    images.forEach(img => img.addEventListener('load', refit, { once: true }))
    const redraw = draw
    addEventListener('theme:changed', redraw)
    return () => removeEventListener('theme:changed', redraw)
  }, [index])

  const cover = /cover/.test(slide.layout)
  return <div className="sheet" data-layout={slide.layout} data-still={still || undefined}>
    {!cover && <p className="sheet-top" aria-hidden="true"><span className="sheet-course">GitHub Copilot</span><span>{deck.id} · {deck.title}</span></p>}
    <article className={`slide layout-${slide.layout}`} ref={article} key={index} aria-label={slide.title} data-slide={index + 1}>
      <div className="slide-body">
        {slide.section && !cover && slide.layout !== 'author' && <p className="eyebrow section">{slide.section}</p>}
        <Body deck={deck} slide={slide} />
      </div>
    </article>
    <p className="sheet-foot" aria-hidden="true">
      <span>{deck.author.name}</span>
      <span className="sheet-number">{deck.id} · {String(index + 1).padStart(2, '0')}/{String(deck.slides.length).padStart(2, '0')}</span>
    </p>
  </div>
}
