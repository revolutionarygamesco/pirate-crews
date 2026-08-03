import { describe, beforeEach, it, expect } from 'vitest'
import { mockLocalize } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import describeShares from './shares.ts'

describe('describeShares', () => {
  beforeEach(() => {
    const dict: Record<string, string> = {}

    dict[`${MODULE_ID}.articles.shares.conj`] = 'and'
    dict[`${MODULE_ID}.articles.shares.p25`] = 'one quarter'
    dict[`${MODULE_ID}.articles.shares.p50`] = 'one half'
    dict[`${MODULE_ID}.articles.shares.1`] = 'one'
    dict[`${MODULE_ID}.articles.shares.2`] = 'two'
    dict[`${MODULE_ID}.articles.shares.equal`] = 'To each Member of this Company shall be paid an equal share of each Prize.'
    dict[`${MODULE_ID}.articles.shares.initial`] = 'To the {officers} shall be paid {amount} Shares of each Prize'
    dict[`${MODULE_ID}.articles.shares.following`] = 'to the {officers}, {amount}'
    dict[`${MODULE_ID}.articles.shares.final`] = 'and to each other member of this Company, one Share.'
    dict[`${MODULE_ID}.articles.shares.auction`] = 'Items of unique value which cannot be properly divided shall be auctioned to the members of the Company by the Quartermaster, or awarded as the Captain and the Majority of the Company shall see fit.'

    mockLocalize(dict)
  })

  it('describes equal shares', () => {
    const actual = describeShares([
      { shares: 1, titles: ['Captain', 'Quartermaster', 'Sailing Master'] }
    ])
    expect(actual).toEqual('To each Member of this Company shall be paid an equal share of each Prize. Items of unique value which cannot be properly divided shall be auctioned to the members of the Company by the Quartermaster, or awarded as the Captain and the Majority of the Company shall see fit.')
  })

  it('describes unequal shares', () => {
    const actual = describeShares([
      { shares: 2, titles: ['Captain', 'Quartermaster'] },
      { shares: 1.5, titles: ['Sailing Master', 'Bosun', 'Master Gunner'] },
      { shares: 1.25, titles: ['Master Carpenter', 'Surgeon'] }
    ])
    expect(actual).toEqual('To the {officers} shall be paid {amount} Shares of each Prize, to the {officers}, {amount}, to the {officers}, {amount}, and to each other member of this Company, one Share. Items of unique value which cannot be properly divided shall be auctioned to the members of the Company by the Quartermaster, or awarded as the Captain and the Majority of the Company shall see fit.')
  })
})
