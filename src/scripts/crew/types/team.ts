import { isString } from '@revolutionarygamesco/common'

export type WatchTeam = 'starboard' | 'larboard'

export const isWatchTeam = (
  candidate: unknown
): candidate is WatchTeam => {
  return isString(candidate) && ['starboard', 'larboard'].includes(candidate)
}
