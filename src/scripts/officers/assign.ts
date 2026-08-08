import { isString } from '@revolutionarygamesco/common'
import { type OfficerAssignments } from './assignments.ts'

const assignOfficer = (
  key: string,
  assignments: OfficerAssignments,
  actor: foundry.documents.Actor | string
): void => {
  const uuid = isString(actor) ? actor : actor.uuid

  for (const k in assignments) {
    if (assignments[k].actor === uuid) assignments[k].actor = null
  }

  assignments[key].actor = uuid
}

export default assignOfficer
