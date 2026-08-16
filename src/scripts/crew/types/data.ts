import { getObjectRecord, isOptionalString } from '@revolutionarygamesco/common'
import { isCrewTeams, type CrewTeams, createCrewTeams } from './teams.ts'
import { isSpecializations, type Specializations } from './specializations.ts'

export interface CrewData {
  ship?: string
  articles?: string
  specialists: Specializations
  teams: CrewTeams
}

export const isCrewData = (
  candidate: unknown
): candidate is CrewData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isOptionalString(obj.ship),
    isOptionalString(obj.articles),
    isSpecializations(obj.specialists),
    isCrewTeams(obj.teams)
  ].every(test => test)
}

export const createCrewData = (
  overrides?: Partial<CrewData>
): CrewData => {
  return {
    specialists: {},
    teams: createCrewTeams(overrides?.teams),
    ...overrides
  }
}
