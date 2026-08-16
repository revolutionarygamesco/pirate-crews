import { getObjectRecord } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import {
  createSpecializationDefinitionFromKey,
  isSpecializationDefinition,
  type SpecializationDefinition
} from '../types/specialization.ts'

const registerSpecializationSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings', 'specialization'].join('.'))
  const name = t('name')
  const hint = t('hint')
  const keys = ['captain', 'quartermaster', 'master', 'master-mate', 'bosun',
    'bosun-mate', 'gunner', 'gunner-mate', 'carpenter', 'carpenter-mate',
    'surgeon', 'surgeon-mate', 'cooper', 'cooper-mate', 'armorer',
    'armorer-mate', 'sailmaker', 'sailmaker-mate', 'cook']
  const initial: Record<string, SpecializationDefinition> = {}
  for (const key of keys) initial[key] = createSpecializationDefinitionFromKey(key)

  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: name,
    hint,
    initial,
    nullable: true,
    persisted: true,
    required: true,
    validate: (candidate: any) => {
      const obj = getObjectRecord(candidate)
      if (!obj) return false
      return Object.keys(obj).every(key => isSpecializationDefinition(obj[key]))
    },
    validationError: t('error'),
  })

  game.settings.register(MODULE_ID, 'specializations', {
    name,
    hint,
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: initial
  })
}

export default registerSpecializationSettings
