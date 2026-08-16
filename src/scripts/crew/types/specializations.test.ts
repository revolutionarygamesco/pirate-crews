import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { createSpecializationFromKey } from './specialization.ts'
import { isSpecializations, createSpecializations } from './specializations.ts'

describe('isSpecializations', () => {
  it.each([
    ...getPrimitivesExcept('an empty object'),
    ['an arbitrary object', { a: 1 }]
  ])('rejects %s', (_label, value) => {
    expect(isSpecializations(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isSpecializations({})).toBe(true)
  })

  it('accepts a record of specializations', () => {
    expect(isSpecializations({
      captain: createSpecializationFromKey('captain')
    })).toBe(true)
  })
})

describe('createSpecializations', () => {
  it('returns a record of specializations', () => {
    expect(isSpecializations(createSpecializations())).toBe(true)
  })
})
