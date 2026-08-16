import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isProvisionsData, createProvisionsData } from './provisions.ts'

describe('isProvisionsData', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_label, value) => {
    expect(isProvisionsData(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isProvisionsData({})).toBe(true)
  })

  it('accepts a record of provisions', () => {
    expect(isProvisionsData({
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
    const actual = createProvisionsData()
    expect(isProvisionsData(actual)).toBe(true)
    for (const key of ['food', 'water', 'rum']) expect(actual[key]).toBeDefined()
  })
})
