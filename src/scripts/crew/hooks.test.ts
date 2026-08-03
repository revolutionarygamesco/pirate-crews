import { beforeEach, describe, it, expect, afterEach, vi, type Mock } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import registerCrewHooks from './hooks.ts'

describe('registerCrewHooks', () => {
  let hooks: foundry.Hooks
  let actor: foundry.documents.Actor
  let updateSource: Mock

  beforeEach(() => {
    hooks = mockHooks()
    updateSource = vi.fn()
    actor = { type: `${MODULE_ID}.crew`, img: 'icons/svg/mystery-man.svg', updateSource } as unknown as foundry.documents.Actor
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('listens for actor creation', () => {
    registerCrewHooks()
    expect(hooks.on).toHaveBeenCalledWith('preCreateActor', expect.any(Function))
  })

  it('sets the default image', () => {
    registerCrewHooks()
    Hooks.callAll('preCreateActor', actor)
    expect(updateSource).toHaveBeenCalledWith({ img: `modules/${MODULE_ID}/images/pirate.webp` })
  })

  it('leaves a custom image alone', () => {
    actor.img = 'custom/image.webp'
    registerCrewHooks()
    Hooks.callAll('preCreateActor', actor)
    expect(updateSource).not.toHaveBeenCalled()
  })

  it('ignores other actors', () => {
    actor.type = 'creature'
    registerCrewHooks()
    Hooks.callAll('preCreateActor', actor)
    expect(updateSource).not.toHaveBeenCalled()
  })
})
