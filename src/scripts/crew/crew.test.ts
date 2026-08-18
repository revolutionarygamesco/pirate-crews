import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest'
import { mockActor } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { getID, generateID } from '@revolutionarygamesco/common-foundryvtt'
import setupRanger from '../ranger.ts'
import { isCrewData } from './types/data.ts'
import { createSpecializationDefinitions } from './types/definitions.ts'
import WatchSet from '../time/set.ts'
import Provisions from '../provisions/provisions.ts'
import Crew, { type Permission } from './crew.ts'

const worldTimeMock = vi.fn()
game.time = { get worldTime () { return worldTimeMock() } } as unknown as foundry.helpers.GameTime
vi.mock('../time/foundry/load.ts', () => ({
  default: () => new WatchSet()
}))
vi.mock('./foundry/load.ts', () => ({
  default: () => createSpecializationDefinitions()
}))

describe('Crew', () => {
  const originalSettings = game.settings

  beforeEach(() => {
    const get = vi.fn(() => undefined)
    game.settings = { get } as unknown as foundry.Game['settings']
  })

  afterEach(() => {
    game.settings = originalSettings
  })

  describe('constructor', () => {
    it('creates a crew', () => {
      expect(new Crew()).toBeInstanceOf(Crew)
    })

    it('can set the actor from an Actor document', () => {
      const { actor } = setupRanger('Actor')
      const actual = new Crew(undefined, actor)
      expect(actual.actor).toBe(actor.uuid)
    })

    it('can set the actor from a UUID string', () => {
      const actor = `Actor.${generateID()}`
      const actual = new Crew({ actor })
      expect(actual.actor).toBe(actor)
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

    it('has provisions', () => {
      const crew = new Crew()
      expect(crew.provisions).toBeInstanceOf(Provisions)
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

    describe('uuids', () => {
      it('returns UUIDs for all crew members', () => {
        expect(crew.uuids).toEqual([
          crew.specialists.get('captain')?.actor,
          crew.specialists.get('quartermaster')?.actor,
          crew.starboard[0].uuid,
          crew.larboard[0].uuid
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

    describe('shares', () => {
      it('returns a record of how many shares each member of the crew has', () => {
        const actual = crew.shares
        expect(actual[crew.specialists.get('captain')?.actor!]).toBe(2)
        expect(actual[crew.specialists.get('quartermaster')?.actor!]).toBe(2)
        expect(actual[crew.starboard[0].uuid!]).toBe(1)
        expect(actual[crew.larboard[0].uuid!]).toBe(1)
      })

      it('returns the total number of shares', () => {
        expect(crew.shares.total).toBe(6)
      })
    })

    describe('shareBands', () => {
      it('returns the crew’s share bands', () => {
        const actual = crew.shareBands
        expect(actual).toEqual([
          { shares: 2, titles: ['Captain', 'Quartermaster'] }
        ])
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

    describe('canEdit', () => {
      let captain: foundry.documents.Actor
      let quartermaster: foundry.documents.Actor
      let master: foundry.documents.Actor

      beforeEach(async () => {
        master = mockActor({ name: 'John Doe' })
        game.actors.set(getID(master.uuid!), master)
        crew.specialists.set('master', { title: 'Sailing Master', required: true, actor: master.uuid! })
        captain = crew.getSpecialist('captain')!
        quartermaster = crew.getSpecialist('quartermaster')!

        captain.testUserPermission = vi.fn().mockReturnValue(false)
        quartermaster.testUserPermission = vi.fn().mockReturnValue(false)
        master.testUserPermission = vi.fn().mockReturnValue(false)

        vi.stubGlobal('game', { ...game, user: { id: generateID(), name: 'Test User', isGM: false } })
      })

      it.each([
        ['the ship', 'ship'],
        ['the articles of agreement', 'articles'],
        ['crew assignments', 'crew'],
        ['the common stock', 'stock'],
        ['provisions', 'provisions'],
        ['the ship’s course', 'navigation'],
        ['the captain’s exploits', 'exploits']
      ] as Array<[string, Permission]>)('grants GM permission to edit %s', (_desc, key) => {
        vi.stubGlobal('game', { ...game, user: { id: generateID(), name: 'Test User', isGM: true } })
        expect(crew.canEdit(key)).toBe(true)
      })

      it.each([
        ['grants', 'the ship', 'ship'],
        ['denies', 'the articles of agreement', 'articles'],
        ['grants', 'crew assignments', 'crew'],
        ['grants', 'the common stock', 'stock'],
        ['grants', 'provisions', 'provisions'],
        ['grants', 'the ship’s course', 'navigation'],
        ['grants', 'the captain’s exploits', 'exploits']
      ] as Array<[string, string, Permission]>)('%s the captain permission to edit %s', (expected, _desc, key) => {
        (captain.testUserPermission as Mock).mockReturnValue(true)
        expect(crew.canEdit(key)).toBe(expected === 'grants')
      })

      it.each([
        ['denies', 'the ship', 'ship'],
        ['denies', 'the articles of agreement', 'articles'],
        ['grants', 'crew assignments', 'crew'],
        ['grants', 'the common stock', 'stock'],
        ['grants', 'provisions', 'provisions'],
        ['denies', 'the ship’s course', 'navigation'],
        ['denies', 'the captain’s exploits', 'exploits']
      ] as Array<[string, string, Permission]>)('%s the quartermaster permission to edit %s', (expected, _desc, key) => {
        (quartermaster.testUserPermission as Mock).mockReturnValue(true)
        expect(crew.canEdit(key)).toBe(expected === 'grants')
      })

      it.each([
        ['denies', 'the ship', 'ship'],
        ['denies', 'the articles of agreement', 'articles'],
        ['denies', 'crew assignments', 'crew'],
        ['denies', 'the common stock', 'stock'],
        ['denies', 'provisions', 'provisions'],
        ['grants', 'the ship’s course', 'navigation'],
        ['denies', 'the captain’s exploits', 'exploits']
      ] as Array<[string, string, Permission]>)('%s the sailing master permission to edit %s', (expected, _desc, key) => {
        (master.testUserPermission as Mock).mockReturnValue(true)
        expect(crew.canEdit(key)).toBe(expected === 'grants')
      })

      it.each([
        ['denies', 'the ship', 'ship'],
        ['denies', 'the articles of agreement', 'articles'],
        ['denies', 'crew assignments', 'crew'],
        ['denies', 'the common stock', 'stock'],
        ['denies', 'provisions', 'provisions'],
        ['denies', 'the ship’s course', 'navigation'],
        ['denies', 'the captain’s exploits', 'exploits']
      ] as Array<[string, string, Permission]>)('%s anyone else permission to edit %s', (expected, _desc, key) => {
        expect(crew.canEdit(key)).toBe(expected === 'grants')
      })
    })

    describe('toObject', () => {
      it('returns a CrewData object', () => {
        expect(isCrewData(crew.toObject())).toBe(true)
      })
    })
  })
})
