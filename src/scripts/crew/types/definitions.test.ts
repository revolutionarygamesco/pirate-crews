import { describe, it, expect } from 'vitest'
import { getPrimitivesExcept } from '@revolutionarygamesco/common/testing'
import { createSpecializationDefinition } from './specialization.ts'
import { isSpecializationDefinitions, createSpecializationDefinitions } from './definitions.ts'

describe('isSpecializationDefinitions', () => {
  it.each([
    ...getPrimitivesExcept('an empty object'),
    ['an arbitrary object', { a: 1 }]
  ])('rejects %s', (_label, value) => {
    expect(isSpecializationDefinitions(value)).toBe(false)
  })

  it('accepts an empty object', () => {
    expect(isSpecializationDefinitions({})).toBe(true)
  })

  it('accepts a record of specialization definitions', () => {
    expect(isSpecializationDefinitions({
      captain: createSpecializationDefinition({ title: 'Captain', required: true })
    })).toBe(true)
  })
})

describe('createSpecializationDefinition', () => {
  it('returns a record of specialization definitions', () => {
    expect(isSpecializationDefinitions(createSpecializationDefinitions())).toBe(true)
  })
})
