import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { createOfficerAssignments, isOfficerAssignments } from './assignments.ts'

describe('isOfficerAssignments', () => {
  it.each([
    ...getPrimitivesExcept('an empty object')
  ])('rejects %s', (_desc, value) => {
    expect(isOfficerAssignments(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isOfficerAssignments({})).toBe(true)
  })

  it('accepts a dictionary of officer assignments', () => {
    expect(isOfficerAssignments({
      captain: {
        title: 'Captain',
        desc: 'This is the captain.',
        sans: 'You need a captain.',
        shares: 2,
        actor: `Actor.${generateID()}`
      }
    })).toBe(true)
  })
})

describe('createOfficers', () => {
  it('creates a dictionary of officers', () => {
    expect(isOfficerAssignments(createOfficerAssignments())).toBe(true)
  })
})
