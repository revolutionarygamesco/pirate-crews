import { beforeEach, describe, it, expect, afterEach, vi, type Mock } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
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

  describe('getActorContextOptions', () => {
    const id = generateID()
    let actor: foundry.documents.Actor
    let sheet: PirateCrewSheet
    let edit: { label: string, onClick: Mock }
    let entries: Array<{ label: string, onClick: Mock }>
    let el: HTMLElement

    beforeEach(() => {
      sheet = new PirateCrewSheet({})
      actor = { sheet } as unknown as foundry.documents.Actor
      el = { closest: () => ({ dataset: { entryId: id } }) } as unknown as HTMLElement
      edit = { label: 'SIDEBAR.Edit', onClick: vi.fn().mockReturnValue('original') }
      entries = [edit]
      vi.stubGlobal('game', { actors: new Map([[id, actor]]) })
    })

    it('listens for the context menu', () => {
      registerCrewHooks()
      expect(hooks.on).toHaveBeenCalledWith('getActorContextOptions', expect.any(Function))
    })

    it('does nothing when there is no Edit entry', () => {
      registerCrewHooks()
      const other = [{ label: 'SIDEBAR.Export', onClick: vi.fn() }]
      const orig = other[0].onClick
      expect(() => Hooks.callAll('getActorContextOptions', {}, other)).not.toThrow()
      expect(other[0].onClick).toBe(orig)
    })

    it('opens the crew sheet in edit mode', () => {
      registerCrewHooks()
      const original = edit.onClick
      Hooks.callAll('getActorContextOptions', {}, entries)

      const event = {} as PointerEvent
      const result = edit.onClick(event, el)

      expect(sheet.editing).toBe(true)
      expect(original).toHaveBeenCalledWith(event, el)
      expect(result).toBe('original')
    })
  })
})