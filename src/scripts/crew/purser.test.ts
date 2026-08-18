import { describe, it, expect, beforeEach } from 'vitest'
import setupRanger from '../ranger.ts'
import Crew from './crew.ts'
import Purser from './purser.ts'

describe('Purser', () => {
  let crew: Crew

  beforeEach(() => {
    const { crew: data } = setupRanger()
    crew = new Crew(data)
  })

  describe('constructor', () => {
    it('creates a Purser object', () => {
      const actual = new Purser(crew)
      expect(actual).toBeInstanceOf(Purser)
    })

    it('sets the crew', () => {
      const actual = new Purser(crew)
      expect(actual.crew).toBe(crew)
    })
  })

  describe('Instance methods', () => {
    describe('estimate', () => {
      let purser: Purser

      beforeEach(() => {
        crew.stock = 500
        purser = new Purser(crew)
      })

      it('calculates the amount to pay out to each member of the crew', () => {
        expect(purser.estimate(345)).toEqual({
          [crew.specialists.get('captain')!.actor!]: 114, // Captain Charles Vane
          [crew.specialists.get('quartermaster')!.actor!]: 114, // Quartermaster “Calico” Jack Rackham
          [crew.starboard[0].uuid!]: 57, // Crew member Anne Bonny
          [crew.larboard[0].uuid!]: 57, // Crew member Mary Read
          total: 114 + 114 + 57 + 57
        })
      })

      it('won’t let you pay out more than you have in common stock', () => {
        expect(purser.estimate(5000000)).toEqual({
          [crew.specialists.get('captain')!.actor!]: 166, // Captain Charles Vane
          [crew.specialists.get('quartermaster')!.actor!]: 166, // Quartermaster “Calico” Jack Rackham
          [crew.starboard[0].uuid!]: 83, // Crew member Anne Bonny
          [crew.larboard[0].uuid!]: 83, // Crew member Mary Read
          total: 166 + 166 + 83 + 83
        })
      })
    })
  })
})
