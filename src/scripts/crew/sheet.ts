import { generateApplicationPosition } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import CrewModel from './schema.ts'

class PirateCrewSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  editing: boolean = false

  static DEFAULT_OPTIONS = {
    classes: ['pirate-crew'],
    position: generateApplicationPosition({ height: 2/3, width: 750 }),
    window: { resizable: true },
    actions: {
      toggleEdit: PirateCrewSheet.toggleEdit
    },
    form: {
      submitOnChange: true
    }
  }

  static TABS = {
    primary: {
      tabs: [
        { id: 'articles', icon: 'fa-solid fa-feather-pointed' },
        { id: 'officers', icon: 'fa-solid fa-skull-crossbones' },
        { id: 'watchCrews', icon: 'fa-solid fa-anchor' },
        { id: 'provisions', icon: 'fa-solid fa-cookie' },
        { id: 'assets', icon: 'fa-solid fa-sailboat' }
      ],
      initial: 'articles',
      labelPrefix: `${MODULE_ID}.sheet.tabs`
    }
  }

  static PARTS = {
    header: { template: `modules/${MODULE_ID}/templates/sheets/crew/header.hbs` },
    tabs: { template: 'templates/generic/tab-navigation.hbs' },
    articles: { template: `modules/${MODULE_ID}/templates/sheets/crew/articles/view.hbs` },
    officers: { template: `modules/${MODULE_ID}/templates/sheets/crew/officers/view.hbs` },
    watchCrews: { template: `modules/${MODULE_ID}/templates/sheets/crew/watchCrews/view.hbs` },
    provisions: { template: `modules/${MODULE_ID}/templates/sheets/crew/provisions/view.hbs` },
    assets: { template: `modules/${MODULE_ID}/templates/sheets/crew/assets/view.hbs` }
  }

  get isEditing () {
    return this.editing && this.isEditable;
  }

  _configureRenderParts (options: Record<string, any>) {
    const parts = super._configureRenderParts(options)
    const mode = this.isEditing ? 'edit' : 'view'
    for (const tab of PirateCrewSheet.TABS.primary.tabs) {
      if (!parts[tab.id]) continue
      parts[tab.id] = {
        ...parts[tab.id],
        template: `modules/${MODULE_ID}/templates/sheets/crew/${tab.id}/${mode}.hbs`
      }
    }
    return parts
  }

  _configureRenderOptions (options: Record<string, any>) {
    super._configureRenderOptions(options)
    options.parts = ['header']
    if (this.document.limited) return

    options.parts.push('tabs')
    for (const tab of PirateCrewSheet.TABS.primary.tabs) {
      options.parts.push(tab.id)
    }
  }

  async _preparePartContext (partId: string, context: Record<string, any>, options: Record<string, any>) {
    context = await super._preparePartContext(partId, context, options)
    if (context.tabs?.[partId]) context.tab = context.tabs[partId]
    return context
  }

  async _prepareContext (options: Record<string, any>) {
    const system = this.actor.system as unknown as CrewModel
    const context = await super._prepareContext(options)
    context.actor = this.actor
    context.system = system
    context.fields = system.schema.fields
    context.editable = this.isEditable
    context.editing = this.isEditing
    context.tabs = this._prepareTabs('primary')
    return context
  }

  _onClose (options: Record<string, any>) {
    super._onClose(options)
    this.editing = false
  }

  static async toggleEdit (this: PirateCrewSheet) {
    this.editing = !this.editing
    await this.render()
  }
}

export default PirateCrewSheet
