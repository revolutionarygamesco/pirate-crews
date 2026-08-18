import { getID } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isCrewData } from './types/data.ts'
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

  async payout (target: number): Promise<void> {
    if (!this.crew.canEdit('stock')) return
    const actor = game.actors.get(getID(this.crew.actor ?? ''))
    if (!isCrewData(actor?.system)) return

    const ledger = this.estimate(target)
    await actor.update({ 'system.stock': actor.system.stock - ledger.total })
    Hooks.callAll(`${MODULE_ID}.payout`, ledger)
  }
}

export default Purser
