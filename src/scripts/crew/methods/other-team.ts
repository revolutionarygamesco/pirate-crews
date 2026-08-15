import { type WatchTeam } from '../types/team.ts'

const getOtherTeam = (
  curr: WatchTeam
): WatchTeam => curr === 'starboard' ? 'larboard' : 'starboard'

export default getOtherTeam
