import { getObjectRecord, isNumber, isString } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isOfficerAssignments, createOfficerAssignments, type OfficerAssignments } from '../officers/assignments.ts'
import { isWatchCrews, type WatchCrew } from './watch-crew.ts'
import { isProvisions, createProvisions, type Provisions } from '../provisions/provisions.ts'

export interface CrewData {
  officers: OfficerAssignments,
  watchCrews: WatchCrew[],
  provisions: Provisions,
  stock: number,
  articles: string | null
}

export const isCrewData = (
  candidate: unknown
): candidate is CrewData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isOfficerAssignments(obj.officers),
    isWatchCrews(obj.watchCrews),
    isProvisions(obj.provisions),
    isNumber(obj.stock),
    obj.articles === null || isString(obj.articles)
  ].every(test => test)
}

export const createCrewData = (
  overrides?: Partial<CrewData>
): CrewData => {
  const t = scopeLocalizer([MODULE_ID, 'watch-crews'].join('.'))
  return {
    officers: createOfficerAssignments(overrides?.officers),
    watchCrews: [
      { name: t('starboard'), lead: 'quartermaster', members: [], onDuty: true },
      { name: t('larboard'), lead: 'master', members: [], onDuty: true }
    ],
    provisions: createProvisions(overrides?.provisions),
    stock: 0,
    articles: null,
    ...overrides
  }
}
