import '@revolutionarygamesco/common-foundryvtt'
import registerWatchHooks from './time/foundry/hooks.ts'

import registerWatchSettings from './time/foundry/register.ts'

registerWatchHooks()

Hooks.once('ready', () => {
  registerWatchSettings()
})
