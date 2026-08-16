import '@revolutionarygamesco/common-foundryvtt'
import registerWatchHooks from './time/foundry/hooks.ts'

import registerProvisionsSettings from './provisions/foundry/register.ts'
import registerSpecializationSettings from './crew/foundry/register.ts'
import registerWatchSettings from './time/foundry/register.ts'

registerWatchHooks()

Hooks.once('ready', () => {
  registerWatchSettings()
  registerSpecializationSettings()
  registerProvisionsSettings()
})
