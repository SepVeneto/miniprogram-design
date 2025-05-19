import type { ISchema } from '../../../src'
import type { Card } from './types'

export const card: ISchema<Card> = [
  { type: 'switch', label: '是否显示', key: 'isShow', activeValue: 1, inactiveValue: 0 },
  { type: 'input', key: 'name', label: 'name', rules: [{ required: true, message: 'name' }] },
  { type: 'input', key: 'age', label: 'age', rules: [{ required: true, message: 'age' }] },
]
