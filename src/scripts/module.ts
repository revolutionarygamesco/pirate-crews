import registerOfficerSettings from './officers/register.ts'
import registerProvisions from './provisions/register.ts'
import registerWatchSettings from './watch/register.ts'
import registerCrewHooks from './crew/hooks.ts'
import registerPirateCrewSharesArticleEnricher from './articles/enrich.ts'
import registerWatchHooks from './watch/hooks.ts'

registerCrewHooks()
registerWatchHooks()
registerPirateCrewSharesArticleEnricher()

Hooks.on('init', () => {
  registerWatchSettings()
  registerOfficerSettings()
  registerProvisions()
})
