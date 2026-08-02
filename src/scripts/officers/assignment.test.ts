import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { createOfficer } from './officer.ts'
import { isOfficerAssignment, createOfficerAssignment } from './assignment.ts'

describe('isOfficerAssignment', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isOfficerAssignment(value)).toBe(false)
  })

  it('accepts an officer assignment', () => {
    expect(isOfficerAssignment({
      ...createOfficer(),
      actor: `Actor.${generateID()}`
    })).toBe(true)
  })

  it('accepts a null officer assignment', () => {
    expect(isOfficerAssignment({
      ...createOfficer(),
      actor: null
    })).toBe(true)
  })
})

describe('createOfficerAssignment', () => {
  it('creates an officer assignment', () => {
    expect(isOfficerAssignment(createOfficerAssignment())).toBe(true)
  })
})
