import { describe, it, expect } from 'vitest'
import { MODULE_ID } from '../settings.ts'
import { isWatchSetData, SECONDS_PER_HOUR } from './types/set.ts'
import WatchSet from './set.ts'

describe('WatchSet', () => {
  describe('constructor', () => {
    it('creates a default watch set', () => {
      const set = new WatchSet()
      expect(set.watches).toHaveLength(7)
      expect(set.offset).toBe(-4 * SECONDS_PER_HOUR)
      expect(set.dayLength).toBe(24 * SECONDS_PER_HOUR)
    })

    it('can take other watches', () => {
      const name = 'Test Watch'
      const duration = 1000
      const set = new WatchSet({ watches: [{ name, duration }] })

      expect(set.watches).toHaveLength(1)
      expect(set.offset).toBe(-4 * SECONDS_PER_HOUR)
      expect(set.dayLength).toBe(duration)
    })

    it('can take other offsets', () => {
      const set = new WatchSet({ offset: 1000 })

      expect(set.watches).toHaveLength(7)
      expect(set.offset).toBe(1000)
      expect(set.dayLength).toBe(24 * SECONDS_PER_HOUR)
    })
  })

  describe('dayLength', () => {
    it('calculates day length by summing watch durations', () => {
      const set = new WatchSet()
      expect(set.dayLength).toBe(24 * SECONDS_PER_HOUR)
    })
  })

  describe('getInstances', () => {
    it('returns the watch instances for the day of a given timestamp (in seconds)', () => {
      const set = new WatchSet()
      const timestamp = ((3 * 24) + 21) * SECONDS_PER_HOUR // 8 hours into day 3
      const expectedCycleStart = ((4 * 24) - 4) * SECONDS_PER_HOUR
      const actual = set.getInstances(timestamp)

      expect(actual).toHaveLength(7)
      expect(actual[0].start).toBe(expectedCycleStart)
      expect(actual[0].end).toBe(expectedCycleStart + actual[0].duration)
      expect(actual[6].end).toBe(expectedCycleStart + (24 * SECONDS_PER_HOUR))
    })
  })

  describe('getCurrent', () => {
    it('returns the current watch instance', () => {
      const set = new WatchSet()
      const timestamp = ((3 * 24) + 7.5) * SECONDS_PER_HOUR // 7.5 hours into day 3
      const { name, duration, start, end } = set.getCurrent(timestamp)

      expect(name).toBe(`${MODULE_ID}.watches.default.morning`)
      expect(duration).toBe(4 * SECONDS_PER_HOUR)
      expect(start).toBe(((3 * 24) + 4) * SECONDS_PER_HOUR)
      expect(end).toBe(((3 * 24) + 8) * SECONDS_PER_HOUR)
    })

    it('returns First Watch at 2100', () => {
      const set = new WatchSet()
      const timestamp = ((3 * 24) + 21) * SECONDS_PER_HOUR
      const { name } = set.getCurrent(timestamp)
      expect(name).toBe(`${MODULE_ID}.watches.default.first`)
    })

    it('returns First Watch at midnight', () => {
      const set = new WatchSet()
      const timestamp = (3 * 24) * SECONDS_PER_HOUR
      const { name } = set.getCurrent(timestamp)
      expect(name).toBe(`${MODULE_ID}.watches.default.first`)
    })

    it('returns Middle Watch a second after midnight', () => {
      const set = new WatchSet()
      const timestamp = (3 * 24) * SECONDS_PER_HOUR
      const { name } = set.getCurrent(timestamp + 1)
      expect(name).toBe(`${MODULE_ID}.watches.default.middle`)
    })
  })

  describe('getInstancesBetween', () => {
    it('returns just the current watch instance if that’s all there is', () => {
      const start = ((3 * 24) + 5) * SECONDS_PER_HOUR // 5 hours into day 3
      const end = ((3 * 24) + 6) * SECONDS_PER_HOUR // 6 hours into day 3
      const set = new WatchSet()
      const actual = set.getInstancesBetween(start, end)
      expect(actual).toHaveLength(1)
    })

    it('can return an array of watch instances over several days', () => {
      const start = ((3 * 24) + 5) * SECONDS_PER_HOUR // 5 hours into day 3
      const end = ((5 * 24) + 6) * SECONDS_PER_HOUR // 6 hours into day 5
      const set = new WatchSet()
      const actual = set.getInstancesBetween(start, end)
      expect(actual).toHaveLength(15)
    })
  })

  describe('toObject', () => {
    it('returns a WatchSetData object', () => {
      const name = 'Test Watch'
      const duration = 1000
      const offset = 0
      const set = new WatchSet({ watches: [{ name, duration }], offset })
      const actual = set.toObject()

      expect(isWatchSetData(actual)).toBe(true)
      expect(actual.watches).toHaveLength(1)
      expect(actual.watches[0].name).toBe(name)
      expect(actual.watches[0].duration).toBe(duration)
      expect(actual.offset).toBe(offset)
    })
  })
})
