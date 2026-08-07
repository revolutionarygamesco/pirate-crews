import { getObjectRecord, isString } from '@revolutionarygamesco/common'
import { MODULE_ID } from '../settings.ts'

export interface ArticleData {
  text: string
}

export const isArticleData = (
  candidate: unknown
): candidate is ArticleData => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.text)
}

export const createArticleData = (
  overrides?: Partial<ArticleData>
): ArticleData => {
  return {
    text: game.i18n.localize(`${MODULE_ID}.articles.common.equality`),
    ...overrides
  }
}
