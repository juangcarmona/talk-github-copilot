// Live-edit one deck: npm run dev -- 201
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { course, root } from './course.mjs'

const id = process.argv[2]
const m = course.modules.find(x => x.id === id)
if (!m) throw Error(`Usage: npm run dev -- <module>, one of ${course.modules.map(x => x.id).join(', ')}`)
process.exit(spawnSync(join(root, 'node_modules', '.bin', 'slidev'), [join(root, m.deck), '--open'], { cwd: root, stdio: 'inherit' }).status ?? 1)
