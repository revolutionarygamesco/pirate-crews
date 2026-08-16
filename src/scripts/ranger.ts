import { getID } from '@revolutionarygamesco/common-foundryvtt'
import {
  mockFromUuid,
  mockActor,
  mockActors,
  mockItem,
  mockItems,
  mockJournal,
  mockJournalEntry
} from '@revolutionarygamesco/common-foundryvtt/mocks'
import { MODULE_ID } from './settings.ts'
import { createSpecialization } from './crew/types/specialization.ts'
import { createCrewData, type CrewData } from './crew/types/data.ts'

interface CrewTestData {
  crew: CrewData
  actor: foundry.documents.Actor
}

const setupRanger = (
  shipType: 'Actor' | 'Item',
  shipSubType?: string
): CrewTestData => {
  const crew = createCrewData()

  const ranger = shipType === 'Actor'
    ? mockActor({ name: 'Ranger', documentName: 'Actor', type: shipSubType })
    : mockItem({ name: 'Ranger', documentName: 'Item', type: shipSubType })
  const charles = mockActor({ name: 'Charles Vane', documentName: 'Actor', type: 'creature' })
  const jack = mockActor({ name: '“Calico” Jack Rackham', documentName: 'Actor', type: 'creature' })
  const anne = mockActor({ name: 'Anne Bonny', documentName: 'Actor', type: 'creature' })
  const mary = mockActor({ name: 'Mary Read', documentName: 'Actor', type: 'creature' })
  const actor = mockActor({ name: 'The Flying Gang', documentName: 'Actor', type: `${MODULE_ID}.crew` })
  const articles = mockJournalEntry({ name: 'Articles', documentName: 'JournalEntry' })
  actor.system = crew

  crew.ship = ranger.uuid!
  crew.articles = articles.uuid!
  crew.specialists.captain = createSpecialization({ title: 'Captain', actor: charles.uuid! })
  crew.specialists.quartermaster = createSpecialization({ title: 'Quartermaster', actor: jack.uuid! })
  crew.teams.starboard = [anne.uuid!]
  crew.teams.larboard = [mary.uuid!]

  mockFromUuid({
    [actor.uuid!]: actor,
    [ranger.uuid!]: ranger,
    [charles.uuid!]: charles,
    [jack.uuid!]: jack,
    [anne.uuid!]: anne,
    [mary.uuid!]: mary
  })

  const actors: Record<string, foundry.documents.Actor> = {
    [getID(actor.uuid!)]: actor,
    [getID(charles.uuid!)]: charles,
    [getID(jack.uuid!)]: jack,
    [getID(anne.uuid!)]: anne,
    [getID(mary.uuid!)]: mary
  }

  mockJournal({
    [getID(articles.uuid!)]: articles
  })

  if (shipType === 'Actor') {
    actors[getID(ranger.uuid!)] = ranger as foundry.documents.Actor
    mockActors(actors)
  } else {
    mockActors(actors)
    mockItems({
      [getID(ranger.uuid!)]: ranger as foundry.documents.Item
    })
  }

  return { crew, actor }
}

export default setupRanger
