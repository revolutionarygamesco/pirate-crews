import { getObjectRecord } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isProvisionType, type ProvisionType } from './type.ts'

export interface ProvisionTypes {
  [key: string]: ProvisionType
}

export const isProvisionTypes = (
  candidate: unknown
): candidate is ProvisionTypes => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false

  for (const key in obj) {
    if (!isProvisionType(obj[key])) return false
  }

  return true
}

export const createProvisionTypes = (
  overrides?: Record<string, Partial<ProvisionType>>
): ProvisionTypes => {
  const t = scopeLocalizer([MODULE_ID, 'provisions'].join('.'))
  return {
    food: {
      label: t(['food', 'label']),
      unit: t(['food', 'unit']),
      units: t(['food', 'units']),
      consumption: 1
    },
    water: {
      label: t(['water', 'label']),
      unit: t(['water', 'unit']),
      units: t(['water', 'units']),
      consumption: 1
    },
    rum: {
      label: t(['rum', 'label']),
      unit: t(['rum', 'unit']),
      units: t(['rum', 'units']),
      consumption: 1
    },
    ...overrides
  }
}
