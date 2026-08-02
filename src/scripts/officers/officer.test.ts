import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { createOfficer, isOfficer } from './officer.ts'

describe('isOfficer', () => {
  it.each(primitives)('rejects %s', (_desc, value) => {
    expect(isOfficer(value)).toBe(false)
  })

  it('accepts an officer', () => {
    expect(isOfficer({
      title: 'Captain',
      desc: 'This is the captain.',
      sans: 'You need a captain.',
      shares: 2
    })).toBe(true)
  })
})

describe('createOfficer', () => {
  it('creates an officer', () => {
    expect(isOfficer(createOfficer())).toBe(true)
  })

  it('can override defaults', () => {
    const actual = createOfficer({
      title: 'Quartermaster',
      desc: 'This is the quartermaster.',
      sans: 'You need a quartermaster.',
      shares: 2
    })

    expect(actual.title).toBe('Quartermaster')
    expect(actual.desc).toBe('This is the quartermaster.')
    expect(actual.sans).toBe('You need a quartermaster.')
    expect(actual.shares).toBe(2)
  })
})
