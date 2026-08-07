import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isArticleData, createArticleData } from './data.ts'

describe('isArticleData', () => {
  it.each(primitives)('rejects %s', (_label, value) => {
    expect(isArticleData(value)).toBe(false)
  })

  it('accepts article data', () => {
    expect(isArticleData({
      text: 'Every Member of this Company Shall...'
    })).toBe(true)
  })
})

describe('createArticleData', () => {
  it('creates article data', () => {
    expect(isArticleData(createArticleData())).toBe(true)
  })
})
