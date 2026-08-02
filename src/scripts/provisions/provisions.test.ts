import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isProvisions, createProvisions } from './provisions.ts'

describe('isProvisions', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_label, value) => {
    expect(isProvisions(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isProvisions({})).toBe(true)
  })

  it('accepts a dictionary of provisions', () => {
    expect(isProvisions({
      food: {
        label: 'Food',
        unit: 'ration',
        units: 'rations',
        consumption: 1,
        value: 0
      }
    })).toBe(true)
  })
})

describe('createProvisions', () => {
  it('creates a dictionary of provisions', () => {
    expect(isProvisions(createProvisions())).toBe(true)
  })
})
