import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isWatchSetData } from './set-data.ts'
import WatchSet from './set.ts'

const registerWatchSettings = (): void => {
  const t = scopeLocalizer([MODULE_ID, 'settings'].join('.'))
  const instance = new WatchSet()
  const type = new foundry.data.fields.JSONField({
    gmOnly: true,
    label: t(['watches', 'name']),
    hint: t(['watches', 'hint']),
    initial: instance.toObject(),
    nullable: true,
    persisted: true,
    required: true,
    validate: (candidate: any) => isWatchSetData(candidate),
    validationError: t(['watches', 'error'])
  })

  game.settings.register(MODULE_ID, 'watches', {
    name: t(['watches', 'name']),
    hint: t(['watches', 'hint']),
    scope: 'world',
    config: true,
    requiresReload: true,
    type,
    default: instance.toObject()
  })
}

export default registerWatchSettings
