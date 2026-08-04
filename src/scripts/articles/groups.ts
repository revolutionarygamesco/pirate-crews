import { type OfficerAssignments } from '../officers/assignments.ts'

export interface ShareGroup {
  shares: number
  titles: string[]
}

const sortShareGroups = (
  assignments: OfficerAssignments
): ShareGroup[] => {
  const data: Map<number, string[]> = new Map()

  for (const key in assignments) {
    const shares = assignments[key].shares
    const arr = data.get(shares) ?? []
    arr.push(game.i18n.localize(assignments[key].title))
    data.set(shares, arr)
  }

  return data.entries().toArray().map(([shares, titles]) => {
    return { shares, titles }
  })
}

export default sortShareGroups
