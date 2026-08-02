import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isOfficers, createOfficers } from './officers.ts'

const registerOfficerSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings'].join('.'))
  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: t(['officers', 'name']),
    hint: t(['officers', 'hint']),
    initial: createOfficers(),
    nullable: true,
    persisted: true,
    required: true,
    validate: (candidate: any) => isOfficers(candidate),
    validationError: t(['officers', 'error'])
  })

  game.settings.register(MODULE_ID, 'officers', {
    name: t(['officers', 'name']),
    hint: t(['officers', 'hint']),
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: createOfficers()
  })
}

export default registerOfficerSettings
