import { makeOxfordList } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { type ShareGroup } from './groups.ts'
import describeNumbers from './numbers.ts'

const describeShares = (
  groups: ShareGroup[]
): string => {
  const t = scopeLocalizer([MODULE_ID, 'articles', 'shares'].join('.'))

  const auction = t('auction')
  if (groups.length < 2) return `${t('equal')} ${auction}`

  const clauses = groups.map(({ shares, titles }, index) => {
    const officers = makeOxfordList(titles)
    const amount = describeNumbers(shares)
    const code = index === 0 ? 'initial' : 'following'
    return t([code], { officers, amount })
  })

  return `${clauses.join(', ')}, ${t('final')} ${auction}`
}

export default describeShares
