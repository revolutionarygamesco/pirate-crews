import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mockHooks } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../../../settings.ts'
import { isWatchInstanceArray } from '../../types/instance.ts'
import WatchSet from '../../set.ts'
import updateWorldTime from './world-time.update.ts'

vi.mock('../load.ts', () => ({
  default: () => new WatchSet()
}))

describe('updateWorldTime', () => {
  let hooks: foundry.Hooks

  beforeEach(() => {
    hooks = mockHooks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('finds the watches that have passed', () => {
    updateWorldTime(14401, 10)
    expect(hooks.callAll).toHaveBeenCalledWith(
      `${MODULE_ID}.changeWatch`,
      expect.toSatisfy((arr: unknown[]) => arr.length === 2 && isWatchInstanceArray(arr))
    )
  })

  it('doesn’t fire if there’s only one', () => {
    updateWorldTime(100, 10)
    expect(hooks.callAll).not.toHaveBeenCalled()
  })
})
