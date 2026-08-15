import { getObjectRecord, isString, isNumber, isBoolean, makeArrayGuard } from '@revolutionarygamesco/common'

export interface Watch {
  name: string
  duration: number
  idlers: boolean
}

export const createWatch = (
  overrides?: Partial<Watch>
): Watch => {
  return {
    name: 'First Watch',
    duration: 14400,
    idlers: false,
    ...overrides
  }
}

export const isWatch = (
  candidate: unknown
): candidate is Watch => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return [
    isString(obj.name),
    isNumber(obj.duration),
    isBoolean(obj.idlers)
  ].every(test => test === true)
}

export const isWatchArray = makeArrayGuard<Watch>(isWatch)
