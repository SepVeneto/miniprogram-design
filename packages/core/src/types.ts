import type { CSSProperties } from 'vue'

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

export type Schema<T extends Base> = {
  [k in (Exclude<keyof T, BaseKey> | `style.${string}`)]: {
    type: string
    label: string
    key: k
    [other: string]: any
  }
}[Exclude<keyof T, BaseKey> | `style.${string}`][]

export type Widget<T extends Base> = Base<T>
