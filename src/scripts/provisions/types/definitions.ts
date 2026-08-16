import { getObjectRecord } from '@revolutionarygamesco/common'
import { isProvisionDefinition, createProvisionDefinitionFromKey, type ProvisionDefinition } from './definition.ts'

export type ProvisionDefinitions = Record<string, ProvisionDefinition>

export const isProvisionDefinitions = (
  candidate: unknown
): candidate is ProvisionDefinitions => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.keys(obj).every(key => isProvisionDefinition(obj[key]))
}

export const createProvisionDefinitions = (): ProvisionDefinitions => {
  return {
    food: createProvisionDefinitionFromKey('food'),
    water: createProvisionDefinitionFromKey('water'),
    rum: createProvisionDefinitionFromKey('rum')
  }
}
