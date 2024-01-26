import { h, nextTick, onMounted, shallowRef, watch } from 'vue'
import type { Ref, UnwrapNestedRefs, VNode } from 'vue'
import type { HoverActiveReturn } from './useHoverActive'
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper'
import 'swiper/css'
import ContainerItem from '../container.item.vue'

export type GridItem = Record<string, any>
export type GridOptions = UnwrapNestedRefs<{
  preview: Ref<boolean>
  list: Ref<GridItem[]>
  cellWidth: Ref<number>
  containerRect: { width: number, height: number }
  selected: Ref<GridItem>
  ViewRender: any
  type: 'swiper' | 'grid'
  columnGap: number,
  errorLoading: boolean,
  handleSelect: (item: GridItem) => void
} & HoverActiveReturn>
export function useGrid(options: GridOptions) {
  const swiperRef = shallowRef<HTMLElement>()
  const swiper = shallowRef()

  watch([() => options.list.length, () => options.cellWidth], () => {
    options.list.forEach((item: any) => {
      if (!item.style) {
        item.style = {}
      } else {
        item.style.height = item.style.height || undefined
      }
      if (!options.cellWidth) {
        return
      }
      reOffset(item, options.containerRect, options.cellWidth)
    })
  }, { immediate: true })

  onMounted(() => {
    if (options.type === 'swiper' && swiperRef.value && options.preview) {
      swiper.value = new Swiper(swiperRef.value, {})
      watch(() => options.list.length, () => {
        nextTick().then(() => swiper.value?.update())
      })
    }
  })

  function wrapSwiper(content: VNode) {
    return h('div', {
      class: 'swiper',
      ref: swiperRef,
      'data-type': 'swiper',
    }, content)
  }

  return {
    wrapSwiper,
    renderItem: (item: GridItem) => {
      const active = options.selected._uuid === item._uuid || options.activeUuid === item._uuid
      const { width, height } = item.style
      const _w = normalizeSize(width, 'width', options.containerRect)
      const _h = normalizeSize(height, 'height', options.containerRect)
      const style = {
        float: 'left',
        // padding: `${options.rowGap}px ${options.columnGap}px`,
        boxSizing: 'border-box',
      }
      const itemProps = {
        style,
        key: item._uuid,
        w: _w,
        h: _h,
        active,
        element: item,
        options,
        'onUpdate:w': (val: number) => { item.style.width = val },
        'onUpdate:h': (val: number) => { item.style.height = val },
      }
      return h(ContainerItem, itemProps)
    },
  }
}

function reOffset(item: GridItem, containerSize: GridOptions['containerRect'], cellWidth: number) {
  if (!item.style.width) {
    item.style.width = cellWidth
    return
  }
  const cellNum = Math.round(normalizeSize(item.style.width, 'width', containerSize) / cellWidth)
  // const offset = Math.max((cellNum - 1), 0) * columnGap
  item.style.width = cellNum * cellWidth
  // + offset
}
function normalizeSize(
  val: number | string,
  type: 'width' | 'height',
  container: { width: number, height: number },
): number {
  if (typeof val === 'string') {
    if (type === 'width') {
      return container.width * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1)
    } else {
      return container.height * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1)
    }
  } else {
    return val
  }
}
