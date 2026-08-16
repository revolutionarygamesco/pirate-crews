import { MODULE_ID } from '../../settings.ts'
import {
  isSpecializationDefinitions,
  createSpecializationDefinitions,
  type SpecializationDefinitions
} from '../types/definitions.ts'

const loadSpecializationDefinitions = (): SpecializationDefinitions => {
  const loaded = game.settings.get(MODULE_ID, 'specializations')
  const data = isSpecializationDefinitions(loaded) ? loaded : undefined
  return data ?? createSpecializationDefinitions()
}

export default loadSpecializationDefinitions
