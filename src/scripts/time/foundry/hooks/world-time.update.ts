import { MODULE_ID } from '../../../settings.ts'
import loadWatches from '../load.ts'

const updateWorldTime = (
  worldTime: number,
  delta: number
): void => {
  const watches = loadWatches()
  const instances = watches.getInstancesBetween(worldTime - delta, worldTime)
  if (instances.length > 1) {
    Hooks.callAll(`${MODULE_ID}.changeWatch`, instances)
  }
}

export default updateWorldTime
