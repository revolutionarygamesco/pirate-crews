import { describe, it, expect } from 'vitest'
import { primitives, getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { createWatch, isWatch, isWatchArray } from './watch.ts'

describe('createWatch', () => {
  const name = 'Test Watch'
  const duration = 5000

  it('creates a watch object', () => {
    const watch = createWatch()
    expect(isWatch(watch)).toBe(true)
  })

  it('can set the watch name', () => {
    const watch = createWatch({ name })
    expect(watch.name).toBe(name)
  })

  it('can set the watch duration', () => {
    const watch = createWatch({ duration })
    expect(watch.duration).toBe(duration)
  })

  it('can set both', () => {
    const watch = createWatch({ name, duration })
    expect(watch.name).toBe(name)
    expect(watch.duration).toBe(duration)
  })
})

describe('isWatch', () => {
  it.each(primitives)(`rejects %s`, (_label: string, value: any) => {
    expect(isWatch(value)).toBe(false)
  })

  it('accepts a Watch object', () => {
    expect(isWatch(createWatch())).toBe(true)
  })
})

describe('isWatchArray', () => {
  it.each([
    ...getPrimitivesExcept('an empty array'),
    ['a single Watch object', createWatch()],
    ['an array that includes other things', [createWatch(), true]]
  ] as Array<[string, any]>)('rejects %s', (_label: string, value: any) => {
    expect(isWatchArray(value)).toBe(false)
  })

  it.each([
    ['an empty array', []],
    ['an array of Watch objects', [createWatch()]]
  ] as Array<[string, any]>)('accepts %s', (_label: string, value: any) => {
    expect(isWatchArray(value)).toBe(true)
  })
})
