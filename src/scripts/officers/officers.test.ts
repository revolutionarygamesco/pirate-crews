import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { createOfficers, isOfficers } from './officers.ts'

describe('isOfficers', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_desc, value) => {
    expect(isOfficers(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isOfficers({})).toBe(true)
  })

  it('accepts a dictionary of officers', () => {
    expect(isOfficers({
      captain: {
        title: 'Captain',
        desc: 'This is the captain.',
        sans: 'You need a captain.',
        shares: 2
      }
    })).toBe(true)
  })
})

describe('createOfficers', () => {
  it('creates a dictionary of officers', () => {
    expect(isOfficers(createOfficers())).toBe(true)
  })
})
