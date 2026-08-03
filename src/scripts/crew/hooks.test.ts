import { beforeEach, describe, it, expect, afterEach, vi, type Mock } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import CrewModel from './schema.ts'
import PirateCrewSheet from './sheet.ts'
import registerCrewHooks from './hooks.ts'

vi.mock('./schema.ts', () => ({ default: class MockCrewModel {} }))
vi.mock('./sheet.ts', () => ({ default: class MockPirateCrewSheet {} }))

describe('registerCrewHooks', () => {
  let hooks: foundry.Hooks

  beforeEach(() => {
    hooks = mockHooks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('init', () => {
    let registerSheet: Mock

    beforeEach(() => {
      registerSheet = vi.fn()
      vi.stubGlobal('CONFIG', { Actor: { dataModels: {} } })
      vi.stubGlobal('foundry', {
        documents: { Actor: class {} },
        applications: { apps: { DocumentSheetConfig: { registerSheet } } }
      })
    })

    it('registers the crew type', () => {
      registerCrewHooks()
      Hooks.callAll('init')
      expect(CONFIG.Actor.dataModels[`${MODULE_ID}.crew`]).toBe(CrewModel)
    })

    it('registers the sheet', () => {
      registerCrewHooks()
      Hooks.callAll('init')
      expect(registerSheet).toHaveBeenCalled()
      expect(registerSheet.mock.calls[0]).toContain(PirateCrewSheet)
    })
  })

  describe('preCreateActor', () => {
    let actor: foundry.documents.Actor
    let updateSource: Mock

    beforeEach(() => {
      updateSource = vi.fn()
      actor = { type: `${MODULE_ID}.crew`, img: 'icons/svg/mystery-man.svg', updateSource } as unknown as foundry.documents.Actor
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
})