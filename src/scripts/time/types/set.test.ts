import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { createWatchSetData, isWatchSetData } from './set.ts'

describe('createWatchSetData', () => {
  const name = 'Test Watch'
  const duration = 5000

  it('creates a watch set data object', () => {
    const data = createWatchSetData()
    expect(isWatchSetData(data)).toBe(true)
  })

  it('can set the watches', () => {
    const data = createWatchSetData({ watches: [{ name, duration, idlers: true }] })
    expect(data.watches).toHaveLength(1)
    expect(data.watches[0].name).toBe(name)
    expect(data.watches[0].duration).toBe(duration)
  })

  it('can set the offset', () => {
    const data = createWatchSetData({ offset: 0 })
    expect(data.offset).toBe(0)
  })

  it('can set both', () => {
    const data = createWatchSetData({ watches: [{ name, duration, idlers: true }], offset: 0 })
    expect(data.watches).toHaveLength(1)
    expect(data.watches[0].name).toBe(name)
    expect(data.watches[0].duration).toBe(duration)
    expect(data.offset).toBe(0)
  })
})

describe('isWatchSetData', () => {
  it.each(primitives)(`rejects %s`, (_label: string, value: any) => {
    expect(isWatchSetData(value)).toBe(false)
  })

  it('accepts a WatchSetData object', () => {
    expect(isWatchSetData(createWatchSetData())).toBe(true)
  })
})
