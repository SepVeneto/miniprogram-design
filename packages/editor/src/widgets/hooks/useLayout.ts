import { h, nextTick, onMounted, shallowRef, watch, withModifiers } from 'vue'
import type { Ref, UnwrapNestedRefs, VNode } from 'vue'
import { freeDom as FreeDom } from '@sepveneto/free-dom'
import DraggableWrapper from '@/components/draggableWrapper.vue'
import type { HoverActiveReturn } from './useHoverActive'
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper'
import 'swiper/css'

type GridItem = Record<string, any>
type GridOptions = UnwrapNestedRefs<{
  preview: Ref<boolean>
  list: Ref<GridItem[]>
  cellWidth: Ref<number>
  containerRect: { width: number, height: number }
  selected: Ref<GridItem>
  ViewRender: any
  type: 'swiper' | 'grid'
  handleSelect: (item: GridItem) => void
} & HoverActiveReturn>
export function useGrid(options: GridOptions) {
  const swiperRef = shallowRef<HTMLElement>()
  const swiper = shallowRef()

  watch([() => options.list.length, () => options.cellWidth], () => {
    options.list.forEach((item: any) => {
      item.style.height = item.style.height || undefined
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

  function wrapResizable(node: any, element: any) {
    const { containerRect, preview, cellWidth, onDragEnd, onDragStart, onEnter, onLeave, list, handleSelect } = options
    return h(FreeDom, {
      key: element._uuid,
      width: normalizeSize(element.style.width, 'width', containerRect),
      height: normalizeSize(element.style.height, 'height', containerRect),
      x: 0,
      y: 0,
      preview,
      scale: ['rb'],
      absolute: false,
      diagonal: false,
      grid: [cellWidth, 1],
      handler: 'mark',
      onDragStart,
      onDragEnd,
      onMouseenter: withModifiers(() => onEnter(element._uuid), ['stop']),
      onMouseleave: withModifiers(onLeave, ['stop']),
      onClick: withModifiers(() => handleSelect(element), ['stop']),
      'onUpdate:width': (val: number) => {
        element.style.width = normalizeSize(val, 'width', containerRect)
        reOffsetAll(list, containerRect, cellWidth)
      },
      'onUpdate:height': (val: number) => { element.style.height = normalizeSize(val, 'height', containerRect) },
    }, () => node)
  }
  function renderItem(element: GridItem) {
    const { preview, activeUuid, onEnter, onLeave, handleSelect } = options
    const base = {
      dir: 'top',
      active: options.selected._uuid === element._uuid || activeUuid === element._uuid,
      hide: element.isShow != null && !element.isShow,
      mask: true,
    }
    const swiper = {
      ...base,
      class: [options.type === 'swiper' && 'swiper-slide'],
      onMouseenter: withModifiers(() => onEnter(element._uuid), ['stop']),
      onMouseleave: withModifiers(onLeave, ['stop']),
      onClick: withModifiers(() => handleSelect(element), ['stop']),
    }
    const props = options.type === 'swiper' ? swiper : base
    return !preview
      ? h(DraggableWrapper, props, () => getRenderContent(element))
      : h('div', {
        class: [options.type === 'swiper' && 'swiper-slide'],
        style: { height: '100%' },
      }, getRenderContent(element))
  }
  function getRenderContent(element: any) {
    switch (element._view) {
      case 'container':
        return undefined
      default:
        return options.ViewRender
          ? h(options.ViewRender, {
            type: element._view,
            config: element,
          })
          : h('div', element._view)
    }
  }
  function wrapSwiper(content: VNode) {
    return h('div', {
      class: 'swiper',
      ref: swiperRef,
      'data-type': 'swiper',
    }, content)
  }

  return {
    wrapSwiper,
    renderItem: (item: GridItem) => options.type === 'swiper' ? renderItem(item) : wrapResizable(renderItem(item), item),
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
  const cellNum = Math.round(normalizeSize(item.style.width, 'width', containerSize) / cellWidth)
  const offset = (cellNum - 1 ? cellNum - 1 : 0) * columnGap
  item.style.width = cellNum * cellWidth + offset
  console.log(cellNum, cellWidth, item.style.width, 'offset')
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
