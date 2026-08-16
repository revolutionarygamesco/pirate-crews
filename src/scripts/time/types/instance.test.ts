import { describe, it, expect } from 'vitest'
import { primitives, getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { createWatchInstance, isWatchInstance, isWatchInstanceArray } from './instance.ts'

describe('createWatchInstance', () => {
  const name = 'Test Watch'
  const duration = 5000
  const start = 0
  const end = 1000
  const team = 'starboard'

  it('creates a watch instance object', () => {
    const instance = createWatchInstance()
    expect(isWatchInstance(instance)).toBe(true)
  })

  it('can set the watch name', () => {
    const instance = createWatchInstance({ name })
    expect(instance.name).toBe(name)
  })

  it('can set the watch duration', () => {
    const instance = createWatchInstance({ duration })
    expect(instance.duration).toBe(duration)
  })

  it('can set the watch start', () => {
    const instance = createWatchInstance({ start })
    expect(instance.start).toBe(start)
  })

  it('can set the watch end', () => {
    const instance = createWatchInstance({ end })
    expect(instance.end).toBe(end)
  })

  it('can set the watch team', () => {
    const instance = createWatchInstance({ team })
    expect(instance.team).toBe(team)
  })

  it('can set all at once', () => {
    const instance = createWatchInstance({ name, duration, start, end, team })
    expect(instance.name).toBe(name)
    expect(instance.duration).toBe(duration)
    expect(instance.start).toBe(start)
    expect(instance.end).toBe(end)
    expect(instance.team).toBe(team)
  })
})

describe('isWatchInstance', () => {
  it.each(primitives)(`rejects %s`, (_label: string, value: any) => {
    expect(isWatchInstance(value)).toBe(false)
  })

  it('accepts a WatchInstance object', () => {
    expect(isWatchInstance(createWatchInstance())).toBe(true)
  })
})

describe('isWatchInstanceArray', () => {
  it.each([
    ...getPrimitivesExcept('an empty array'),
    ['a single Watch object', createWatchInstance()],
    ['an array that includes other things', [createWatchInstance(), true]]
  ] as Array<[string, any]>)('rejects %s', (_label: string, value: any) => {
    expect(isWatchInstanceArray(value)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of Watch objects', [createWatchInstance()]],
  ] as Array<[string, any]>)('accepts %s', (_label: string, value: any) => {
    expect(isWatchInstanceArray(value)).toBe(true)
  })
})
