import { MODULE_ID } from '../../settings.ts'
import { isProvisionDefinitions, createProvisionDefinitions, type ProvisionDefinitions } from '../types/definitions.ts'

const loadProvisions = (): ProvisionDefinitions => {
  const loaded = game.settings.get(MODULE_ID, 'provisions')
  const data = isProvisionDefinitions(loaded) ? loaded : undefined
  return data ?? createProvisionDefinitions()
}

export default loadProvisions
