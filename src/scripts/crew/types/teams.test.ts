import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isCrewTeams, createCrewTeams } from './teams.ts'

describe('isCrewTeams', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isCrewTeams(value)).toBe(false)
  })

  it('accepts crew teams', () => {
    expect(isCrewTeams({
      starboard: [],
      larboard: [],
      onDuty: 'starboard'
    }))
  })
})

describe('createCrewTeams', () => {
  it('creates crew teams', () => {
    expect(isCrewTeams(createCrewTeams())).toBe(true)
  })

  it('can override properties', () => {
    const actual = createCrewTeams({ onDuty: 'larboard' })
    expect(actual.onDuty).toBe('larboard')
  })
})