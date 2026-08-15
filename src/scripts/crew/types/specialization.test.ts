import { describe, it, expect, beforeEach } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { mockLocalize } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../../settings.ts'
import {
  isSpecializationDefinition,
  isSpecialization,
  createSpecializationDefinitionFromKey,
  createSpecializationFromKey,
  createSpecializationDefinition,
  createSpecialization
} from './specialization.ts'

const mockTitles = () => {
  const dict: Record<string, string> = {}
  dict[`${MODULE_ID}.specialists.captain`] = 'Captain'
  mockLocalize(dict)
}

describe('isSpecializationDefinition', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isSpecializationDefinition(value)).toBe(false)
  })

  it('accepts a specialization definition', () => {
    expect(isSpecializationDefinition({
      title: 'Deck Sorcerer',
      required: false
    })).toBe(true)
  })
})

describe('isSpecialization', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isSpecialization(value)).toBe(false)
  })

  it('accepts a specialization', () => {
    expect(isSpecialization({
      title: 'Deck Sorcerer',
      required: false
    })).toBe(true)
  })
})

describe('createSpecializationDefinitionFromKey', () => {
  beforeEach(mockTitles)

  it('creates a specialization definition from a key', () => {
    expect(createSpecializationDefinitionFromKey('captain')).toEqual({
      title: 'Captain',
      required: true
    })
  })
})

describe('createSpecializationFromKey', () => {
  beforeEach(mockTitles)

  it('creates a specialization from a key', () => {
    expect(createSpecializationFromKey('captain')).toEqual({
      title: 'Captain',
      required: true,
      shares: 2
    })
  })
})

describe('createSpecializationDefinition', () => {
  it('creates a specialization definition', () => {
    expect(isSpecializationDefinition(createSpecializationDefinition())).toBe(true)
  })

  it('can override properties', () => {
    const title = 'Deck Sorcerer'
    const actual = createSpecializationDefinition({ title })
    expect(actual.title).toBe(title)
  })
})

describe('createSpecialization', () => {
  it('creates a specialization', () => {
    expect(isSpecialization(createSpecialization())).toBe(true)
  })

  it('can override properties', () => {
    const title = 'Deck Sorcerer'
    const actual = createSpecialization({ title })
    expect(actual.title).toBe(title)
  })
})
