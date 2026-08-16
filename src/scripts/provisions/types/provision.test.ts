import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isProvision, createProvision } from './provision.ts'

describe('isProvision', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isProvision(value)).toBe(false)
  })

  it('accepts a provision record', () => {
    expect(isProvision({
      store: 30,
      rationing: 1,
      skip: false
    })).toBe(true)
  })
})

describe('createProvision', () => {
  it('creates a provision record', () => {
    expect(isProvision(createProvision())).toBe(true)
  })
})
