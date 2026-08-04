import { generateApplicationPosition } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import CrewModel from './schema.ts'

class PirateCrewSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  editing: boolean = this.isEditable

  static DEFAULT_OPTIONS = {
    classes: ['pirate-crew'],
    position: generateApplicationPosition({ height: 2/3, width: 1/3 }),
    window: { resizable: true },
    actions: {
      toggleEdit: PirateCrewSheet.toggleEdit
    },
    form: {
      submitOnChange: true
    }
  }

  static PARTS = {
    header: { template: `modules/${MODULE_ID}/templates/sheets/crew/header.hbs` },
    view: { template: `modules/${MODULE_ID}/templates/sheets/crew/view.hbs` },
    edit: { template: `modules/${MODULE_ID}/templates/sheets/crew/edit.hbs` }
  }

  get isEditing () {
    return this.editing && this.isEditable;
  }

  _configureRenderOptions (options: Record<string, any>) {
    super._configureRenderOptions(options)
    options.parts = ['header']
    if (this.document.limited) return
    options.parts.push(this.isEditing ? 'edit' : 'view')
  }

  async _prepareContext (options: Record<string, any>) {
    const system = this.actor.system as unknown as CrewModel
    const context = await super._prepareContext(options)
    context.actor = this.actor
    context.system = system
    context.fields = system.schema.fields
    context.editable = this.isEditable
    context.editing = this.isEditing
    return context
  }

  static async toggleEdit (this: PirateCrewSheet) {
    this.editing = !this.editing
    await this.render()
  }
}

export default PirateCrewSheet
