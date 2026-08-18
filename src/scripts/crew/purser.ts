import type Crew from './crew.ts'

class Purser {
  crew: Crew

  constructor (crew: Crew) {
    this.crew = crew
  }

  estimate (target: number): Record<string, number> {
    const shares = this.crew.shares
    const adjustedTarget = Math.min(target, this.crew.stock)
    const perShare = Math.floor(adjustedTarget / shares.total)
    const ledger: Record<string, number> = { total: 0 }

    for (const uuid of this.crew.uuids) {
      const amount = Math.floor(shares[uuid] * perShare)
      ledger[uuid] = amount
      ledger.total += amount
    }

    return ledger
  }
}

export default Purser
