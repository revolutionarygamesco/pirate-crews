import { getClickedDocument } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { type CrewData } from './data.ts'
import CrewModel from './schema.ts'
import PirateCrewSheet from './sheet.ts'

const registerCrewHooks = () => {
  Hooks.once('init', () => {
    const models: Record<string, typeof foundry.abstract.TypeDataModel<CrewData>> = {}
    models[`${MODULE_ID}.crew`] = CrewModel
    Object.assign(CONFIG.Actor.dataModels, models)

    foundry.applications.apps.DocumentSheetConfig.registerSheet(
      foundry.documents.Actor,
      MODULE_ID,
      PirateCrewSheet,
      {
        types: [`${MODULE_ID}.crew`],
        makeDefault: false,
        label: `${MODULE_ID}.sheet.label`
      }
    )
  })

  Hooks.on('preCreateActor', (actor: any) => {
    if (actor.type === `${MODULE_ID}.crew` && actor.img === 'icons/svg/mystery-man.svg') {
      actor.updateSource({ img: `modules/${MODULE_ID}/images/pirate.webp` })
    }
  })

  Hooks.on('getActorContextOptions', (_directory: any, entries: any[]) => {
    const edit = entries.find((entry: any) => entry.label === 'SIDEBAR.Edit')
    if (!edit) return

    const original = edit.onClick
    edit.onClick = (event: PointerEvent, el: HTMLElement) => {
      const actor = getClickedDocument(el, game.actors)
      const sheet = (actor as any)?.sheet
      if (sheet instanceof PirateCrewSheet) sheet.editing = true
      return original(event, el)
    }
  })
}

export default registerCrewHooks
