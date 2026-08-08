import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { createOfficerAssignments } from '../officers/assignments.ts'
import { createProvisions } from '../provisions/provisions.ts'
import { isCrewData, createCrewData } from './data.ts'

describe('isCrewData', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isCrewData(value)).toBe(false)
  })

  it('accepts crew data', () => {
    expect(isCrewData({
      officers: createOfficerAssignments(),
      watchCrews: [
        { name: 'Starboard Crew', lead: 'quartermaster', members: [], onDuty: true },
        { name: 'Larboard Crew', lead: 'master', members: [], onDuty: false },
      ],
      provisions: createProvisions(),
      stock: 0,
      articles: null,
      ship: null
    })).toBe(true)
  })
})

describe('createCrewData', () => {
  it('creates crew data', () => {
    expect(isCrewData(createCrewData())).toBe(true)
  })
})
