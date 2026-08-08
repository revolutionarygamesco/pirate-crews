import { getObjectRecord } from '@revolutionarygamesco/common'
import {
  isOfficerAssignment,
  createOfficerAssignment,
  type OfficerAssignment
} from './assignment.ts'
import { createOfficers } from './officers.ts'

export interface OfficerAssignments {
  [key: string]: OfficerAssignment
}

export const isOfficerAssignments = (
  candidate: unknown
): candidate is OfficerAssignments => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.keys(obj).every(key => isOfficerAssignment(obj[key]))
}

export const createOfficerAssignments = (
  overrides?: { [key: string]: Partial<OfficerAssignment> }
): OfficerAssignments => {
  const fullOverrides: Record<string, OfficerAssignment> = {}
  for (const key in overrides) {
    fullOverrides[key] = createOfficerAssignment(overrides[key])
  }

  const base = createOfficers()
  const assignments: OfficerAssignments = {}
  const defaultShares: Record<string, number> = {
    captain: 2,
    quartermaster: 2,
    master: 1.5,
    bosun: 1.5,
    gunner: 1.5
  }
  for (const key in base) {
    const shares = key in defaultShares ? defaultShares[key] : 1.25
    assignments[key] = { actor: null, shares }
  }

  return {
    ...assignments,
    ...fullOverrides
  }
}
