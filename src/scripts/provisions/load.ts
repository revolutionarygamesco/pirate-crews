import { MODULE_ID } from '../settings.ts'
import { isProvisionTypes, createProvisionTypes, type ProvisionTypes } from './types.ts'

const loadProvisions = (): ProvisionTypes => {
  const loaded = game.settings.get(MODULE_ID, 'provisions')
  const data = isProvisionTypes(loaded) ? loaded : undefined
  return createProvisionTypes(data)
}

export default loadProvisions
