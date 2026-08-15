import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isWatchTeam, type WatchTeam } from './team.ts'

describe('isWatchTeam', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isWatchTeam(value)).toBe(false)
  })

  it.each(['starboard', 'larboard'] as WatchTeam[])('accepts %s', (value) => {
    expect(isWatchTeam(value)).toBe(true)
  })
})
