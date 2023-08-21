<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { defineComponent, h, ref, watchEffect, withModifiers } from 'vue'
import type { GridItem } from './hooks'
import { ResizeDomCore } from '@sepveneto/free-dom'

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

    watchEffect(() => {
      width.value = props.w
      height.value = props.h
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
      const { onDragEnd, onDragStart, onEnter, onLeave, handleSelect } = props.options

      return h(ResizeDomCore, {
        key: element._uuid,
        width: width.value,
        height: height.value,
        style: {
          position: 'relative',
          width: `${width.value}px`,
          height: `${height.value}px`,
        },
        scale: ['r', 'b'],
        minHeight: 10,
        dragOpts: {
          startFn: onDragStart,
          stopFn: onDragEnd,
        },
        onMouseenter: () => onEnter(element._uuid),
        onMouseleave: () => onLeave(),
        onClick: withModifiers(() => handleSelect(element), ['stop']),
        resizeFn: (_evt, { width: w, height: h }) => {
          width.value = w
          height.value = h
        },
        stopFn: () => {
          const { cellWidth, columnGap } = props.options
          const cellNum = Math.round(width.value / cellWidth)
          const offset = Math.max((cellNum - 1), 0) * columnGap
          const snapWidth = Math.max(cellNum * cellWidth + offset, cellWidth)
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
