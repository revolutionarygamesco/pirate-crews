import type PirateCrewSheet from '../sheet.ts'

export interface PirateCrewSheetTab {
  id: string
  view: string
  edit: string
  icon?: string
  actions?: Record<string, (this: PirateCrewSheet, ...args: any[]) => unknown>
  dropSelectors?: string[]
  prepareContext?: (sheet: PirateCrewSheet, context: Record<string, any>) => void | Promise<void>
  prepareSubmitData?: (sheet: PirateCrewSheet, submitData: Record<string, any>) => void
  onDrop?: (sheet: PirateCrewSheet, event: DragEvent) => boolean | Promise<boolean>
  onRender?: (sheet: PirateCrewSheet, el: HTMLElement) => void
}
