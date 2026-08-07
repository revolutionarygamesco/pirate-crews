import { MODULE_ID } from '../settings.ts'
import { type ArticleData } from './data.ts'
import ArticleModel from './schema.ts'

const registerArticleHooks = () => {
  Hooks.once('init', () => {
    const models: Record<string, typeof foundry.abstract.TypeDataModel<ArticleData>> = {}
    models[`${MODULE_ID}.article`] = ArticleModel
    Object.assign(CONFIG.Item.dataModels, models)
  })
}

export default registerArticleHooks
