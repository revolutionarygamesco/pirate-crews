import { type ProvisionsData } from './types/provisions.ts'
import loadProvisions from './foundry/load.ts'

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

  toObject () {
    return this.data
  }
}

export default Provisions
