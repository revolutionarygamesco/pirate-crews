import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { isCrewData, createCrewData } from './data.ts'

describe('isCrewData', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isCrewData(value)).toBe(false)
  })

  it('accepts crew data', () => {
    expect(isCrewData({
      specialists: {},
      starboard: [],
      larboard: []
    })).toBe(true)
  })
})

describe('createCrewData', () => {
  it('creates crew data', () => {
    expect(isCrewData(createCrewData())).toBe(true)
  })

  it('can override values', () => {
    const ship = `Actor.${generateID()}`
    const actual = createCrewData({ ship })
    expect(actual.ship).toBe(ship)
  })
})
