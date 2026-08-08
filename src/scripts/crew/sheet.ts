import {
  generateApplicationPosition,
  getDroppedDocument,
  makeLink,
  type Linkable
} from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { type CrewData } from './data.ts'
import CrewModel from './schema.ts'
import tabs from './tabs/index.ts'

const tabActions = () => Object.assign({}, ...tabs.map(tab => tab.actions ?? {}))
const tabDropSelectors = () => tabs.flatMap(tab => (tab.dropSelectors ?? []).map(dropSelector => ({ dropSelector })))

class PirateCrewSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  editing: boolean = false
  tabState: Record<string, Record<string, unknown>> = {}

  static DEFAULT_OPTIONS = {
    classes: ['pirate-crew'],
    position: generateApplicationPosition({ height: 2/3, width: 750 }),
    window: { resizable: true },
    actions: {
      toggleEdit: PirateCrewSheet.toggleEdit,
      ...tabActions()
    },
    form: {
      submitOnChange: true
    },
    dragDrop: [
      { dropSelector: '.crew-header .related .articles' },
      { dropSelector: '.crew-header .related .ship' },
      ...tabDropSelectors()
    ]
  }

  static TABS = {
    primary: {
      tabs: tabs.map(({ id, icon }) => ({ id, icon })),
      initial: tabs[0].id,
      labelPrefix: `${MODULE_ID}.sheet.tabs`
    }
  }

  static PARTS = {
    header: { template: `modules/${MODULE_ID}/templates/sheets/crew/header.hbs` },
    tabs: { template: 'templates/generic/tab-navigation.hbs' },
    ...Object.fromEntries(tabs.map(tab => [
      tab.id,
      {
        template: `modules/${MODULE_ID}/templates/sheets/crew/${tab.id}/view.hbs`,
        scrollable: ['']
      }
    ]))
  }

  get isEditing () {
    return this.editing && this.isEditable
  }

  get crew (): CrewModel & CrewData {
    return this.actor.system as unknown as CrewModel & CrewData
  }

  _configureRenderParts (options: Record<string, any>) {
    const parts = super._configureRenderParts(options)
    const mode = this.isEditing ? 'edit' : 'view'
    for (const tab of tabs) {
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
    for (const tab of tabs) {
      options.parts.push(tab.id)
    }
  }

  async _preparePartContext (partId: string, context: Record<string, any>, options: Record<string, any>) {
    context = await super._preparePartContext(partId, context, options)
    if (context.tabs?.[partId]) context.tab = context.tabs[partId]
    const tab = tabs.find(t => t.id === partId)
    if (tab?.prepareContext) await tab.prepareContext(this, context)
    return context
  }

  async _prepareContext (options: Record<string, any>) {
    const articles = this.crew.articles
      ? await foundry.utils.fromUuid(this.crew.articles) as foundry.documents.JournalEntry
      : null
    const ship = this.crew.ship
      ? await foundry.utils.fromUuid(this.crew.ship) as unknown as Linkable
      : null

    const context = await super._prepareContext(options)
    context.actor = this.actor
    context.system = this.crew
    context.fields = this.crew.schema.fields
    context.editable = this.isEditable
    context.editing = this.isEditing
    context.tabs = this._prepareTabs('primary')
    context.articles = articles
      ? await foundry.applications.ux.TextEditor.enrichHTML(makeLink(articles))
      : null
    context.ship = ship
      ? await foundry.applications.ux.TextEditor.enrichHTML(makeLink(ship))
      : null
    return context
  }

  _prepareSubmitData (event: SubmitEvent, form: HTMLFormElement, formData: any, updateData?: object) {
    const submitData = super._prepareSubmitData(event, form, formData, updateData)
    for (const tab of tabs) tab.prepareSubmitData?.(this, submitData)
    return submitData
  }

  async _onRender (context: Record<string, any>, options: Record<string, any>) {
    await super._onRender(context, options)
    for (const tab of tabs) tab.onRender?.(this, this.element)
  }

  _onClose (options: Record<string, any>) {
    super._onClose(options)
    this.editing = false
    this.tabState = {}
  }

  static async toggleEdit (this: PirateCrewSheet) {
    this.editing = !this.editing
    await this.render()
  }

  _canDragDrop (_selector: string): boolean {
    return this.isEditable
  }

  async _onDrop (event: DragEvent): Promise<void> {
    const target = event.target as HTMLElement

    if (target.closest('.articles')) {
      const journal = await getDroppedDocument<foundry.documents.JournalEntry>(event, 'JournalEntry')
      if (!journal?.uuid) return
      await this.actor.update({ 'system.articles': journal.uuid })
      return
    }

    if (target.closest('.ship')) {
      Hooks.callAll(`${MODULE_ID}.dropShip`, this.actor, event)
    }

    for (const tab of tabs) {
      if (await tab.onDrop?.(this, event)) return
    }
  }
}

export default PirateCrewSheet
