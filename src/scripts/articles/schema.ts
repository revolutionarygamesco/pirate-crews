import { type ArticleData } from './data.ts'

class ArticleModel extends foundry.abstract.TypeDataModel<ArticleData> {
  static defineSchema () {
    const fields = foundry.data.fields
    return {
      body: new fields.HTMLField()
    }
  }
}

export default ArticleModel
