import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const root = fileURLToPath(new URL('..', import.meta.url))
export const course = JSON.parse(readFileSync(new URL('../course/modules.json', import.meta.url), 'utf8'))

// The GoatCounter snippet shared with talk-se2 and talk-aligned: one account, paths keyed by host.
export const goatcounter = `<script>window.goatcounter = { path: function (p) { return location.host + p } }</script>
<script data-goatcounter="https://jgcarmona-com.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`
