import type { LayoutItem } from './type'
import { K_X, K_Y, genId } from './utils'

export function layoutFix(layout: LayoutItem[]) {
  const originLayout = [...layout]

  const [normalizeLayout, layoutMap] = normalize(layout)
}

// 判断是否是同一行的第一个
function isXFirst(item: LayoutItem, layout: LayoutItem[]) {

}
