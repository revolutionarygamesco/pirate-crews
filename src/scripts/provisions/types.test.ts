import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isProvisionTypes, createProvisionTypes } from './types.ts'

describe('isProvisionTypes', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_label, value) => {
    expect(isProvisionTypes(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isProvisionTypes({})).toBe(true)
  })

  it('accepts a dictionary of provision types', () => {
    expect(isProvisionTypes({
      food: {
        label: 'Food',
        unit: 'ration',
        units: 'rations',
        consumption: 1
      }
    })).toBe(true)
  })
})

describe('createProvisionTypes', () => {
  it('creates a dictionary of provision types', () => {
    expect(isProvisionTypes(createProvisionTypes())).toBe(true)
  })
})
