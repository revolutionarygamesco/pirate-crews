import { getObjectRecord, isNumber } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { type Watch, isWatchArray } from './watch.ts'

export const SECONDS_PER_HOUR = 60 * 60

export interface WatchSetData {
  watches: Watch[]
  offset: number
}

export const createWatchSetData = (
  overrides?: Partial<WatchSetData>
): WatchSetData => {
  const t = scopeLocalizer([MODULE_ID, 'watches'].join('.'))
  return {
    watches: [
      { name: t('first'), duration: 4 * SECONDS_PER_HOUR },
      { name: t('middle'), duration: 4 * SECONDS_PER_HOUR },
      { name: t('morning'), duration: 4 * SECONDS_PER_HOUR },
      { name: t('forenoon'), duration: 4 * SECONDS_PER_HOUR },
      { name: t('afternoon'), duration: 4 * SECONDS_PER_HOUR },
      { name: t('dog1'), duration: 2 * SECONDS_PER_HOUR },
      { name: t('dog2'), duration: 2 * SECONDS_PER_HOUR }
    ],
    offset: -4 * SECONDS_PER_HOUR,
    ...overrides
  }
}

export const isWatchSetData = (
  candidate: unknown
): candidate is WatchSetData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isWatchArray(obj.watches),
    isNumber(obj.offset),
  ].every(test => test === true)
}
