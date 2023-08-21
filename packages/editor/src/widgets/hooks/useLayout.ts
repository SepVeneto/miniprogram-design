import { h, nextTick, onMounted, ref, shallowRef, watch, withModifiers } from 'vue'
import type { Ref, UnwrapNestedRefs, VNode } from 'vue'
import { ResizeDomCore } from '@sepveneto/free-dom'
import DraggableWrapper from '@/components/draggableWrapper.vue'
import type { HoverActiveReturn } from './useHoverActive'
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper'
import 'swiper/css'
import ContainerItem from '../container.item.vue'
import { useApp } from '@/store'

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
  const app = useApp()
  const swiperRef = shallowRef<HTMLElement>()
  const swiper = shallowRef()

  watch([() => options.list.length, () => options.cellWidth], () => {
    options.list.forEach((item: any) => {
      item.style.height = item.style.height || undefined
      if (!options.cellWidth) {
        return
      }
      reOffset(item, options.containerRect, options.cellWidth, options.columnGap)
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
      const itemProps = {
        key: item._uuid,
        active,
        element: item,
        options,
      }
      return h(ContainerItem, itemProps)
    },
  }
}

function reOffsetAll(
  list: GridOptions['list'],
  containerSize: GridOptions['containerRect'],
  cellWidth: number,
  columnGap = 0,
) {
  list.forEach(item => reOffset(item, containerSize, cellWidth, columnGap))
}
function reOffset(item: GridItem, containerSize: GridOptions['containerRect'], cellWidth: number, columnGap = 0) {
  if (!item.style.width) {
    item.style.width = cellWidth
    return
  }
  // console.log(normalizeSize(item.style.width, 'width', containerSize))
  const cellNum = Math.round(normalizeSize(item.style.width, 'width', containerSize) / cellWidth)
  const offset = Math.max((cellNum - 1), 0) * columnGap
  // console.log(cellNum, cellWidth, offset)
  item.style.width = cellNum * cellWidth + offset
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
