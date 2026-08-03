import { type CrewData } from './data.ts'
import loadOfficers from '../officers/load.ts'
import loadProvisions from '../provisions/load.ts'

class CrewModel extends foundry.abstract.TypeDataModel<CrewData> {
  static defineSchema () {
    const fields = foundry.data.fields
    const officers = loadOfficers()
    const provisions = loadProvisions()

    return {
      articles: new fields.ArrayField(new fields.HTMLField()),
      officers: new fields.SchemaField(
        Object.fromEntries(
          Object.keys(officers).map(key => [
            key,
            new fields.SchemaField({
              title: new fields.StringField({ initial: officers[key].title }),
              description: new fields.HTMLField({ initial: officers[key].desc }),
              sans: new fields.HTMLField({ initial: officers[key].sans }),
              shares: new fields.NumberField({ max: 20, min: 1, initial: officers[key].shares })
            })
          ])
        )
      ),
      watchCrews: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField(),
        lead: new fields.StringField({
          choices: Object.fromEntries(
            Object.keys(officers).map(key => [key, officers[key].title])
          )
        }),
        members: new fields.ArrayField(new fields.DocumentUUIDField({ type: 'Actor' })),
        onDuty: new fields.BooleanField({ initial: false })
      })),
      provisions: new fields.SchemaField(
        Object.fromEntries(
          Object.keys(provisions).map(key => [
            key,
            new fields.SchemaField({
              label: new fields.StringField({ initial: provisions[key].label }),
              value: new fields.NumberField({ min: 0, initial: 0 })
            })
          ])
        )
      ),
      stock: new fields.NumberField({ min: 0, initial: 0 })
    }
  }
}

export default CrewModel
