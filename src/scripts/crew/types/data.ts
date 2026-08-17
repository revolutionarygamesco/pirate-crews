import { getObjectRecord, isOptionalString, isStringArray, isNumber } from '@revolutionarygamesco/common'
import { isSpecializations, type Specializations } from './specializations.ts'
import { isProvisionsData, createProvisionsData, type ProvisionsData } from '../../provisions/types/provisions.ts'

export interface CrewData {
  ship?: string
  articles?: string
  specialists: Specializations
  starboard: string[]
  larboard: string[]
  stock: number
  provisions: ProvisionsData
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
    isStringArray(obj.larboard),
    isNumber(obj.stock),
    isProvisionsData(obj.provisions)
  ].every(test => test)
}

export const createCrewData = (
  overrides?: Partial<CrewData>
): CrewData => {
  return {
    specialists: {},
    starboard: [],
    larboard: [],
    stock: 0,
    provisions: createProvisionsData(overrides?.provisions),
    ...overrides
  }
}
