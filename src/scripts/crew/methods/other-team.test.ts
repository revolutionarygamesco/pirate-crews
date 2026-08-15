import { describe, it, expect } from 'vitest'
import { type WatchTeam } from '../types/team.ts'
import getOtherTeam from './other-team.ts'

describe('getOtherTeam', () => {
  it.each([
    ['starboard', 'larboard'],
    ['larboard', 'starboard']
  ] as Array<[WatchTeam, WatchTeam]>)('returns %s when given %s', (expected, input) => {
    expect(getOtherTeam(input)).toBe(expected)
  })
})
