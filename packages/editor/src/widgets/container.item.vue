<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { computed, defineComponent, h, withModifiers } from 'vue'
import type { GridItem } from './hooks'
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
    const active = computed(() => {
      console.log('active', props.active)
      return props.active
    })
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
      // console.log('render container item', active.value)
      const { preview, activeUuid, onEnter, onLeave, handleSelect } = props.options
      const base = {
        dir: 'top',
        active: active.value,
        // active: props.options.selected._uuid === element._uuid || props.options.activeUuid === element._uuid,
        hide: element.isShow != null && !element.isShow,
        mask: true,
      }
      const swiper = {
        ...base,
        class: [props.options.type === 'swiper' && 'swiper-slide'],
        onMouseenter: withModifiers(() => onEnter(element._uuid), ['stop']),
        onMouseleave: withModifiers(onLeave, ['stop']),
        onClick: withModifiers(() => handleSelect(element), ['stop']),
      }
      const wrapperProps = props.options.type === 'swiper' ? swiper : { ...base, style: 'width: 100%; height: 100%;' }
      console.log('render item', props.active)
      return !preview
        ? h(DraggableWrapper, wrapperProps, () => getRenderContent(element))
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
      console.log('wrap render')
      const { containerRect, preview, cellWidth, onDragEnd, onDragStart, onEnter, onLeave, list, handleSelect } = options
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
        onMouseenter: withModifiers(() => {
          onEnter(element._uuid)
        }, ['stop']),
        onMouseleave: withModifiers(() => {
          onLeave()
        }, ['stop']),
        onClick: withModifiers(() => handleSelect(element), ['stop']),
        resizeFn: (_evt, { width: w, height: h }) => {
          element.style.width = normalizeSize(w, 'width', containerRect)
          element.style.height = normalizeSize(h, 'height', containerRect)
        },
        stopFn: () => {
          reOffsetAll(list, containerRect, cellWidth, options.columnGap)
        },
      }, node)
    }

    return {
      renderItem,
    }
  },
  render() {
    return this.renderItem(this.element)
  },
})
</script>
