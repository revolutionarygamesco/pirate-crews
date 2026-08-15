import '@revolutionarygamesco/common-foundryvtt'
import { MODULE_NAME } from './settings.ts'
import registerWatchHooks from './time/foundry/hooks.ts'

registerWatchHooks()

Hooks.on('init', () => {
  console.log(`Initializing ${MODULE_NAME}...`)
})

Hooks.on('ready', () => {
  console.log(`${MODULE_NAME} is ready`)
})
