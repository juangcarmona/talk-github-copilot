export type Slots = { main: string; left?: string; right?: string; before?: string; after?: string }

export type Slide = {
  layout: string
  section: string | null
  title: string
  beforeTitle: string | null
  afterTitle: string | null
  image: string | null
  html: Slots
  steps: number
}

export type Link = { id: string; title: string }

export type Author = { name: string; headline: string; description: string; site: string; profiles: { name: string; url: string }[] }

export type DeckData = {
  id: string
  title: string
  deckTitle: string
  course: string
  author: Author
  previous: Link | null
  next: Link | null
  certification: { title: string; text: string; url: string } | null
  slides: Slide[]
}
