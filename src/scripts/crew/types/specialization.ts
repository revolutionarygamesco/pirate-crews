import { getObjectRecord, isString, isOptionalString, isBoolean, isOptionalNumber } from '@revolutionarygamesco/common'
import { MODULE_ID } from '../../settings.ts'

export interface SpecializationDefinition {
  title: string
  required: boolean
  master?: string
}

export interface Specialization extends SpecializationDefinition {
  actor?: string
  shares?: number
}

const defaults: Record<string, Partial<Specialization>> = {
  captain: { required: true, shares: 2 },
  quartermaster: { required: true, shares: 2 },
  master: { required: true, shares: 1.5 },
  'master-mate': { required: false, master: 'master' },
  bosun: { required: false, shares: 1.5 },
  'bosun-mate': { required: false, master: 'bosun' },
  gunner: { required: false, shares: 1.5 },
  'gunner-mate': { required: false, master: 'gunner' },
  carpenter: { required: false, shares: 1.25 },
  'carpenter-mate': { required: false, master: 'carpenter' },
  surgeon: { required: false, shares: 1.25 },
  'surgeon-mate': { required: false, master: 'surgeon' },
  cooper: { required: false },
  'cooper-mate': { required: false, master: 'cooper' },
  armorer: { required: false },
  'armorer-mate': { required: false, master: 'armorer' },
  sailmaker: { required: false },
  'sailmaker-mate': { required: false, master: 'sailmaker' },
  cook: { required: false }
}

export const isSpecializationDefinition = (
  candidate: unknown
): candidate is SpecializationDefinition => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isString(obj.title),
    isBoolean(obj.required),
    isOptionalString(obj.master)
  ].every(test => test)
}

export const isSpecialization = (
  candidate: unknown
): candidate is Specialization => {
  if (!isSpecializationDefinition(candidate)) return false
  const obj = candidate as Specialization
  return [
    isOptionalNumber(obj.shares),
    isOptionalString(obj.actor)
  ].every(test => test)
}

export const createSpecializationDefinitionFromKey = (
  key: string
): SpecializationDefinition => {
  const obj: SpecializationDefinition = {
    title: game.i18n.localize([MODULE_ID, 'specialists', key].join('.')),
    required: defaults[key].required ?? false,
  }

  if (defaults[key].master) obj.master = defaults[key].master
  return obj
}

export const createSpecializationFromKey = (
  key: string
): Specialization => {
  return {
    ...createSpecializationDefinitionFromKey(key),
    shares: defaults[key].shares ?? 1
  }
}

export const createSpecializationDefinition = (
  overrides?: Partial<SpecializationDefinition>
): SpecializationDefinition => {
  return {
    title: game.i18n.localize([MODULE_ID, 'specialists', 'captain'].join('.')),
    required: true,
    ...overrides
  }
}

export const createSpecialization = (
  overrides?: Partial<Specialization>
): Specialization => {
  return {
    ...createSpecializationDefinition(overrides),
    shares: 2,
    ...overrides
  }
}
