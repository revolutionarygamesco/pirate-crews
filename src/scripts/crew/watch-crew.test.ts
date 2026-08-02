import { describe, it, expect } from 'vitest'
import { primitives, getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { generateID } from '@revolutionarygamesco/common-foundryvtt'
import { isWatchCrew, isWatchCrews, createWatchCrew } from './watch-crew.ts'

describe('isWatchCrew', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isWatchCrew(value)).toBe(false)
  })

  it('accepts a watch crew', () => {
    expect(isWatchCrew({
      name: 'Starboard Crew',
      lead: 'quartermaster',
      members: [`Actor.${generateID()}`, `Actor.${generateID()}`, `Actor.${generateID()}`],
      onDuty: false,
    })).toBe(true)
  })
})

describe('isWatchCrews', () => {
  it.each([
    ...getPrimitivesExcept('an empty array')
  ])('rejects %s', (_label, value) => {
    expect(isWatchCrews(value)).toBe(false)
  })

  it('rejects a single watch crew', () => {
    expect(isWatchCrews(createWatchCrew())).toBe(false)
  })

  it('accepts an empty array', () => {
    expect(isWatchCrews([])).toBe(true)
  })

  it('accepts an array of watch crew', () => {
    expect(isWatchCrews([createWatchCrew()])).toBe(true)
  })
})

describe('createWatchCrew', () => {
  it('creates a watch crew', () => {
    expect(isWatchCrew(createWatchCrew())).toBe(true)
  })
})
