import { beforeEach, describe, it, expect, afterEach, vi } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import loadWatches from './load.ts'
import registerWatchHooks from './hooks.ts'

vi.mock('./load.ts', () => ({
  default: vi.fn()
}))

describe('registerWatchHooks', () => {
  let hooks: foundry.Hooks

  beforeEach(() => {
    hooks = mockHooks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.mocked(loadWatches).mockReset()
  })

  it('listens for changes to world time', () => {
    registerWatchHooks()
    expect(hooks.on).toHaveBeenCalledWith('updateWorldTime', expect.any(Function))
  })

  it('finds the watches between', () => {
    const instances = [
      { name: 'Test Watch 1', duration: 100, start: 900, end: 1000 },
      { name: 'Test Watch 2', duration: 100, start: 1000, end: 1100 }
    ]
    const getInstancesBetween = vi.fn(() => instances)
    vi.mocked(loadWatches).mockReturnValue({ getInstancesBetween } as any)
    registerWatchHooks()
    Hooks.callAll('updateWorldTime', 1000, 1)
    expect(getInstancesBetween).toHaveBeenCalledWith(999, 1000)
    expect(hooks.callAll).toHaveBeenCalledWith(`${MODULE_ID}.changeWatch`, instances)
  })

  it('doesn’t fire if there’s only one', () => {
    const instances = [
      { name: 'Test Watch 1', duration: 100, start: 900, end: 1000 }
    ]
    const getInstancesBetween = vi.fn(() => instances)
    vi.mocked(loadWatches).mockReturnValue({ getInstancesBetween } as any)
    registerWatchHooks()
    Hooks.callAll('updateWorldTime', 951, 1)
    expect(getInstancesBetween).toHaveBeenCalledWith(950, 951)
    expect(hooks.callAll).not.toHaveBeenCalledWith(`${MODULE_ID}.changeWatch`, expect.anything())
  })
})
