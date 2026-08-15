import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { parse } from 'yaml'
import module from '../src/module.json' with { type: 'json' }

const langs = module.languages.map(({ lang }) => lang)
mkdirSync('./dist/lang', { recursive: true })

for (const lang of langs) {
  const raw = readFileSync(`./src/lang/${lang}.yaml`, 'utf8')
  const data = parse(raw)
  const json = JSON.stringify(data, null, 2)
  writeFileSync(`./dist/lang/${lang}.json`, json, 'utf8')
}
