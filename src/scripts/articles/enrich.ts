import { MODULE_ID } from '../settings.ts'
import { isCrewData, type CrewData } from '../crew/data.ts'
import sortShareGroups from './groups.ts'
import describeShares from './shares.ts'

export const enrichPirateCrewSharesArticle = async (
  match: RegExpMatchArray
): Promise<HTMLElement> => {
  const wrapper = document.createElement('span')
  const retrieved = await foundry.utils.fromUuid(match[1])
  const crew = (retrieved as foundry.documents.Actor & { system: CrewData })
  if (!isCrewData(crew.system)) return wrapper

  wrapper.innerHTML = describeShares(sortShareGroups(crew.system.officers))
  return wrapper
}

const registerPirateCrewSharesArticleEnricher = (): void => {
  console.log('')
  CONFIG.TextEditor.enrichers.push({
    id: [MODULE_ID, 'crewShares'].join('.'),
    pattern: /@PirateCrewSharesArticle\[(Actor\.[A-Za-z0-9]{16})\]/g,
    enricher: enrichPirateCrewSharesArticle
  })
}

export default registerPirateCrewSharesArticleEnricher
