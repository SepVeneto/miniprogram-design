<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { defineComponent, h, ref, toRef, watchEffect, withModifiers } from 'vue'
import type { GridItem } from './hooks'
import { normalizeStyle } from '@sepveneto/mpd-hooks'
import { ResizeDomCore } from '@sepveneto/free-dom'
import CanvasView from '@/widgets/canvas.view.vue'

export default defineComponent({
  props: {
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      default: 50,
    },
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
  emits: ['update:w', 'update:h'],
  setup(props, { emit }) {
    const width = ref(props.w)
    const height = ref(props.h)

    const marginLeft = toRef(props.element.style, 'marginLeft')
    const marginRight = toRef(props.element.style, 'marginRight')
    const marginTop = toRef(props.element.style, 'marginTop')
    const marginBottom = toRef(props.element.style, 'marginBottom')
    watchEffect(() => {
      const ml = marginLeft.value || 0
      const mr = marginRight.value || 0
      const mt = marginTop.value || 0
      const mb = marginBottom.value || 0
      width.value = props.w - mr - ml
      height.value = props.h - mt - mb
    })

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
      const elementStyle = normalizeStyle(
        element.style,
        ['marginLeft', 'marginTop', 'marginRight', 'marginBottom'],
      )
      const wrapperProps = props.options.type === 'swiper'
        ? swiper
        : {
            ...base,
            style: {
              ...elementStyle,
              width: '100%',
              height: '100%',
            },
          }
      if (!preview) {
        const node = h(DraggableWrapper, {
          ...wrapperProps,
          active: props.active,
        }, () => getRenderContent(element, preview))
        return node
      } else {
        const node = h('div', {
          class: [props.options.type === 'swiper' && 'swiper-slide'],
          style: { height: '100%' },
        }, getRenderContent(element, preview))
        return node
      }
    }
    function getRenderContent(element: any, isPreview = false) {
      switch (element._view) {
        case 'container':
          return undefined
        default:
          if (element._custom) {
            return h(CanvasView, { config: element, preview: isPreview })
          }
          return props.options.ViewRender
            ? h(props.options.ViewRender, {
              type: element._view,
              config: element,
            })
            : h('div', props.options.errorLoading ? '加载失败!' : '加载中...')
      }
    }
    function wrapResizable(node: any, element: any) {
      const { onDragEnd, onDragStart, onEnter, onLeave, handleSelect } = props.options
      const { marginLeft, marginTop, marginRight, marginBottom } = normalizeStyle(element.style)
      return h(ResizeDomCore, {
        key: element._uuid,
        width: width.value,
        height: height.value,
        style: {
          marginLeft,
          marginTop,
          marginRight,
          marginBottom,
          position: 'relative',
          width: `${width.value}px`,
          height: `${height.value}px`,
        },
        scale: ['rb'],
        minHeight: 10,
        dragOpts: {
          startFn: onDragStart,
          stopFn: onDragEnd,
          disabled: props.options.preview,
        },
        onMouseenter: () => onEnter(element._uuid),
        onMouseleave: () => onLeave(),
        onClick: withModifiers(() => handleSelect(element), ['stop']),
        resizeFn: (_evt, { width: w, height: h }) => {
          width.value = w
          height.value = h
        },
        stopFn: () => {
          const { cellWidth } = props.options
          const cellNum = Math.round(width.value / cellWidth)
          // const offset = Math.max((cellNum - 1), 0) * columnGap
          const snapWidth = Math.max(cellNum * cellWidth, cellWidth)
          const snapHeight = Math.max(height.value, 10)
          width.value = snapWidth
          height.value = snapHeight
          emit('update:w', snapWidth)
          emit('update:h', snapHeight)
        },
      }, node)
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
