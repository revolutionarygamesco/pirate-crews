import { getObjectRecord, isString, isNumber } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'

export interface ProvisionType {
  label: string
  unit: string
  units: string
  consumption: number
}

export const isProvisionType = (
  candidate: unknown
): candidate is ProvisionType => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isString(obj.label),
    isString(obj.unit),
    isString(obj.units),
    isNumber(obj.consumption)
  ].every(test => test)
}

export const createProvisionType = (
  overrides?: Partial<ProvisionType>
): ProvisionType => {
  const t = scopeLocalizer([MODULE_ID, 'provisions', 'food'].join('.'))
  return {
    label: t('label'),
    unit: t('unit'),
    units: t('units'),
    consumption: 1,
    ...overrides
  }
}
