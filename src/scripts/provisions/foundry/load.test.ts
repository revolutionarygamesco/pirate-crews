import { describe, it, expect, afterEach, vi } from 'vitest'
import { MODULE_ID } from '../../settings.ts'
import { createProvisionDefinitions, type ProvisionDefinitions } from '../types/definitions.ts'
import loadProvisions from './load.ts'

describe('loadProvisions', () => {
  const originalSettings = game.settings

  afterEach(() => {
    game.settings = originalSettings
  })

  it('reads the provisions setting', () => {
    const get = vi.fn(() => undefined)
    game.settings = { get } as unknown as foundry.Game['settings']
    loadProvisions()
    expect(get).toHaveBeenCalledWith(MODULE_ID, 'provisions')
  })

  it('returns the registered provision types', () => {
    const data: ProvisionDefinitions = { white: { label: 'Ketracel-white', unit: 'dose', units: 'doses', consumption: 1 } }
    game.settings = { get: vi.fn(() => data) } as unknown as foundry.Game['settings']
    const actual = loadProvisions()
    expect(actual.white.label).toBe('Ketracel-white')
  })

  it('falls back to default if it can’t get registered data', () => {
    game.settings = { get: vi.fn(() => undefined) } as unknown as foundry.Game['settings']
    const actual = loadProvisions()
    expect(actual).toEqual(createProvisionDefinitions())
  })

  it('falls back to default if registered set is invalid', () => {
    game.settings = { get: vi.fn(() => ({ nope: true })) } as unknown as foundry.Game['settings']
    const actual = loadProvisions()
    expect(actual).toEqual(createProvisionDefinitions())
  })
})
