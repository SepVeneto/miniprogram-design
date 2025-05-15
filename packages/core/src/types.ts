import type { FormItemRule } from 'element-plus'
import type { CSSProperties } from 'vue'

// region Widget
export type WidgetPos = {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

type Base<T = any> = {
  _uuid?: string
  _name: string
  _schema: string
  _view: string
  _custom?: boolean
  _disableDel?: boolean
  _inContainer?: 'inner' | 'outer' | boolean
  isShow?: 0 | 1
  style: CSSProperties & WidgetPos
} & T

type BaseKey =
'_inContainer'
| '_custom'
| '_disableDel'
| '_name'
| '_schema'
| '_uuid'
| '_view'

export type IWidget<T extends Base = any> = Base<T>
// endregion

// region Schema
// type WidgetType =
//   'input'
//   | 'number'
//   | 'checkbox'
//   | 'image'
//   | 'colorPicker'
//   | 'select'
//   | 'radioGroup'
//   | 'editor'
//   | 'box'
//   | 'switch'
type BoxModel = 'marginLeft'
| 'marginTop'
| 'marginRight'
| 'marginBottom'
| 'paddingLeft'
| 'paddingTop'
| 'paddingRight'
| 'paddingBottom'
| 'borderLeft'
| 'borderTop'
| 'borderBottom'
| 'borderight'

type SchemaRule = FormItemRule

type ValidKey<T extends Base> = Exclude<keyof T, BaseKey> | `style.${string}`

export type SchemaOther<T extends Base> = {
  [k in ValidKey<T>]: {
    type: string
    label?: string
    key: k
    tips?: string
    link?: Record<string, SchemaOther<T>[]>
    _inContainer?: 'outer' | 'inner'
    onChange?: (data: any) => void,
    rules?: SchemaRule[]
    [other: string]: any
  }
}[ValidKey<T>]

export type SchemaBox = {
  type: 'box'
  _inContainer?: 'outer' | 'inner'
  include?: BoxModel[]
  exclude?: BoxModel[]
}

export type ISchema<T extends Record<string, any> = any> = (SchemaOther<T> | SchemaBox)[]

export function isBox(schema: ISchema<any>[number]): schema is SchemaBox {
  return schema.type === 'box'
}

// endregion
