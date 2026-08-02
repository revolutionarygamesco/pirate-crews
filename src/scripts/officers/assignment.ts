import { isString } from '@revolutionarygamesco/common'
import { isOfficer, createOfficer, type Officer } from './officer.ts'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'

export interface OfficerAssignment extends Officer {
  actor: string | null
}

export const isOfficerAssignment = (
  candidate: unknown
): candidate is OfficerAssignment => {
  if (!isOfficer(candidate)) return false
  const actor = (candidate as OfficerAssignment).actor
  return actor === null || isString(actor)
}

export const createOfficerAssignment = (
  overrides?: Partial<OfficerAssignment>
): OfficerAssignment => {
  return {
    ...createOfficer(),
    actor: `Actor.${generateID()}`,
    ...overrides
  }
}
