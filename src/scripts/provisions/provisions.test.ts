import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createProvisionsData, isProvisionsData } from './types/provisions.ts'
import Provisions from './provisions.ts'

describe('Provisions', () => {
  const originalSettings = game.settings

  beforeEach(() => {
    const get = vi.fn(() => createProvisionsData())
    game.settings = { get } as unknown as foundry.Game['settings']
  })

  afterEach(() => {
    game.settings = originalSettings
  })

  describe('constructor', () => {
    it('creates provisions', () => {
      expect(new Provisions()).toBeInstanceOf(Provisions)
    })

    it('can load provisions data', () => {
      const actual = new Provisions({ white: { store: 50, rationing: 0.5, skip: false } })
      expect(actual.data.white.store).toBe(50)
      expect(actual.data.white.rationing).toBe(0.5)
      expect(actual.data.white.skip).toBe(false)
    })

    it('loads default provisions if no data is provided', () => {
      const actual = new Provisions()
      for (const key of ['food', 'water', 'rum']) {
        expect(actual.data[key].store).toBe(0)
        expect(actual.data[key].rationing).toBe(1)
        expect(actual.data[key].skip).toBe(false)
      }
    })
  })

  describe('Instance methods', () => {
    describe('toObject', () => {
      it('returns a ProvisionsData object', () => {
        const actual = new Provisions()
        expect(isProvisionsData(actual.toObject())).toBe(true)
      })
    })
  })
})
