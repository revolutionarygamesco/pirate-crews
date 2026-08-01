import { isNumber, makeArrayGuard } from '@revolutionarygamesco/common'
import { type Watch, createWatch, isWatch } from './watch.ts'

export interface WatchInstance extends Watch {
  start: number
  end: number
}

export const createWatchInstance = (
  overrides?: Partial<WatchInstance>
): WatchInstance => {
  const watch = createWatch(overrides)
  return {
    ...watch,
    start: 0,
    end: watch.duration,
    ...overrides
  }
}

export const isWatchInstance = (
  candidate: unknown
): candidate is WatchInstance => {
  if (!isWatch(candidate)) return false
  const obj = candidate as Watch & Record<string, unknown>
  return [
    isNumber(obj.start),
    isNumber(obj.end)
  ].every(test => test === true)
}

export const isWatchInstanceArray = makeArrayGuard<WatchInstance>(isWatchInstance)
