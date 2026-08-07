import { type CrewData } from './data.ts'

class CrewModel extends foundry.abstract.TypeDataModel<CrewData> {
  static defineSchema () {
    const fields = foundry.data.fields

    return {
      officers: new fields.TypedObjectField(
        new fields.SchemaField({
          actor: new fields.DocumentUUIDField({ type: 'Actor', nullable: true, required: false, initial: null }),
          shares: new fields.NumberField({ min: 0, step: 0.25, initial: 1 })
        })
      ),
      watchCrews: new fields.ArrayField(
        new fields.SchemaField({
          name: new fields.StringField({ required: true }),
          lead: new fields.StringField({ required: false, blank: true, initial: '' }),
          members: new fields.ArrayField(
            new fields.DocumentUUIDField({ type: 'Actor', nullable: true, required: false, initial: null })
          ),
          onDuty: new fields.BooleanField({ initial: false })
        })
      ),
      provisions: new fields.TypedObjectField(
        new fields.NumberField({ min: 0, initial: 0 })
      ),
      stock: new fields.NumberField({ min: 0, initial: 0 }),
      articles: new fields.DocumentUUIDField({ type: 'JournalEntry', nullable: true, required: false, initial: null }),
      ship: new fields.DocumentUUIDField({ nullable: true, required: false, initial: null })
    }
  }
}

export default CrewModel
