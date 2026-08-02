import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'

const describeNumbers = (
  n: number
): string => {
  const whole = Math.floor(n)
  const fraction = n - whole
  const rounded = Math.round(fraction * 20) / 20
  const code = `p${Math.round(rounded * 100).toString().padStart(2, '0')}`

  const t = scopeLocalizer([MODULE_ID, 'articles', 'shares'].join('.'))
  const num = t(whole.toString())
  const conj = t('conj')
  const frac = t(code)

  return fraction < 0.05
    ? num
    : `${num} ${conj} ${frac}`
}

export default describeNumbers
