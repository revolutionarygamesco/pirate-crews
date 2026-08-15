import { getObjectRecord, isOptionalString, isStringArray, isObject } from '@revolutionarygamesco/common'
import { isSpecialization, type Specialization } from './specialization.ts'

export interface CrewData {
  ship?: string
  articles?: string
  specialists: Record<string, Specialization>
  starboard: string[]
  larboard: string[]
}

export const isCrewData = (
  candidate: unknown
): candidate is CrewData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isOptionalString(obj.ship),
    isOptionalString(obj.articles),
    isObject(obj.specialists) && Object.values(obj.specialists).every(item => isSpecialization(item)),
    isStringArray(obj.starboard),
    isStringArray(obj.larboard)
  ].every(test => test)
}

export const createCrewData = (
  overrides?: Partial<CrewData>
): CrewData => {
  return {
    specialists: {},
    starboard: [],
    larboard: [],
    ...overrides
  }
}
