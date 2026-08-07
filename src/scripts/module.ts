import registerOfficerSettings from './officers/register.ts'
import registerProvisions from './provisions/register.ts'
import registerWatchSettings from './watch/register.ts'
import registerArticleHooks from './articles/hooks.ts'
import registerCrewHooks from './crew/hooks.ts'
import registerWatchHooks from './watch/hooks.ts'

registerArticleHooks()
registerCrewHooks()
registerWatchHooks()

Hooks.on('init', () => {
  registerWatchSettings()
  registerOfficerSettings()
  registerProvisions()
})
