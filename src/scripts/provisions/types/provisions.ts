import { getObjectRecord } from '@revolutionarygamesco/common'
import { isProvision, createProvision, type Provision } from './provision.ts'
import { createProvisionDefinitions } from './definitions.ts'

export type ProvisionsData = Record<string, Provision>

export const isProvisionsData = (
  candidate: unknown
): candidate is ProvisionsData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.values(obj).every(value => isProvision(value))
}

export const createProvisionsData = (
  overrides?: Record<string, Partial<Provision>>
): ProvisionsData => {
  const defaultKeys = Object.keys(createProvisionDefinitions())
  const keys = [...new Set([...defaultKeys, ...Object.keys(overrides ?? {})])]
  const provisions: ProvisionsData = {}
  for (const key of keys) {
    const o = overrides && overrides[key] ? overrides[key] : undefined
    provisions[key] = createProvision(o)
  }
  return provisions
}
