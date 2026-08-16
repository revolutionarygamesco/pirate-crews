import { getObjectRecord, isStringArray } from '@revolutionarygamesco/common'
import { isWatchTeam, type WatchTeam } from './team.ts'

export interface CrewTeams {
  starboard: string[]
  larboard: string[]
  onDuty: WatchTeam
}

export const isCrewTeams = (
  candidate: unknown
): candidate is CrewTeams => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isStringArray(obj.starboard),
    isStringArray(obj.larboard),
    isWatchTeam(obj.onDuty)
  ].every(test => test)
}

export const createCrewTeams = (
  overrides?: Partial<CrewTeams>
): CrewTeams => {
  return {
    starboard: [],
    larboard: [],
    onDuty: 'starboard',
    ...overrides
  }
}
