import { readFileSync, writeFileSync } from 'fs'
import { parse, stringify } from 'yaml'
import generateID from './generate-id.js'

const getKey = (obj, parent) => {
  const type = parent ? 'tables.results' : 'tables'
  return parent
    ? `!${type}!${parent}.${obj}`
    : `!${type}!${obj}`
}

const completeResult = (result, parentID, index) => {
  const { _id, _key, range, weight, type, ...rest } = result
  const i = _id ?? generateID()
  const k = _key ?? getKey(i, parentID)
  const r = range ?? [index + 1, index + 1]
  const w = weight ?? Math.abs(r[1] - r[0]) + 1
  const t = type ?? 'text'
  return { _id: i, _key: k, range: r, weight: w, type: t, ...rest }
}

const completeTable = (obj) => {
  const { _id, _key, name, description, img, formula, results, ...rest } = obj
  const i = _id ?? generateID()
  const k = _key ?? getKey(i)
  const n = name ?? 'INSERT_NAME_HERE'
  const d = description ?? ''
  const m = img ?? 'icons/svg/d20-grey.svg'
  const f = formula ?? `1d${obj.results.length}`

  const completed = { _id: i, _key: k, name: n, description: d, img: m, formula: f, ...rest }
  completed.results = obj.results.map((result, index) => completeResult(result, i, index))
  return completed
}

const complete = (path) => {
  const raw = readFileSync(path, 'utf-8')
  const content = parse(raw)
  const completed = completeTable(content)
  const str = stringify(completed)
  writeFileSync(path, str)
}

const [path] = process.argv.slice(2)

if (!path) {
  console.error('Usage: npm run complete-table <path>')
  process.exit(1)
}

complete(path)