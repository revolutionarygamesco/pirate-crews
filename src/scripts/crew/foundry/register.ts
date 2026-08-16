import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { isSpecializationDefinitions, createSpecializationDefinitions } from '../types/definitions.ts'

const registerSpecializationSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings', 'specialization'].join('.'))
  const name = t('name')
  const hint = t('hint')
  const initial = createSpecializationDefinitions()

  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: name,
    hint,
    initial,
    nullable: true,
    persisted: true,
    required: true,
    validate: isSpecializationDefinitions,
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
