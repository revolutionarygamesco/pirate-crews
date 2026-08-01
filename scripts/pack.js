import { compilePack } from '@foundryvtt/foundryvtt-cli'
import module from '../src/module.json' with { type: 'json' }

for await (const pack of module.packs) {
  const src = `src/${pack.path}`
  const dest = `dist/${pack.path}`
  await compilePack(src, dest, { yaml: true, log: true })
}
