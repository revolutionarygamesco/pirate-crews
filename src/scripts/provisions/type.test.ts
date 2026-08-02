import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isProvisionType, createProvisionType } from './type.ts'

describe('isProvisionType', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isProvisionType(value)).toBe(false)
  })

  it('accepts a type of provisions', () => {
    expect(isProvisionType({
      label: 'Food',
      unit: 'ration',
      units: 'rations',
      consumption: 1
    })).toBe(true)
  })
})

describe('createProvisionType', () => {
  it('creates a type of provisions', () => {
    expect(isProvisionType(createProvisionType())).toBe(true)
  })
})
