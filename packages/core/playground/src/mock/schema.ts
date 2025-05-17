import type { ISchema } from '../../../src'
import type { Card } from './types'

export const card: ISchema<Card> = [
  { type: 'input', key: 'name', label: 'name', rules: [{ required: true, message: 'name' }] },
  { type: 'input', key: 'age', label: 'age', rules: [{ required: true, message: 'age' }] },
]
