import { type OfficerAssignments } from '../officers/assignments.ts'
import loadOfficers from '../officers/load.ts'

export interface ShareGroup {
  shares: number
  titles: string[]
}

const sortShareGroups = (
  assignments: OfficerAssignments
): ShareGroup[] => {
  const data: Map<number, string[]> = new Map()
  const defs = loadOfficers()

  for (const key in assignments) {
    const shares = assignments[key].shares
    const arr = data.get(shares) ?? []
    const title = defs[key]?.title ?? key
    arr.push(title)
    data.set(shares, arr)
  }

  return data.entries().toArray().map(([shares, titles]) => {
    return { shares, titles }
  })
}

export default sortShareGroups
