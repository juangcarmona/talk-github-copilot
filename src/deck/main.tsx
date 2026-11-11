import '@juangcarmona/lighthouse-ui'
import '../styles/brand.css'
import '../styles/deck.css'
import '../styles/slide.css'
import '../theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Deck, Embed, Print } from './Deck'
import { parsePath } from './nav'
import { Presenter } from './Presenter'
import type { DeckData } from './types'

const mode = new URLSearchParams(location.search)
const view = mode.has('presenter') ? 'presenter' : mode.has('embed') ? 'embed' : mode.has('print') ? 'print' : 'deck'
document.documentElement.dataset.mode = view

const { id } = parsePath(location.pathname, 1)
const root = createRoot(document.getElementById('root')!)

async function start() {
  if (!id) throw Error(`No module in ${location.pathname}`)
  const response = await fetch(`/${id}/deck.json`)
  if (!response.ok) throw Error(`Module ${id} not found`)
  const deck = (await response.json()) as DeckData
  const element = view === 'presenter' ? <Presenter deck={deck} /> : view === 'embed' ? <Embed deck={deck} /> : view === 'print' ? <Print deck={deck} /> : <Deck deck={deck} />
  root.render(<StrictMode>{element}</StrictMode>)
  if (view === 'print') requestAnimationFrame(() => document.documentElement.dataset.ready = 'true')
}

start().catch(error => {
  root.render(<main className="deck-error lh-root"><h1>This module could not be loaded</h1><p>{String(error.message ?? error)}</p><p><a href="/">Go to the course modules</a></p></main>)
})
