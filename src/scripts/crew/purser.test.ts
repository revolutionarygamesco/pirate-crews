import { describe, it, expect, beforeEach } from 'vitest'
import setupRanger from '../ranger.ts'
import Crew from './crew.ts'
import Purser from './purser.ts'

describe('Purser', () => {
  let crew: Crew

  beforeEach(() => {
    const { crew: data } = setupRanger()
    crew = new Crew(data)
  })

  describe('constructor', () => {
    it('creates a Purser object', () => {
      const actual = new Purser(crew)
      expect(actual).toBeInstanceOf(Purser)
    })

    it('sets the crew', () => {
      const actual = new Purser(crew)
      expect(actual.crew).toBe(crew)
    })
  })
})
