import { describe, beforeEach, it, expect } from 'vitest'
import { mockLocalize } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import { createOfficerAssignments } from '../officers/assignments.ts'
import sortShareGroups from './groups.ts'

describe('sortShareGroups', () => {
  beforeEach(() => {
    const dict: Record<string, string> = {}

    dict[`${MODULE_ID}.officers.captain.title`] = 'Captain'
    dict[`${MODULE_ID}.officers.quartermaster.title`] = 'Quartermaster'
    dict[`${MODULE_ID}.officers.master.title`] = 'Sailing Master'
    dict[`${MODULE_ID}.officers.bosun.title`] = 'Bosun'
    dict[`${MODULE_ID}.officers.gunner.title`] = 'Master Gunner'
    dict[`${MODULE_ID}.officers.carpenter.title`] = 'Master Carpenter'
    dict[`${MODULE_ID}.officers.surgeon.title`] = 'Surgeon'

    mockLocalize(dict)
  })

  it('finds the share groups in the company', () => {
    const actual = sortShareGroups(createOfficerAssignments())
    expect(actual).toEqual([
      { shares: 2, titles: ['Captain', 'Quartermaster'] },
      { shares: 1.5, titles: ['Sailing Master', 'Bosun', 'Master Gunner'] },
      { shares: 1.25, titles: ['Master Carpenter', 'Surgeon'] }
    ])
  })
})
