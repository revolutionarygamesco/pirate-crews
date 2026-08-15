import { getObjectRecord, isNumber } from '@revolutionarygamesco/common'
import { type Watch, isWatchArray } from './watch.ts'

export const SECONDS_PER_HOUR = 60 * 60

export interface WatchSetData {
  watches: Watch[]
  offset: number
}

export const createWatchSetData = (
  overrides?: Partial<WatchSetData>
): WatchSetData => {
  return {
    watches: [
      { name: 'First Watch', duration: 4 * SECONDS_PER_HOUR },
      { name: 'Middle Watch', duration: 4 * SECONDS_PER_HOUR },
      { name: 'Morning Watch', duration: 4 * SECONDS_PER_HOUR },
      { name: 'Forenoon Watch', duration: 4 * SECONDS_PER_HOUR },
      { name: 'Afternoon Watch', duration: 4 * SECONDS_PER_HOUR },
      { name: 'First Dog Watch', duration: 2 * SECONDS_PER_HOUR },
      { name: 'Second Dog Watch', duration: 2 * SECONDS_PER_HOUR }
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
