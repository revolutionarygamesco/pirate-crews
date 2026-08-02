import { getObjectRecord } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { isProvision, type Provision } from './provision.ts'
import { MODULE_ID } from '../settings.ts'

export interface Provisions {
  [key: string]: Provision
}

export const isProvisions = (
  candidate: unknown
): candidate is Provisions => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false

  for (const key in obj) {
    if (!isProvision(obj[key])) return false
  }

  return true
}

export const createProvisions = (
  overrides?: Record<string, Partial<Provision>>
): Provisions => {
  const t = scopeLocalizer([MODULE_ID, 'provisions'].join('.'))
  return {
    food: {
      label: t(['food', 'label']),
      unit: t(['food', 'unit']),
      units: t(['food', 'units']),
      consumption: 1,
      value: 0
    },
    water: {
      label: t(['water', 'label']),
      unit: t(['water', 'unit']),
      units: t(['water', 'units']),
      consumption: 1,
      value: 0
    },
    rum: {
      label: t(['rum', 'label']),
      unit: t(['rum', 'unit']),
      units: t(['rum', 'units']),
      consumption: 1,
      value: 0
    },
    ...overrides
  }
}
