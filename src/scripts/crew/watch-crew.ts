import { getObjectRecord, isString, isStringArray, makeArrayGuard } from '@revolutionarygamesco/common'
import { MODULE_ID } from '../settings.ts'

export interface WatchCrew {
  name: string
  lead: string
  members: string[]
  onDuty: boolean
}

export const isWatchCrew = (
  candidate: unknown
): candidate is WatchCrew => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isString(obj.name),
    isString(obj.lead),
    isStringArray(obj.members),
    obj.onDuty === true || obj.onDuty === false
  ].every(test => test)
}

export const isWatchCrews = makeArrayGuard<WatchCrew>(isWatchCrew)

export const createWatchCrew = (
  overrides?: Partial<WatchCrew>
): WatchCrew => {
  return {
    name: game.i18n.localize([MODULE_ID, 'watch-crews', 'starboard'].join('.')),
    lead: 'quartermaster',
    members: [],
    onDuty: false,
    ...overrides
  }
}
