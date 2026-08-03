import { MODULE_ID, MODULE_NAME } from './settings.ts'
import { type CrewData } from './crew/data.ts'
import CrewModel from './crew/schema.ts'
import registerOfficerSettings from './officers/register.ts'
import registerProvisions from './provisions/register.ts'
import registerWatchSettings from './watch/register.ts'
import registerWatchHooks from './watch/hooks.ts'

Hooks.on('init', () => {
  registerWatchSettings()
  registerOfficerSettings()
  registerProvisions()

  const models: Record<string, typeof foundry.abstract.TypeDataModel<CrewData>> = {}
  models[`${MODULE_ID}.crew`] = CrewModel
  Object.assign(CONFIG.Actor.dataModels, models)
})

Hooks.on('ready', () => {
  console.log(`Registering ${MODULE_NAME} settings...`)
  registerWatchHooks()
})
