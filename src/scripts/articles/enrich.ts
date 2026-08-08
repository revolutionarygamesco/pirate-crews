import { MODULE_ID } from '../settings.ts'
import sortShareGroups from './groups.ts'
import describeShares from './shares.ts'

export const enrichPirateCrewSharesArticle = async (
  match: RegExpMatchArray
): Promise<HTMLElement> => {
  const wrapper = document.createElement('span')
  const crew = await foundry.utils.fromUuid(match[1])

  if (!(crew as ))
}

const registerPirateCrewSharesArticleEnricher = (): void => {
  CONFIG.TextEditor.enrichers.push({
    id: [MODULE_ID, 'crewShares'].join('.'),
    pattern: /@CrewShares\[([^\]]+)\]/g,
    enricher: enrichPirateCrewSharesArticle
  })
}

export default registerPirateCrewSharesArticleEnricher
