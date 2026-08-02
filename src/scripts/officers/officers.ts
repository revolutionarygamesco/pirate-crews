import { getObjectRecord } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { isOfficer, createOfficer, type Officer } from './officer.ts'

export interface Officers {
  [key: string]: Officer
}

export const isOfficers = (
  candidate: unknown
): candidate is Officers => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.keys(obj).every(key => isOfficer(obj[key]))
}

export const createOfficers = (
  overrides?: Record<string, Partial<Officer>>
): Officers => {
  const t = scopeLocalizer([MODULE_ID, 'officers'].join('.'))

  const fullOverrides: Record<string, Officer> = {}
  for (const key in overrides) {
    fullOverrides[key] = createOfficer(overrides[key])
  }

  return {
    captain: {
      title: t('captain.title'),
      desc: t('captain.desc'),
      sans: t('captain.sans'),
      shares: 2
    },
    quartermaster: {
      title: t('quartermaster.title'),
      desc: t('quartermaster.desc'),
      sans: t('quartermaster.sans'),
      shares: 2
    },
    master: {
      title: t('master.title'),
      desc: t('master.desc'),
      sans: t('master.sans'),
      shares: 1.5
    },
    bosun: {
      title: t('bosun.title'),
      desc: t('bosun.desc'),
      sans: t('bosun.sans'),
      shares: 1.5
    },
    gunner: {
      title: t('gunner.title'),
      desc: t('gunner.desc'),
      sans: t('gunner.sans'),
      shares: 1.5
    },
    carpenter: {
      title: t('carpenter.title'),
      desc: t('carpenter.desc'),
      sans: t('carpenter.sans'),
      shares: 1.25
    },
    surgeon: {
      title: t('surgeon.title'),
      desc: t('surgeon.desc'),
      sans: t('surgeon.sans'),
      shares: 1.25
    },
    ...fullOverrides
  }
}
