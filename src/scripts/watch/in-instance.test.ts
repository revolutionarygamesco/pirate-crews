import { describe, it, expect } from 'vitest'
import { createWatchInstance } from './instance.ts'
import isInWatchInstance from './in-instance.ts'

describe('isInWatchInstance', () => {
  const instance = createWatchInstance({ start: 200, end: 300 })

  it.each([
    [false, 'before', 100],
    [false, 'after', 400],
    [false, 'at very beginning of', 200],
    [true, 'one second after start of', 201],
    [true, 'in middle of', 250],
    [true, 'at the very last second of', 300]
  ] as Array<[boolean, string, number]>)('returns %s if timestamp is %s watch instance', (expected: boolean, _description: string, timestamp: number) => {
    expect(isInWatchInstance(instance, timestamp)).toBe(expected)
  })
})
