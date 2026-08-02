import { MODULE_ID } from '../settings.ts'
import { isWatchSetData } from './set-data.ts'
import WatchSet from './set.ts'

const loadWatches = (): WatchSet => {
  const loaded = game.settings.get(MODULE_ID, 'watches')
  const data = isWatchSetData(loaded) ? loaded : undefined
  return new WatchSet(data)
}

export default loadWatches
