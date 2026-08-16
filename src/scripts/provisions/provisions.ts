import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { type ProvisionsData } from './types/provisions.ts'
import type Crew from '../crew/crew.ts'
import loadProvisions from './foundry/load.ts'

export interface RationingOption {
  value: number
  label: string
  selected: boolean
}

class Provisions {
  data: ProvisionsData
  crew?: Crew

  constructor (
    data?: ProvisionsData,
    crew?: Crew
  ) {
    this.data = data ?? {}
    this.crew = crew
    if (!data) {
      const defs = loadProvisions()
      for (const key in defs) {
        this.data[key] = { store: 0, rationing: 1, skip: false }
      }
    }
  }

  perDiem (crew?: Crew): Record<string, number> {
    const perDiem: Record<string, number> = {}
    const c = crew ?? this.crew
    const n = c ? c.count : 0
    if (n === 0) return perDiem

    const defs = loadProvisions()
    for (const key in this.data) {
      const rate = defs[key].consumption ?? 1
      perDiem[key] = rate * n * this.data[key].rationing
    }

    return perDiem
  }

  estimate (crew?: Crew): Record<string, number> {
    const estimates: Record<string, number> = {}
    const c = crew ?? this.crew
    const n = c ? c.count : 0
    if (n === 0) return estimates

    const perDiem = this.perDiem(crew)
    for (const key in this.data) {
      const { store, skip } = this.data[key]
      const skipBonus = skip ? 1 : 0
      estimates[key] = Math.floor(store / perDiem[key]) + skipBonus
    }

    return estimates
  }

  consume (crew?: Crew): void {
    const perDiem = this.perDiem(crew)
    for (const key in perDiem) {
      if (this.data[key].skip) {
        this.data[key].skip = false
      } else {
        this.data[key].store = Math.max(this.data[key].store - perDiem[key], 0)
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
