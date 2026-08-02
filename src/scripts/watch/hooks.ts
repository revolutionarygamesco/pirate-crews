import { MODULE_ID } from '../settings.ts'
import loadWatches from './load.ts'

const registerWatchHooks = () => {
  Hooks.on('updateWorldTime', (worldTime: number, delta: number) => {
    const watches = loadWatches()
    const instances = watches.getInstancesBetween(worldTime - delta, worldTime)
    if (instances.length > 1) {
      Hooks.callAll(`${MODULE_ID}.changeWatch`, instances)
    }
  })
}


export default registerWatchHooks
