import { getObjectRecord, isString, isNumber } from '@revolutionarygamesco/common'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'

export interface OfficerAssignment {
  actor: string | null
  shares: number
}

export const isOfficerAssignment = (
  candidate: unknown
): candidate is OfficerAssignment => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    obj.actor === null || isString(obj.actor),
    isNumber(obj.shares)
  ].every(test => test)
}

export const createOfficerAssignment = (
  overrides?: Partial<OfficerAssignment>
): OfficerAssignment => {
  return {
    actor: `Actor.${generateID()}`,
    shares: 1,
    ...overrides
  }
}
