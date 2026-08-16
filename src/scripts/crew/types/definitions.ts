import { getObjectRecord } from '@revolutionarygamesco/common'
import {
  isSpecializationDefinition,
  createSpecializationDefinitionFromKey,
  type SpecializationDefinition
} from './specialization.ts'

export type SpecializationDefinitions = Record<string, SpecializationDefinition>

export const isSpecializationDefinitions = (
  candidate: unknown
): candidate is SpecializationDefinitions => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.keys(obj).every(key => isSpecializationDefinition(obj[key]))
}

export const createSpecializationDefinitions = (): SpecializationDefinitions => {
  const keys = ['captain', 'quartermaster', 'master', 'master-mate', 'bosun',
    'bosun-mate', 'gunner', 'gunner-mate', 'carpenter', 'carpenter-mate',
    'surgeon', 'surgeon-mate', 'cooper', 'cooper-mate', 'armorer',
    'armorer-mate', 'sailmaker', 'sailmaker-mate', 'cook']
  const record: Record<string, SpecializationDefinition> = {}
  for (const key of keys) record[key] = createSpecializationDefinitionFromKey(key)
  return record
}
