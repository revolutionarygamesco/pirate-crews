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
  overrides?: Record<string, Partial<OfficerAssignment>>
): OfficerAssignments => {
  const fullOverrides: Record<string, OfficerAssignment> = {}
  for (const key in overrides) {
    fullOverrides[key] = createOfficerAssignment(overrides[key])
  }

  const base = createOfficers()
  const assignments: OfficerAssignments = {}
  for (const key in base) {
    assignments[key] = { ...base[key], actor: null }
  }

  return {
    ...assignments,
    ...fullOverrides
  }
}
