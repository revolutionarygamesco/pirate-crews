import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { isProvisionDefinitions, createProvisionDefinitions } from '../types/definitions.ts'

const registerProvisionsSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings', 'provisions'].join('.'))
  const name = t('name')
  const hint = t('hint')
  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: name,
    hint,
    initial: createProvisionDefinitions(),
    nullable: true,
    persisted: true,
    required: true,
    validate: isProvisionDefinitions,
    validationError: t('error')
  })

  game.settings.register(MODULE_ID, 'provisions', {
    name,
    hint,
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: createProvisionDefinitions()
  })
}

export default registerProvisionsSettings
