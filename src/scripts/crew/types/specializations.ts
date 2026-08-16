import { getObjectRecord } from '@revolutionarygamesco/common'
import { SPECIALIZATION_DEFAULT_KEYS } from './definitions.ts'
import {
  isSpecialization,
  createSpecializationFromKey,
  type Specialization
} from './specialization.ts'

export type Specializations = Record<string, Specialization>

export const isSpecializations = (
  candidate: unknown
): candidate is Specializations => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.keys(obj).every(key => isSpecialization(obj[key]))
}

export const createSpecializations = (): Specializations => {
  const record: Specializations = {}
  for (const key of SPECIALIZATION_DEFAULT_KEYS) record[key] = createSpecializationFromKey(key)
  return record
}
