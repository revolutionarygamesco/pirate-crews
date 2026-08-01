import { MODULE_NAME } from './settings.ts'
import registerWatchSettings from './watch/register.ts'

Hooks.on('ready', () => {
  console.log(`Registering ${MODULE_NAME} settings...`)
  registerWatchSettings()
})
