import { getObjectRecord } from '@revolutionarygamesco/common'
import { isProvision, createProvision, type Provision } from './provision.ts'
import { createProvisionDefinitions } from './definitions.ts'

export type Provisions = Record<string, Provision>

export const isProvisions = (
  candidate: unknown
): candidate is Provisions => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return Object.values(obj).every(value => isProvision(value))
}

export const createProvisions = (
  overrides?: Record<string, Partial<Provision>>
): Provisions => {
  const defaultKeys = Object.keys(createProvisionDefinitions())
  const keys = [...new Set([...defaultKeys, ...Object.keys(overrides ?? {})])]
  const provisions: Provisions = {}
  for (const key of keys) {
    const o = overrides && overrides[key] ? overrides[key] : undefined
    provisions[key] = createProvision(o)
  }
  return provisions
}
