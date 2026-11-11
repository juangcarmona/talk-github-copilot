import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { flushSync } from 'react-dom'
import { keyAction, next, parsePath, previous, same, toPath, type Action, type Position } from './nav'
import { SHEET, Stage } from './Stage'
import { ThemeSwitch } from './ThemeSwitch'
import type { DeckData } from './types'

export type Message = { type: 'goto'; position: Position } | { type: 'hello' } | { type: 'blackout'; on: boolean }

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function channelFor(id: string) {
  return typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(`github-copilot-deck-${id}`)
}

/** Keeps the fixed sheet scaled and centred inside its parent. */
export function useFit(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const fit = () => {
      const parent = element.parentElement!.getBoundingClientRect()
      const scale = Math.min(parent.width / SHEET.width, parent.height / SHEET.height)
      element.style.transform = `translate(${(parent.width - SHEET.width * scale) / 2}px, ${(parent.height - SHEET.height * scale) / 2}px) scale(${scale})`
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element.parentElement!)
    return () => observer.disconnect()
  }, [ref])
}

/** Position shared by the URL, the keyboard and the channel between audience and presenter windows. */
export function usePosition(deck: DeckData, channel: BroadcastChannel | null, { broadcast, transitions }: { broadcast: boolean; transitions: boolean }) {
  const steps = deck.slides.map(s => s.steps)
  const [position, setPosition] = useState<Position>(() => ({ index: parsePath(location.pathname, deck.slides.length).index, step: 0 }))
  const ref = useRef(position)

  const go = useCallback((target: Position, announce = broadcast) => {
    if (same(target, ref.current)) return
    const slideChanges = target.index !== ref.current.index
    ref.current = target
    if (slideChanges) history.replaceState(null, '', toPath(deck.id, target.index) + location.search)
    const apply = () => flushSync(() => setPosition(target))
    if (transitions && slideChanges && document.startViewTransition && !reducedMotion()) {
      const transition = document.startViewTransition(apply)
      transition.ready.catch(() => {})
      transition.finished.catch(() => {})
    } else apply()
    if (announce) channel?.postMessage({ type: 'goto', position: target } satisfies Message)
  }, [broadcast, transitions, channel, deck.id])

  useEffect(() => {
    const onMessage = (event: MessageEvent<Message>) => {
      if (event.data.type === 'goto') go(event.data.position, false)
      if (event.data.type === 'hello' && broadcast) channel?.postMessage({ type: 'goto', position: ref.current } satisfies Message)
    }
    channel?.addEventListener('message', onMessage)
    return () => channel?.removeEventListener('message', onMessage)
  }, [go, broadcast, channel])

  const move = useCallback((action: 'next' | 'previous' | 'first' | 'last') => {
    const current = ref.current
    if (action === 'next') go(next(current, steps))
    else if (action === 'previous') go(previous(current, steps))
    else if (action === 'first') go({ index: 0, step: 0 })
    else go({ index: steps.length - 1, step: steps[steps.length - 1] })
  }, [go]) // eslint-disable-line react-hooks/exhaustive-deps

  return { position, go, move, ref }
}

export function useKeys(move: (action: 'next' | 'previous' | 'first' | 'last') => void, extra: (action: Action) => void) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const action = keyAction(event.key, { meta: event.metaKey, ctrl: event.ctrlKey, alt: event.altKey }, event.target as Element)
      if (!action) return
      event.preventDefault()
      if (action === 'next' || action === 'previous' || action === 'first' || action === 'last') move(action)
      else extra(action)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [move, extra])
}

/** Shows the deck controls for a moment after the pointer moves, and while they hold focus. */
function useChrome() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    let timer = setTimeout(() => setVisible(false), 2500)
    const show = () => { setVisible(true); clearTimeout(timer); timer = setTimeout(() => setVisible(false), 2500) }
    addEventListener('pointermove', show)
    return () => { clearTimeout(timer); removeEventListener('pointermove', show) }
  }, [])
  return visible
}

function Overview({ deck, current, onPick, onClose }: { deck: DeckData; current: number; onPick: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { dialog.current?.showModal() }, [])
  return <dialog className="overview" ref={dialog} onClose={onClose} aria-labelledby="overview-title">
    <header><h2 id="overview-title">{deck.id} · {deck.title}</h2><button type="button" className="lh-button" data-variant="secondary" onClick={() => dialog.current?.close()}>Close</button></header>
    <ol>{deck.slides.map((slide, index) => <li key={index}>
      <a href={toPath(deck.id, index)} aria-current={index === current ? 'true' : undefined} onClick={event => { event.preventDefault(); onPick(index); dialog.current?.close() }}>
        <span className="overview-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="overview-section">{slide.section ?? (index === 0 ? 'Cover' : '')}</span>
        <span className="overview-title">{slide.title}</span>
      </a>
    </li>)}</ol>
  </dialog>
}

export function Deck({ deck }: { deck: DeckData }) {
  const sheet = useRef<HTMLDivElement>(null)
  const [channel] = useState(() => channelFor(deck.id))
  const { position, go, move } = usePosition(deck, channel, { broadcast: true, transitions: true })
  const [blackout, setBlackout] = useState(false)
  const [overview, setOverview] = useState(false)
  const chrome = useChrome()
  const touch = useRef<{ x: number; y: number } | null>(null)
  useFit(sheet)

  const openPresenter = useCallback(() => {
    window.open(`${toPath(deck.id, position.index)}?presenter`, `github-copilot-presenter-${deck.id}`, 'width=1400,height=860')
  }, [deck.id, position.index])

  const extra = useCallback((action: Action) => {
    if (action === 'presenter') openPresenter()
    if (action === 'overview') setOverview(on => !on)
    if (action === 'blackout') setBlackout(on => { channel?.postMessage({ type: 'blackout', on: !on } satisfies Message); return !on })
    if (action === 'fullscreen') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  }, [channel, openPresenter])
  useKeys(move, extra)

  useEffect(() => {
    const onMessage = (event: MessageEvent<Message>) => { if (event.data.type === 'blackout') setBlackout(event.data.on) }
    channel?.addEventListener('message', onMessage)
    return () => channel?.removeEventListener('message', onMessage)
  }, [channel])

  const slide = deck.slides[position.index]
  useEffect(() => { document.title = `${slide.title} · ${deck.id} ${deck.title} · GitHub Copilot` }, [slide.title, deck])

  return <main className="viewport" data-chrome={chrome || undefined}
    onClick={event => {
      if ((event.target as Element).closest('a, button, dialog, .deck-bar, pre, .mermaid-block') || String(getSelection() ?? '')) return
      move(event.clientX < innerWidth / 3 ? 'previous' : 'next')
    }}
    onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }}
    onTouchEnd={event => {
      const start = touch.current
      touch.current = null
      if (!start) return
      const dx = event.changedTouches[0].clientX - start.x
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(event.changedTouches[0].clientY - start.y)) move(dx < 0 ? 'next' : 'previous')
    }}>
    <h1 className="visually-hidden">{deck.id} {deck.title}</h1>
    <div className="fit" ref={sheet}><Stage deck={deck} index={position.index} step={position.step} /></div>
    <nav className="deck-bar" aria-label="Deck">
      <a className="deck-home" href="/">← All modules</a>
      <button type="button" onClick={() => move('previous')} aria-label="Previous slide">←</button>
      <span className="deck-count">{position.index + 1} / {deck.slides.length}</span>
      <button type="button" onClick={() => move('next')} aria-label="Next slide">→</button>
      <button type="button" onClick={() => setOverview(true)} aria-label="All slides (O)">☰</button>
      <button type="button" onClick={openPresenter} aria-label="Presenter view (P)">P</button>
      <button type="button" onClick={() => extra('fullscreen')} aria-label="Full screen (F)">⤢</button>
      <ThemeSwitch />
    </nav>
    {overview && <Overview deck={deck} current={position.index} onPick={index => go({ index, step: 0 })} onClose={() => setOverview(false)} />}
    {blackout && <div className="blackout" />}
    <p className="visually-hidden" role="status" aria-live="polite">Slide {position.index + 1} of {deck.slides.length}: {slide.title}</p>
  </main>
}

/** A still frame of one slide, used by the presenter previews: /201/5?embed. */
export function Embed({ deck }: { deck: DeckData }) {
  const sheet = useRef<HTMLDivElement>(null)
  const index = parsePath(location.pathname, deck.slides.length).index
  useFit(sheet)
  return <main className="viewport embed"><div className="fit" ref={sheet}><Stage deck={deck} index={index} step={deck.slides[index].steps} still /></div></main>
}

/** Every slide at its final step, one per page, for printing to PDF: /201/?print. */
export function Print({ deck }: { deck: DeckData }) {
  return <main className="print">{deck.slides.map((slide, index) => <section className="page" key={index}><Stage deck={deck} index={index} step={slide.steps} still /></section>)}</main>
}
