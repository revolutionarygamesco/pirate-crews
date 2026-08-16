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

  it('accepts a record of provisions', () => {
    expect(isProvisions({
      food: {
        store: 30,
        rationing: 1,
        skip: false
      }
    })).toBe(true)
  })
})

describe('createProvisions', () => {
  it('creates a provision record', () => {
    const actual = createProvisions()
    expect(isProvisions(actual)).toBe(true)
    for (const key of ['food', 'water', 'rum']) expect(actual[key]).toBeDefined()
  })
})
