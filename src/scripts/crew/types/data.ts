import { getObjectRecord, isOptionalString, isStringArray } from '@revolutionarygamesco/common'
import { isSpecializations, type Specializations } from './specializations.ts'

export interface CrewData {
  ship?: string
  articles?: string
  specialists: Specializations
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
    isSpecializations(obj.specialists),
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
