import { CSSProperties } from "vue"

export type WidgetPos = {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}
export type WidgetNode = {
  _uuid?: string,
  _name: string,
  _view: string,
  _schema: string,
  style: WidgetPos & CSSProperties
  [key: string]: any,
}

export type LikeWidgetNode = Pick<WidgetNode, '_uuid' | 'style'> & { _name?: string }