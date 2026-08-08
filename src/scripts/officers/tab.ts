import { makeLink, type Linkable, getDroppedDocument } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import  PirateCrewSheet from '../crew/sheet.ts'
import { type PirateCrewSheetTab } from '../crew/tabs/tab.ts'
import loadOfficers from './load.ts'

const officers: PirateCrewSheetTab = {
  id: 'officers',
  view: `modules/${MODULE_ID}/templates/sheets/crew/officers/view.hbs`,
  edit: `modules/${MODULE_ID}/templates/sheets/crew/officers/view.hbs`,
  icon: 'fa-solid fa-skull-crossbones',
  dropSelectors: ['.officer'],

  async prepareContext (
    sheet: PirateCrewSheet,
    context: Record<string, any>
  ): Promise<void> {
    const defs = loadOfficers()
    const assignments = sheet.crew.officers

    context.officers = []
    for (const key in defs) {
      const actor = assignments[key]?.actor
        ? await foundry.utils.fromUuid(assignments[key].actor) as Linkable | null
        : null

      context.officers.push({
        key,
        ...defs[key],
        shares: assignments[key]?.shares ?? 1,
        actor: actor
          ? await foundry.applications.ux.TextEditor.enrichHTML(makeLink(actor))
          : null
      })
    }
  },

  async onDrop (
    sheet: PirateCrewSheet,
    event: DragEvent
  ): Promise<boolean> {
    const wrapper = (event.target as HTMLElement).closest<HTMLElement>('.officer')
    const key = wrapper?.dataset.officerKey
    if (!key || !(key in loadOfficers())) return false

    const actor = await getDroppedDocument<foundry.documents.Actor>(event, 'Actor')
    if (!actor?.uuid) return false

    await sheet.actor.update({ [`system.officers.${key}.actor`]: actor.uuid })
    return true
  }
}

export default officers
