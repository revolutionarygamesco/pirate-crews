import { makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import  PirateCrewSheet from '../crew/sheet.ts'
import { type PirateCrewSheetTab } from '../crew/tabs/tab.ts'
import loadOfficers from './load.ts'

const officers: PirateCrewSheetTab = {
  id: 'officers',
  icon: 'fa-solid fa-skull-crossbones',

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

  actions: {},

  prepareSubmitData (
    _sheet: PirateCrewSheet,
    _submitData: Record<string, any>
  ) {
    return
  },

  onRender (
    _sheet: PirateCrewSheet,
    _el: HTMLElement
  ) {
    return
  }
}

export default officers
