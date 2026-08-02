import { getObjectRecord, isString, isNumber } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'

export interface Officer {
  title: string
  desc: string
  sans: string
  shares: number
}

export const isOfficer = (
  candidate: unknown
): candidate is Officer => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false

  return [
    isString(obj.title),
    isString(obj.desc),
    isString(obj.sans),
    isNumber(obj.shares)
  ].every(test => test)
}

export const createOfficer = (
  overrides?: Partial<Officer>
): Officer => {
  const t = scopeLocalizer([MODULE_ID, 'officers', 'captain'].join('.'))
  return {
    title: t('title'),
    desc: t('desc'),
    sans: t('sans'),
    shares: 2,
    ...overrides
  }
}
