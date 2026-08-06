import type PirateCrewSheet from '../sheet.ts'

export interface PirateCrewSheetTab {
  id: string
  icon: string
  prepareContext: (sheet: PirateCrewSheet, context: Record<string, any>) => void | Promise<void>
  actions: Record<string, (this: PirateCrewSheet, ...args: any[]) => unknown>
  prepareSubmitData: (sheet: PirateCrewSheet, submitData: Record<string, any>) => void
}
