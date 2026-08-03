import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isProvisionTypes, createProvisionTypes } from './types.ts'

const registerProvisions = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings'].join('.'))
  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: t(['provisions', 'name']),
    hint: t(['provisions', 'hint']),
    initial: createProvisionTypes(),
    nullable: true,
    persisted: true,
    required: true,
    validate: (candidate: any) => isProvisionTypes(candidate),
    validationError: t(['provisions', 'error'])
  })

  game.settings.register(MODULE_ID, 'provisions', {
    name: t(['provisions', 'name']),
    hint: t(['provisions', 'hint']),
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: createProvisionTypes()
  })
}

export default registerProvisions
