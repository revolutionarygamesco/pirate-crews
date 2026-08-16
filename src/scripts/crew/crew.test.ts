import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockActor } from '@revolutionarygamesco/common-foundryvtt/mocks'
import setupRanger from '../ranger.ts'
import { createSpecializationDefinitions } from './types/definitions.ts'
import WatchSet from '../time/set.ts'
import Crew from './crew.ts'

const worldTimeMock = vi.fn()
game.time = { get worldTime () { return worldTimeMock() } } as unknown as foundry.helpers.GameTime
vi.mock('../time/foundry/load.ts', () => ({
  default: () => new WatchSet()
}))
vi.mock('./foundry/load.ts', () => ({
  default: () => createSpecializationDefinitions()
}))

describe('Crew', () => {
  describe('constructor', () => {
    it('creates a crew', () => {
      expect(new Crew()).toBeInstanceOf(Crew)
    })

    it('loads the ship (as an actor)', () => {
      const { crew: data } = setupRanger('Actor')
      const crew = new Crew(data)
      expect(crew.ship).toBeDefined()
    })

    it('loads the ship (as an item)', () => {
      const { crew: data } = setupRanger('Item')
      const crew = new Crew(data)
      expect(crew.ship).toBeDefined()
    })

    it('loads the articles', () => {
      const { crew: data } = setupRanger('Item')
      const crew = new Crew(data)
      expect(crew.articles).toBeDefined()
    })

    it('loads specialists', () => {
      const { crew: data } = setupRanger('Item')
      const crew = new Crew(data)
      expect(crew.specialists.has('captain')).toBe(true)
      expect(crew.specialists.has('quartermaster')).toBe(true)
    })

    it('loads watch crews', () => {
      const { crew: data } = setupRanger('Item')
      const crew = new Crew(data)
      expect(crew.starboard).toHaveLength(1)
      expect(crew.larboard).toHaveLength(1)
    })
  })

  describe('Accessor methods', () => {
    let crew: Crew

    beforeEach(() => {
      const { crew: data } = setupRanger()
      crew = new Crew(data)
    })

    describe('idlers', () => {
      it('returns the idler actors', () => {
        expect(crew.idlers.map(actor => actor.name)).toEqual([
          'Charles Vane',
          '“Calico” Jack Rackham'
        ])
      })
    })

    describe('onDuty', () => {
      it('returns the actors who are on duty', () => {
        worldTimeMock.mockReturnValue(9 * 60 * 60)
        expect(crew.onDuty.map(actor => actor.name)).toEqual([
          'Anne Bonny',
          'Charles Vane',
          '“Calico” Jack Rackham'
        ])
      })
    })

    describe('offDuty', () => {
      it('returns the actors who are off duty', () => {
        worldTimeMock.mockReturnValue(100)
        expect(crew.offDuty.map(actor => actor.name)).toEqual([
          'Mary Read',
          'Charles Vane',
          '“Calico” Jack Rackham'
        ])
      })
    })

    describe('all', () => {
      it('returns all crew members', () => {
        expect(crew.all.map(actor => actor.name)).toEqual([
          'Charles Vane',
          '“Calico” Jack Rackham',
          'Anne Bonny',
          'Mary Read'
        ])
      })
    })

    describe('count', () => {
      it('returns the number of people on the crew', () => {
        expect(crew.count).toBe(4)
      })
    })
  })

  describe('Instance methods', () => {
    let crew: Crew

    beforeEach(() => {
      const { crew: data } = setupRanger()
      crew = new Crew(data)
    })

    describe('getSpecialist', () => {
      it('returns the actor assigned to that role', () => {
        const actual = crew.getSpecialist('captain')
        expect(actual?.name).toBe('Charles Vane')
      })

      it('returns null if no one is assigned to that role', () => {
        const actual = crew.getSpecialist('gunner')
        expect(actual).toBeNull()
      })

      it('returns null if the role does not exist', () => {
        const actual = crew.getSpecialist('programmer')
        expect(actual).toBeNull()
      })
    })

    describe('getRandomMember', () => {
      it('returns a random member of the crew', () => {
        const expected = ['Charles Vane', '“Calico” Jack Rackham', 'Anne Bonny', 'Mary Read']
        const actual = crew.getRandomMember()
        expect(expected).toContain(actual.name)
      })
    })

    describe('getRandomOfficer', () => {
      it('returns the captain, quartermaster, sailing master, or bosun', () => {
        const expected = ['Charles Vane', '“Calico” Jack Rackham']
        const actual = crew.getRandomOfficer()
        expect(expected).toContain(actual.name)
      })
    })

    describe('getRandomOnDuty', () => {
      it('returns a randomly-selected on-duty member of the crew', () => {
        worldTimeMock.mockReturnValue(9 * 60 * 60)
        const expected = ['Anne Bonny', 'Charles Vane', '“Calico” Jack Rackham']
        const actual = crew.getRandomOnDuty()
        expect(expected).toContain(actual.name)
      })
    })

    describe('getRandomOffDuty', () => {
      it('returns a randomly-selected off-duty member of the crew', () => {
        worldTimeMock.mockReturnValue(100)
        const expected = ['Mary Read', 'Charles Vane', '“Calico” Jack Rackham']
        const actual = crew.getRandomOffDuty()
        expect(expected).toContain(actual.name)
      })
    })

    describe('add', () => {
      let actor: foundry.documents.Actor

      beforeEach(() => {
        actor = mockActor({ name: 'John Doe' })
      })

      it('can add an actor to the starboard crew', () => {
        crew.add(actor, 'starboard')
        expect(crew.starboard.map(({ uuid }) => uuid)).toContain(actor.uuid)
      })

      it('can add an actor to the larboard crew', () => {
        crew.add(actor, 'larboard')
        expect(crew.larboard.map(({ uuid }) => uuid)).toContain(actor.uuid)
      })

      it('can add an actor as a specialist', () => {
        crew.add(actor, 'bosun')
        expect(crew.specialists.get('bosun')?.actor).toBe(actor.uuid)
      })
    })

    describe('remove', () => {
      it('can remove a member of the starboard watch crew', () => {
        crew.remove(crew.starboard[0].uuid ?? '')
        expect(crew.starboard).toHaveLength(0)
      })

      it('can remove a member of the larboard watch crew', () => {
        crew.remove(crew.larboard[0].uuid ?? '')
        expect(crew.larboard).toHaveLength(0)
      })

      it('can remove an officer', () => {
        crew.remove(crew.specialists.get('quartermaster')?.actor ?? '')
        expect(crew.specialists.has('quartermaster')).toBe(false)
        expect(crew.starboard).toHaveLength(1)
        expect(crew.larboard).toHaveLength(1)
      })
    })

    describe('decommission', () => {
      it('moves a specialist onto a watch team', () => {
        crew.decommission('quartermaster')
        expect(crew.specialists.has('quartermaster')).toBe(false)
        expect(crew.starboard).toHaveLength(2)
      })
    })
  })
})
