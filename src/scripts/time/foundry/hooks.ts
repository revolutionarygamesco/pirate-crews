import updateWorldTime from './hooks/world-time.update.ts'

const registerWatchHooks = () => {
  Hooks.on('updateWorldTime', updateWorldTime)
}


export default registerWatchHooks
