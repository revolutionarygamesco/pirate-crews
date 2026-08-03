import { MODULE_NAME } from './settings.ts'
import registerOfficerSettings from './officers/register.ts'
import registerProvisions from './provisions/register.ts'
import registerWatchSettings from './watch/register.ts'
import registerWatchHooks from './watch/hooks.ts'

Hooks.on('ready', () => {
  console.log(`Registering ${MODULE_NAME} settings...`)
  registerWatchSettings()
  registerOfficerSettings()
  registerProvisions()

  registerWatchHooks()
})
