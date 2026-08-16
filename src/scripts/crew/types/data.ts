import { getObjectRecord, isOptionalString, isObject } from '@revolutionarygamesco/common'
import { isCrewTeams, type CrewTeams, createCrewTeams } from './teams.ts'
import { isSpecialization, type Specialization } from './specialization.ts'

export interface CrewData {
  ship?: string
  articles?: string
  specialists: Record<string, Specialization>
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
    isObject(obj.specialists) && Object.values(obj.specialists).every(item => isSpecialization(item)),
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
