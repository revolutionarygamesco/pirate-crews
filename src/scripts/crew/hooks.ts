import { MODULE_ID } from '../settings.ts'

const registerCrewHooks = () => {
  Hooks.on('preCreateActor', (actor: any) => {
    if (actor.type === `${MODULE_ID}.crew` && actor.img === 'icons/svg/mystery-man.svg') {
      actor.updateSource({ img: `modules/${MODULE_ID}/images/pirate.webp` })
    }
  })
}

export default registerCrewHooks
