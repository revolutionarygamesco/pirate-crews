import { getObjectRecord, isBoolean, isNumber } from '@revolutionarygamesco/common'

export interface Provision {
  store: number
  rationing: number
  skip: boolean
}

export const isProvision = (
  candidate: unknown
): candidate is Provision => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isNumber(obj.store),
    isNumber(obj.rationing),
    isBoolean(obj.skip)
  ].every(test => test)
}

export const createProvision = (
  overrides?: Partial<Provision>
): Provision => {
  return {
    store: 0,
    rationing: 1,
    skip: false,
    ...overrides
  }
}
