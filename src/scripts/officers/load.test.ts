import { describe, it, expect, afterEach, vi } from 'vitest'
import { MODULE_ID } from '../settings.ts'
import { createOfficers } from './officers.ts'
import loadOfficers from './load.ts'

describe('loadOfficers', () => {
  const originalSettings = game.settings

  afterEach(() => {
    game.settings = originalSettings
  })

  it('reads the officers setting', () => {
    const get = vi.fn(() => undefined)
    game.settings = { get } as unknown as foundry.Game['settings']
    loadOfficers()
    expect(get).toHaveBeenCalledWith(MODULE_ID, 'officers')
  })

  it('returns the registered officers', () => {
    const data = createOfficers({ sorcerer: { title: 'Deck Sorcerer', desc: 'Deck Sorcerer', sans: 'Some say you’re better off.', shares: 2 } })
    game.settings = { get: vi.fn(() => data) } as unknown as foundry.Game['settings']
    const actual = loadOfficers()
    expect(actual.sorcerer.title).toBe('Deck Sorcerer')
  })

  it('falls back to default if it can’t get registered data', () => {
    game.settings = { get: vi.fn(() => undefined) } as unknown as foundry.Game['settings']
    const actual = loadOfficers()
    expect(actual).toEqual(createOfficers())
  })

  it('falls back to default if registered set is invalid', () => {
    game.settings = { get: vi.fn(() => ({ nope: true })) } as unknown as foundry.Game['settings']
    const actual = loadOfficers()
    expect(actual).toEqual(createOfficers())
  })
})
