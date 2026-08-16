import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mockLocalize } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import setupRanger from '../ranger.ts'
import { createProvisionsData, isProvisionsData } from './types/provisions.ts'
import Crew from '../crew/crew.ts'
import Provisions from './provisions.ts'

describe('Provisions', () => {
  const originalSettings = game.settings

  beforeEach(() => {
    const get = vi.fn(() => createProvisionsData())
    game.settings = { get } as unknown as foundry.Game['settings']
  })

  afterEach(() => {
    game.settings = originalSettings
  })

  describe('constructor', () => {
    it('creates provisions', () => {
      expect(new Provisions()).toBeInstanceOf(Provisions)
    })

    it('can load provisions data', () => {
      const actual = new Provisions({ white: { store: 50, rationing: 0.5, skip: false } })
      expect(actual.data.white.store).toBe(50)
      expect(actual.data.white.rationing).toBe(0.5)
      expect(actual.data.white.skip).toBe(false)
    })

    it('loads default provisions if no data is provided', () => {
      const actual = new Provisions()
      for (const key of ['food', 'water', 'rum']) {
        expect(actual.data[key].store).toBe(0)
        expect(actual.data[key].rationing).toBe(1)
        expect(actual.data[key].skip).toBe(false)
      }
    })
  })

  describe('Instance methods', () => {
    describe('perDiem', () => {
      let crew: Crew
      let provisions: Provisions

      beforeEach(() => {
        const { crew: data } = setupRanger()
        crew = new Crew(data)
        provisions = new Provisions(undefined, crew)
      })

      it('returns the number of units consumed per day', () => {
        const {  food, water, rum } = provisions.perDiem()
        expect(food).toBe(4)
        expect(water).toBe(4)
        expect(rum).toBe(4)
      })

      it('factors in rationing', () => {
        provisions.data.food = { store: 40, rationing: 1, skip: false }
        provisions.data.water = { store: 2, rationing: 0.5, skip: false }
        provisions.data.rum = { store: 0, rationing: 1, skip: false }

        const {  food, water, rum } = provisions.perDiem()
        expect(food).toBe(4)
        expect(water).toBe(2)
        expect(rum).toBe(4)
      })
    })

    describe('estimate', () => {
      let crew: Crew
      let provisions: Provisions

      beforeEach(() => {
        const { crew: data } = setupRanger()
        crew = new Crew(data)
        provisions = new Provisions(undefined, crew)
      })

      it('estimates the number of days left', () => {
        provisions.data.food.store = 40
        provisions.data.water.store = 2
        provisions.data.rum.store = 0

        const {  food, water, rum } = provisions.estimate()
        expect(food).toBe(10)
        expect(water).toBe(0)
        expect(rum).toBe(0)
      })

      it('factors in rationing', () => {
        provisions.data.food = { store: 40, rationing: 1, skip: false }
        provisions.data.water = { store: 2, rationing: 0.5, skip: false }
        provisions.data.rum = { store: 0, rationing: 1, skip: false }

        const {  food, water, rum } = provisions.estimate()
        expect(food).toBe(10)
        expect(water).toBe(1)
        expect(rum).toBe(0)
      })

      it('adds an extra day for skip', () => {
        provisions.data.food = { store: 40, rationing: 1, skip: true }
        const {  food } = provisions.estimate()
        expect(food).toBe(11)
      })
    })

    describe('getRationingOptions', () => {
      beforeEach(() => {
        const dict: Record<string, string> = {}
        dict[`${MODULE_ID}.provisions.rationing.double`] = 'Double rations'
        dict[`${MODULE_ID}.provisions.rationing.normal`] = 'Normal rations'
        dict[`${MODULE_ID}.provisions.rationing.half`] = 'Half rations'
        dict[`${MODULE_ID}.provisions.rationing.quarter`] = 'Quarter rations'
        dict[`${MODULE_ID}.provisions.rationing.none`] = 'No rations'
        mockLocalize(dict)
      })

      it.each([
        2, 1, 0.5, 0.25, 0
      ])('selects current value when set to %d', (value) => {
        const provisions = new Provisions()
        provisions.data.food.rationing = value
        const actual = provisions.getRationingOptions('food')
        expect(actual).toEqual([
          { value: 2, label: 'Double rations', selected: value === 2 },
          { value: 1, label: 'Normal rations', selected: value === 1 },
          { value: 0.5, label: 'Half rations', selected: value === 0.5 },
          { value: 0.25, label: 'Quarter rations', selected: value === 0.25 },
          { value: 0, label: 'No rations', selected: value === 0 }
        ])
      })
    })

    describe('toObject', () => {
      it('returns a ProvisionsData object', () => {
        const actual = new Provisions()
        expect(isProvisionsData(actual.toObject())).toBe(true)
      })
    })
  })
})
