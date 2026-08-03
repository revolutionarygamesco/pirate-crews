import { MODULE_ID } from '../settings.ts'
import { isOfficers, createOfficers, type Officers } from './officers.ts'

const loadOfficers = (): Officers => {
  const loaded = game.settings.get(MODULE_ID, 'officers')
  const data = isOfficers(loaded) ? loaded : undefined
  return createOfficers(data)
}

export default loadOfficers
