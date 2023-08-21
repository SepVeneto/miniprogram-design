<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { computed, defineComponent, h, withModifiers } from 'vue'
import type { GridItem, GridOptions } from './hooks'
import { ResizeDomCore } from '@sepveneto/free-dom'

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    element: {
      type: Object,
      default: () => ({}),
    },
    active: Boolean,
  },
  setup(props) {
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
    function renderItem(element: GridItem) {
      const { preview, onEnter, onLeave, handleSelect } = props.options
      const base = {
        dir: 'top',
        active: props.active,
        hide: element.isShow != null && !element.isShow,
        mask: true,
      }
      const swiper = {
        ...base,
        class: [props.options.type === 'swiper' && 'swiper-slide'],
        onMouseenter: () => onEnter(element._uuid),
        onMouseleave: onLeave,
        onClick: withModifiers(() => handleSelect(element), ['stop']),
      }
      const wrapperProps = props.options.type === 'swiper' ? swiper : { ...base, style: 'width: 100%; height: 100%;' }
      return !preview
        ? h(DraggableWrapper, { ...wrapperProps, aactive: props.active }, () => getRenderContent(element))
        : h('div', {
          class: [props.options.type === 'swiper' && 'swiper-slide'],
          style: { height: '100%' },
        }, () => getRenderContent(element))
    }
    function getRenderContent(element: any) {
      switch (element._view) {
        case 'container':
          return undefined
        default:
          return props.options.ViewRender
            ? h(props.options.ViewRender, {
              type: element._view,
              config: element,
            })
            : h('div', props.options.errorLoading ? '加载失败!' : '加载中...')
      }
    }
    function wrapResizable(node: any, element: any) {
      const { containerRect, preview, cellWidth, onDragEnd, onDragStart, onEnter, onLeave, list, handleSelect } = props.options
      const width = normalizeSize(element.style.width, 'width', containerRect)
      const height = normalizeSize(element.style.height, 'height', containerRect)

      return h(ResizeDomCore, {
        key: element._uuid,
        width,
        height,
        style: {
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`,
        },
        scale: ['r', 'b'],
        dragOpts: {
          startFn: onDragStart,
          stopFn: onDragEnd,
        },
        onMouseenter: () => onEnter(element._uuid),
        onMouseleave: () => onLeave(),
        onClick: withModifiers(() => handleSelect(element), ['stop']),
        resizeFn: (_evt, { width: w, height: h }) => {
          element.style.width = normalizeSize(w, 'width', containerRect)
          element.style.height = normalizeSize(h, 'height', containerRect)
        },
        stopFn: () => {
          reOffsetAll(list, containerRect, cellWidth, props.options.columnGap)
        },
      }, node)
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
      const offset = Math.max((cellNum - 1), 0) * columnGap
      item.style.width = cellNum * cellWidth + offset
    }
    return {
      renderItem: (element: any) => {
        if (props.options.type === 'swiper') {
          return renderItem(element)
        } else {
          return wrapResizable(() => renderItem(element), element)
        }
      },
    }
  },
  render() {
    return this.renderItem(this.element)
  },
})
</script>
