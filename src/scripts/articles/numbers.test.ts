import { describe, beforeEach, it, expect } from 'vitest'
import { mockLocalize } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from '../settings.ts'
import describeNumbers from './numbers.ts'

describe('describeNumbers', () => {
  beforeEach(() => {
    const dict: Record<string, string> = {}

    dict[`${MODULE_ID}.articles.shares.conj`] = 'and'
    dict[`${MODULE_ID}.articles.shares.p05`] = 'one twentieth'
    dict[`${MODULE_ID}.articles.shares.p10`] = 'one tenth'
    dict[`${MODULE_ID}.articles.shares.p15`] = 'three twentieths'
    dict[`${MODULE_ID}.articles.shares.p20`] = 'one fifth'
    dict[`${MODULE_ID}.articles.shares.p25`] = 'one quarter'
    dict[`${MODULE_ID}.articles.shares.p30`] = 'three tenths'
    dict[`${MODULE_ID}.articles.shares.p35`] = 'one third'
    dict[`${MODULE_ID}.articles.shares.p40`] = 'two fifths'
    dict[`${MODULE_ID}.articles.shares.p45`] = 'nine twentieths'
    dict[`${MODULE_ID}.articles.shares.p50`] = 'one half'
    dict[`${MODULE_ID}.articles.shares.p55`] = 'eleven twentieths'
    dict[`${MODULE_ID}.articles.shares.p60`] = 'three fifths'
    dict[`${MODULE_ID}.articles.shares.p65`] = 'two thirds'
    dict[`${MODULE_ID}.articles.shares.p70`] = 'seven tenths'
    dict[`${MODULE_ID}.articles.shares.p75`] = 'three quarters'
    dict[`${MODULE_ID}.articles.shares.p80`] = 'four fifths'
    dict[`${MODULE_ID}.articles.shares.p85`] = 'seventeen twentieths'
    dict[`${MODULE_ID}.articles.shares.p90`] = 'nine tenths'
    dict[`${MODULE_ID}.articles.shares.p95`] = 'nineteen twentieths'
    dict[`${MODULE_ID}.articles.shares.1`] = 'one'
    dict[`${MODULE_ID}.articles.shares.2`] = 'two'
    dict[`${MODULE_ID}.articles.shares.3`] = 'three'
    dict[`${MODULE_ID}.articles.shares.4`] = 'four'
    dict[`${MODULE_ID}.articles.shares.5`] = 'five'

    mockLocalize(dict)
  })

  it.each([
    [1.05, 'one and one twentieth'],
    [2.1, 'two and one tenth'],
    [3.15, 'three and three twentieths'],
    [4.2, 'four and one fifth'],
    [5.25, 'five and one quarter'],
    [1.3, 'one and three tenths'],
    [2.35, 'two and one third'],
    [3.4, 'three and two fifths'],
    [4.45, 'four and nine twentieths'],
    [5.5, 'five and one half'],
    [1.55, 'one and eleven twentieths'],
    [2.6, 'two and three fifths'],
    [3.65, 'three and two thirds'],
    [4.7, 'four and seven tenths'],
    [5.75, 'five and three quarters'],
    [1.8, 'one and four fifths'],
    [2.85, 'two and seventeen twentieths'],
    [3.9, 'three and nine tenths'],
    [4.95, 'four and nineteen twentieths'],
    [5, 'five']
  ] as Array<[number, string]>)('translates %d to %s', (n, expected) => {
    expect(describeNumbers(n)).toBe(expected)
  })
})
