import { getDroppedDocument } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import registerOfficerSettings from './officers/register.ts'
import registerProvisions from './provisions/register.ts'
import registerWatchSettings from './watch/register.ts'
import registerCrewHooks from './crew/hooks.ts'
import registerPirateCrewSharesArticleEnricher from './articles/enrich.ts'
import registerWatchHooks from './watch/hooks.ts'

registerCrewHooks()
registerWatchHooks()
registerPirateCrewSharesArticleEnricher()

Hooks.once('ready', () => {
  registerWatchSettings()
  registerOfficerSettings()
  registerProvisions()
})

// Hook that Pirate Borg Crews would implement, here for testing and development
Hooks.on(`${MODULE_ID}.dropShip`, async (actor: foundry.documents.Actor, event: DragEvent) => {
  const ship = await getDroppedDocument<foundry.documents.Actor>(event, 'Actor')
  if (ship?.type !== 'vehicle') return
  await actor.update({ 'system.ship': ship.uuid })
})
