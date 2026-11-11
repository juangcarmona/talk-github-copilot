import { useCallback, useEffect, useState } from 'react'
import { channelFor, useKeys, usePosition, type Message } from './Deck'
import { next, toPath, type Action } from './nav'
import type { DeckData } from './types'

function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/**
 * Speaker view in a second window: timer, current and next slide, and the slide list.
 * Speaker notes are not published with the course, so this view has none.
 */
export function Presenter({ deck }: { deck: DeckData }) {
  const [channel] = useState(() => channelFor(deck.id))
  const { position, go, move } = usePosition(deck, channel, { broadcast: true, transitions: false })
  const [started, setStarted] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())
  const extra = useCallback((action: Action) => {
    if (action === 'blackout') channel?.postMessage({ type: 'blackout', on: true } satisfies Message)
  }, [channel])
  useKeys(move, extra)

  useEffect(() => { channel?.postMessage({ type: 'hello' } satisfies Message) }, [channel])
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 500); return () => clearInterval(timer) }, [])
  useEffect(() => { if (started === null && (position.index > 0 || position.step > 0)) setStarted(Date.now()) }, [position, started])

  const slide = deck.slides[position.index]
  useEffect(() => { document.title = `Presenter · ${deck.id} · ${slide.title}` }, [deck.id, slide.title])
  const upcoming = next(position, deck.slides.map(s => s.steps))
  const elapsed = started === null ? 0 : (now - started) / 1000

  return <main className="presenter lh-root">
    <header>
      <span className="p-slide">{deck.id} · {position.index + 1}/{deck.slides.length} · <b>{slide.title}</b>{slide.steps ? ` · step ${position.step}/${slide.steps}` : ''}</span>
      <span className="p-timer">{clock(elapsed)}</span>
      <span className="p-clock">{new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      <button type="button" className="lh-button" data-variant="secondary" onClick={() => setStarted(Date.now())}>Reset timer</button>
    </header>
    <section className="p-current" aria-label="Current slide"><iframe title="Current slide" src={`${toPath(deck.id, position.index)}?embed`} /></section>
    <section className="p-next" aria-label="Next slide">
      <p className="eyebrow">Next</p>
      {upcoming.index === position.index ? <p>End of the module</p> : <iframe title="Next slide" src={`${toPath(deck.id, upcoming.index)}?embed`} />}
    </section>
    <nav className="p-list" aria-label="Slides">
      <ol>{deck.slides.map((s, index) => <li key={index}>
        <button type="button" aria-current={index === position.index ? 'true' : undefined} onClick={() => go({ index, step: 0 })}>
          <span>{String(index + 1).padStart(2, '0')}</span> {s.title}
        </button>
      </li>)}</ol>
    </nav>
    <footer>→ / Space next · ← back · B blackout · keys work in either window</footer>
  </main>
}
