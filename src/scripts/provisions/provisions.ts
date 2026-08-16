import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { type ProvisionsData } from './types/provisions.ts'
import loadProvisions from './foundry/load.ts'

export interface RationingOption {
  value: number
  label: string
  selected: boolean
}

class Provisions {
  data: ProvisionsData

  constructor (data?: ProvisionsData) {
    this.data = data ?? {}
    if (!data) {
      const defs = loadProvisions()
      for (const key in defs) {
        this.data[key] = { store: 0, rationing: 1, skip: false }
      }
    }
  }

  getRationingOptions (key: string): RationingOption[] {
    const path = [MODULE_ID, 'provisions', 'rationing']
    const t = scopeLocalizer(path.join('.'))
    const curr = this.data[key].rationing ?? 1
    return ([
      [2, 'double'],
      [1, 'normal'],
      [0.5, 'half'],
      [0.25, 'quarter'],
      [0, 'none']
    ] as Array<[number, string]>).map(([value, tag]) => ({
      value, label: t(tag), selected: curr === value
    }))
  }

  toObject () {
    return this.data
  }
}

export default Provisions
