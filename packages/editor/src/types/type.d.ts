import { CSSProperties } from "vue"
import type { Widget } from '@sepveneto/mpd-core'

export { WidgetPos } from '@sepveneto/mpd-core'

export type WidgetNode = Widget<Record<string, any>>

export type LikeWidgetNode = Pick<Widget, '_uuid' | 'style'> & { _name?: string }

type DisabledRules = boolean | Partial<{
  delete: boolean
  custom: boolean
  sort: boolean
}>

export type DisabledItemFn = (widget: LikeWidgetNode) => DisabledRules
