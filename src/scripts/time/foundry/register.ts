import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { isWatchSetData } from '../types/set.ts'
import WatchSet from '../set.ts'

const registerWatchSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings'].join('.'))
  const name = t(['watches', 'name'])
  const hint = t(['watches', 'hint'])
  const initial = (new WatchSet()).toObject()

  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: name,
    hint,
    initial,
    nullable: true,
    persisted: true,
    required: true,
    validate: (candidate: any) => isWatchSetData(candidate),
    validationError: t(['watches', 'error'])
  })

  game.settings.register(MODULE_ID, 'watches', {
    name,
    hint,
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: initial
  })
}

export default registerWatchSettings
