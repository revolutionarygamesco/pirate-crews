import { beforeEach, describe, it, expect, afterEach, vi } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import ArticleModel from './schema.ts'
import registerArticleHooks from './hooks.ts'

vi.mock('./schema.ts', () => ({ default: class MockCrewModel {} }))
vi.mock('./sheet.ts', () => ({ default: class MockPirateCrewSheet {} }))

describe('registerArticleHooks', () => {
  beforeEach(mockHooks)

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('init', () => {
    beforeEach(() => {
      vi.stubGlobal('CONFIG', { Item: { dataModels: {} } })
      vi.stubGlobal('foundry', {
        documents: { Item: class {} }
      })
    })

    it('registers the article type', () => {
      registerArticleHooks()
      Hooks.callAll('init')
      expect(CONFIG.Item.dataModels[`${MODULE_ID}.article`]).toBe(ArticleModel)
    })
  })
})
