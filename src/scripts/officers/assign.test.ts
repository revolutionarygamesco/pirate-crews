import { describe, it, expect } from 'vitest'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { createOfficerAssignments } from './assignments.ts'
import assignOfficer from './assign.ts'

describe('assignOfficer', () => {
  const actor = { uuid: `Actor.${generateID()}` } as unknown as foundry.documents.Actor
  const assignments = createOfficerAssignments()

  it('assigns the actor to the role', () => {
    assignOfficer('captain', assignments, actor)
    expect(assignments.captain.actor).toBe(actor.uuid)
  })

  it('reassigns you from one role to another', () => {
    assignOfficer('captain', assignments, actor)
    assignOfficer('quartermaster', assignments, actor)
    expect(assignments.captain.actor).toBeNull()
    expect(assignments.quartermaster.actor).toBe(actor.uuid)
  })
})
