import { h, nextTick, onMounted, shallowRef, watch } from 'vue'
import type { Ref, UnwrapNestedRefs, VNode } from 'vue'
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
  grid: Ref<number>
  cellWidth: Ref<number>
  containerRect: { width: number, height: number }
  selected: Ref<GridItem>
  ViewRender: any
  type: 'swiper' | 'grid'
  columnGap: number,
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
      item.style.width = reOffset(item, options.grid, options.cellWidth)
    })
  }, { immediate: true })

  onMounted(() => {
    if (options.type === 'swiper' && swiperRef.value) {
      swiper.value = new Swiper(swiperRef.value, {})
      watch(() => options.list.length, () => {
        nextTick().then(() => swiper.value?.update())
      })
    }
  })

  const app = useApp()
  watch(() => app.selected, (selected) => {
    if (swiper.value) {
      // TODO: store element index in list
      // TODO: updateActiveIndex trigger rerender
      console.log(selected)
      // swiper.value.updateActiveIndex()
    }
  })

  function wrapSwiper(content: VNode) {
    return h('div', {
      class: 'swiper',
      ref: swiperRef,
      style: options.preview ? '' : 'height: 100%;',
      'data-type': 'swiper',
    }, content)
  }

  return {
    wrapSwiper,
    renderItem: (item: GridItem) => {
      const itemProps = {
        key: item._uuid,
        h: item.style.height,
        active: options.activeUuid === item._uuid || options.selected._uuid === item._uuid,
        element: item,
        options,
        'onUpdate:w': (val: number) => { item.style.width = val },
        'onUpdate:unit': (val: number) => { item._unit = val },
        'onUpdate:h': (val: number) => { item.style.height = val },
      }
      return h(ContainerItem, itemProps)
    },
  }
}

export function reOffset(item: GridItem, grid: number, cellWidth: number) {
  const unit = item._unit || 1
  const cellNum = Math.max(Math.min(unit, grid), 1)
  return cellNum * cellWidth
}
