import { selectRandomElement, isString } from '@revolutionarygamesco/common'
import { getID } from '@revolutionarygamesco/common-foundryvtt'
import { type CrewData } from './types/data.ts'
import { type Provisions } from '../provisions/types/provisions.ts'
import { type Specialization } from './types/specialization.ts'
import { type WatchInstance } from '../time/types/instance.ts'
import { isWatchTeam, type WatchTeam } from './types/team.ts'
import getOtherTeam from './methods/other-team.ts'
import loadSpecializationDefinitions from './foundry/load.ts'
import loadProvisions from '../provisions/foundry/load.ts'
import loadWatches from '../time/foundry/load.ts'

export type Permission = 'ship' | 'articles' | 'crew' | 'provisions' | 'navigation' | 'exploits'

class Crew {
  ship?: foundry.documents.Actor | foundry.documents.Item
  articles?: foundry.documents.JournalEntry
  specialists: Map<string, Specialization>
  starboard: foundry.documents.Actor[]
  larboard: foundry.documents.Actor[]
  provisions: Provisions

  constructor (data?: Partial<CrewData>) {
    this.ship = data?.ship
      ? data.ship.startsWith('Actor')
        ? game.actors.get(getID(data.ship))
        : game.items.get(getID(data.ship))
      : undefined
    this.articles = data?.articles
      ? game.journal.get(getID(data.articles))
      : undefined
    this.specialists = new Map<string, Specialization>()
    this.starboard = []
    this.larboard = []

    if (data?.provisions) {
      this.provisions = data.provisions
    } else {
      const defs = loadProvisions()
      this.provisions = {}
      for (const key in defs) {
        this.provisions[key] = { store: 0, rationing: 1, skip: false }
      }
    }

    if (data?.specialists) {
      for (const key in data.specialists) {
        this.specialists.set(key, data.specialists[key])
      }
    }

    const teams: Array<{ src: string[], dest: foundry.documents.Actor[] }> = [
      { src: data?.starboard ?? [], dest: this.starboard },
      { src: data?.larboard ?? [], dest: this.larboard }
    ]

    for (const { src, dest } of teams) {
      for (const uuid of src) {
        const actor = game.actors.get(getID(uuid))
        if (actor) dest.push(actor)
      }
    }
  }

  get idlers (): foundry.documents.Actor[] {
    return this.mapSpecializationsToActors()
  }

  get onDuty (): foundry.documents.Actor[] {
    const { team, idlers } = this.getWatch()
    return idlers
      ? [...this[team], ...this.idlers]
      : this[team]
  }

  get offDuty (): foundry.documents.Actor[] {
    const { team, idlers } = this.getWatch()
    const off = getOtherTeam(team)
    return !idlers
      ? [...this[off], ...this.idlers]
      : this[off]
  }

  get all (): foundry.documents.Actor[] {
    const specialists = this.mapSpecializationsToActors()
    const iterable = [...specialists, ...this.starboard, ...this.larboard]
      .map(actor => [actor.uuid, actor] as [string, foundry.documents.Actor])
    const actors = new Map<string, foundry.documents.Actor>(iterable)
    return Array.from(actors.values())
  }

  get count (): number {
    return this.all.length
  }

  getSpecialist (key: string): foundry.documents.Actor | null {
    if (!this.specialists.has(key)) return null
    const spec = this.specialists.get(key)
    const uuid = spec?.actor
    const actor = game.actors.get(getID(uuid ?? ''))
    return actor ?? null
  }

  getRandomMember (): foundry.documents.Actor {
    return selectRandomElement(this.all)
  }

  getRandomOfficer (): foundry.documents.Actor {
    const candidates = this.mapSpecializationsToActors(['captain', 'quartermaster', 'master', 'bosun'])
    return selectRandomElement(candidates)
  }

  getRandomOnDuty (): foundry.documents.Actor {
    return selectRandomElement(this.onDuty)
  }

  getRandomOffDuty (): foundry.documents.Actor {
    return selectRandomElement(this.offDuty)
  }

  add (
    actor: foundry.documents.Actor | string,
    position: WatchTeam | string
  ): void {
    const a = isString(actor) ? game.actors.get(getID(actor)): actor
    if (!a || !a.uuid) return

    if (isWatchTeam(position)) {
      this[position].push(a)
    } else {
      if (this.specialists.has(position)) {
        const spec = this.specialists.get(position)!
        if (spec.actor) this.decommission(position)
        this.specialists.set(position, { ...spec, actor: a.uuid })
      } else {
        const defs = loadSpecializationDefinitions()
        if (!defs[position]) return
        this.specialists.set(position, {
          ...defs[position],
          actor: a.uuid
        })
      }
    }
  }

  remove (
    actor: foundry.documents.Actor | string
  ): void {
    const a = isString(actor) ? game.actors.get(getID(actor)): actor
    if (!a || !a.uuid) return

    let specialization = ''
    for (const [key, value] of this.specialists.entries()) {
      if (value.actor === a.uuid) specialization = key
    }

    if (specialization !== '') this.specialists.delete(specialization)

    this.starboard = this.starboard.filter(actor => actor.uuid !== a.uuid)
    this.larboard = this.larboard.filter(actor => actor.uuid !== a.uuid)
  }

  decommission (
    key: string
  ): void {
    const prev = this.specialists.get(key)
    if (!prev) return

    const actor = this.getSpecialist(key)
    if (!actor) return

    this.specialists.delete(key)
    const bigger = this.larboard.length < this.starboard.length
      ? 'larboard' : 'starboard'
    this[bigger].push(actor)
  }

  canEdit (
    permission: Permission
  ): boolean {
    if (game.user.isGM) return true

    const isCaptain = this.getSpecialist('captain')?.testUserPermission(game.user, 3) ?? false
    const isQuartermaster = this.getSpecialist('quartermaster')?.testUserPermission(game.user, 3) ?? false
    const isMaster = this.getSpecialist('master')?.testUserPermission(game.user, 3) ?? false

    const permissions: Record<Permission, boolean> = {
      ship: isCaptain,
      articles: false,
      crew: isCaptain || isQuartermaster,
      provisions: isCaptain || isQuartermaster,
      navigation: isCaptain || isMaster,
      exploits: isCaptain
    }

    return permissions[permission]
  }

  protected getWatch (): WatchInstance {
    const set = loadWatches()
    return set.getCurrent(game.time.worldTime)
  }

  protected mapSpecializationsToActors (keys?: string[]): foundry.documents.Actor[] {
    const specializations = keys && keys.length > 0
      ? keys.map(key => this.specialists.get(key))
      : Array.from(this.specialists.values())
    return specializations
      .filter(spec => spec !== undefined)
      .map(({ actor }) => actor)
      .filter(uuid => uuid !== undefined)
      .map(uuid => game.actors.get(getID(uuid)))
      .filter(actor => actor !== undefined)
  }
}

export default Crew
