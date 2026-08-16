import { describe, it, expect, afterEach, vi } from 'vitest'
import { MODULE_ID } from '../../settings.ts'
import { createSpecializationDefinitionFromKey } from '../types/specialization.ts'
import { createSpecializationDefinitions } from '../types/definitions.ts'
import loadSpecializationDefinitions from './load.ts'

describe('loadSpecializationDefinitions', () => {
  const originalSettings = game.settings
  const fallback = createSpecializationDefinitions()

  afterEach(() => {
    game.settings = originalSettings
  })

  it('reads the specializations setting', () => {
    const get = vi.fn(() => undefined)
    game.settings = { get } as unknown as foundry.Game['settings']
    loadSpecializationDefinitions()
    expect(get).toHaveBeenCalledWith(MODULE_ID, 'specializations')
  })

  it('returns the registered definitions', () => {
    const data = { captain: createSpecializationDefinitionFromKey('captain') }
    game.settings = { get: vi.fn(() => data) } as unknown as foundry.Game['settings']
    const actual = loadSpecializationDefinitions()
    expect(actual).toEqual(data)
  })

  it('falls back to default if it can’t get a registered set', () => {
    game.settings = { get: vi.fn(() => undefined) } as unknown as foundry.Game['settings']
    const actual = loadSpecializationDefinitions()
    expect(actual).toEqual(fallback)
  })

  it('falls back to default if registered set is invalid', () => {
    game.settings = { get: vi.fn(() => ({ nope: true })) } as unknown as foundry.Game['settings']
    const actual = loadSpecializationDefinitions()
    expect(actual).toEqual(fallback)
  })
})
