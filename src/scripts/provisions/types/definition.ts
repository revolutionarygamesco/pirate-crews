import { getObjectRecord, isString, isNumber } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'

export interface ProvisionDefinition {
  label: string
  unit: string
  units: string
  consumption: number
}

export const isProvisionDefinition = (
  candidate: unknown
): candidate is ProvisionDefinition => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isString(obj.label),
    isString(obj.unit),
    isString(obj.units),
    isNumber(obj.consumption)
  ].every(test => test)
}

export const createProvisionDefinitionFromKey = (
  key: string
): ProvisionDefinition => {
  const t = scopeLocalizer([MODULE_ID, 'provisions', key].join('.'))
  return {
    label: t('label'),
    unit: t('unit'),
    units: t('units'),
    consumption: 1
  }
}

export const createProvisionDefinition = (
  overrides?: Partial<ProvisionDefinition>
): ProvisionDefinition => {
  return {
    ...createProvisionDefinitionFromKey('food'),
    ...overrides
  }
}
