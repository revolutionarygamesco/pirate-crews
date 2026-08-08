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

    for (const key in assignments) {
      context.officers.push({
        ...defs[key],
        ...assignments[key]
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
