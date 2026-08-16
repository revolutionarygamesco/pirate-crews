import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import {
  isProvisionDefinition,
  createProvisionDefinitionFromKey,
  createProvisionDefinition
} from './definition.ts'

describe('isProvisionDefinition', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isProvisionDefinition(value)).toBe(false)
  })

  it('accepts a type of provisions', () => {
    expect(isProvisionDefinition({
      label: 'Food',
      unit: 'ration',
      units: 'rations',
      consumption: 1
    })).toBe(true)
  })
})

describe('createProvisionDefinitionFromKey', () => {
  it.each(['food', 'water', 'rum'])('defines provisions for %s', (key) => {
    expect(isProvisionDefinition(createProvisionDefinitionFromKey(key))).toBe(true)
  })
})

describe('createProvisionDefinition', () => {
  it('creates a type of provisions', () => {
    expect(isProvisionDefinition(createProvisionDefinition())).toBe(true)
  })
})
