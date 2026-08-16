import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { isProvisionDefinitions, createProvisionDefinitions } from './definitions.ts'

describe('isProvisionDefinitions', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_label, value) => {
    expect(isProvisionDefinitions(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isProvisionDefinitions({})).toBe(true)
  })

  it('accepts a dictionary of provision types', () => {
    expect(isProvisionDefinitions({
      food: {
        label: 'Food',
        unit: 'ration',
        units: 'rations',
        consumption: 1
      }
    })).toBe(true)
  })
})

describe('createProvisionDefinitions', () => {
  it('creates a dictionary of provision types', () => {
    const actual = createProvisionDefinitions()
    expect(isProvisionDefinitions(actual)).toBe(true)
    for (const key of ['food', 'water', 'rum']) expect(actual[key]).toBeDefined()
  })
})
