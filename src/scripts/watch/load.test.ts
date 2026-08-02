import { describe, it, expect, afterEach, vi } from 'vitest'
import { MODULE_ID } from '../settings.ts'
import { createWatchSetData } from './set-data.ts'
import WatchSet from './set.ts'
import loadWatches from './load.ts'

describe('loadWatches', () => {
  const originalSettings = game.settings

  afterEach(() => {
    game.settings = originalSettings
  })

  it('reads the watches setting', () => {
    const get = vi.fn(() => undefined)
    game.settings = { get } as unknown as foundry.Game['settings']
    loadWatches()
    expect(get).toHaveBeenCalledWith(MODULE_ID, 'watches')
  })

  it('returns the registered watch set', () => {
    const data = createWatchSetData({ offset: 1000 })
    game.settings = { get: vi.fn(() => data) } as unknown as foundry.Game['settings']
    const actual = loadWatches()

    expect(actual).toBeInstanceOf(WatchSet)
    expect(actual.offset).toBe(1000)
    expect(actual.watches).toEqual(data.watches)
  })

  it('falls back to default if it can’t get a registered set', () => {
    game.settings = { get: vi.fn(() => undefined) } as unknown as foundry.Game['settings']
    const actual = loadWatches()
    const fallback = new WatchSet()
    expect(actual.toObject()).toEqual(fallback.toObject())
  })

  it('falls back to default if registered set is invalid', () => {
    game.settings = { get: vi.fn(() => ({ nope: true })) } as unknown as foundry.Game['settings']
    const actual = loadWatches()
    const fallback = new WatchSet()
    expect(actual.toObject()).toEqual(fallback.toObject())
  })
})
