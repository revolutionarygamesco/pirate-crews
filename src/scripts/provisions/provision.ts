import { isNumber } from '@revolutionarygamesco/common'
import { isProvisionType, createProvisionType, type ProvisionType } from './type.ts'

export interface Provision extends ProvisionType {
  value: number
}

export const isProvision = (
  candidate: unknown
): candidate is Provision => {
  if (!isProvisionType(candidate)) return false
  return isNumber((candidate as Provision).value)
}

export const createProvision = (
  overrides?: Partial<Provision>
): Provision => {
  return {
    ...createProvisionType(overrides),
    value: 0,
    ...overrides
  }
}
