<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { computed, defineComponent, h, onMounted, ref, watch, withModifiers } from 'vue'
import type { GridItem } from './hooks'
import { normalizeStyle } from '@sepveneto/mpd-hooks'
import { ResizeDomCore } from '@sepveneto/free-dom'
import CanvasView from '@/widgets/canvas.view.vue'
import ContainerView from './container.view.vue'
import { WIDGET_TOP_BAR_HEIGHT } from '@/constants'
import { useState } from '@/store'
import { loadFromRemote } from '@/utils'

export default defineComponent({
  props: {
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
  emits: ['update:unit', 'update:h', 'update:w'],
  setup(props, { emit }) {
    const state = useState()
    const height = ref(props.h)
    const preview = computed(() => props.options.preview)
    // from draggable wrapper padding-top
    // 为了保证编辑模式里高度能按照设定的正常显示，这里高度额外加上了操作栏的高度 18px
    // 容器内元素因为外面包裹了ResizeCore，所以高度不能直接设置在内部的DraggableWrapper
    const displayHeight = computed(() => {
      let offset
      if (preview.value) {
        offset = 0
      } else if (props.active) {
        offset = WIDGET_TOP_BAR_HEIGHT
      } else {
        offset = 0
      }
      return height.value + offset
    })

    const cellNum = ref(1)
    watch(() => props.options._unit, (val) => {
      cellNum.value = val || 1
    })
    const cellWidth = computed(() => props.options.cellWidth)
    const width = ref(cellNum.value * cellWidth.value)

    onMounted(() => {
      // 切换编辑模式时重新更新宽度
      width.value = cellNum.value * cellWidth.value
    })

    watch([cellWidth, cellNum], ([cw, cn]) => {
      width.value = cw * cn
    })
    watch(() => props.h, (h) => {
      height.value = h
    })

    function renderItem(element: GridItem) {
      const { onEnter, onLeave, handleSelect } = props.options
      const base = {
        dir: 'top',
        name: element._name,
        active: props.active,
        hide: element.isShow != null && !element.isShow,
        mask: true,
        container: props.element._view === 'container',
      }
      const swiper = {
        ...base,
        class: [props.options.type === 'swiper' && 'swiper-slide'],
        onMouseenter: () => onEnter(element._uuid),
        onMouseleave: onLeave,
        onClick: withModifiers(() => handleSelect(element), ['stop']),
      }
      const wrapperProps = props.options.type === 'swiper'
        ? swiper
        : {
            ...base,
            style: {
              width: '100%',
              height: '100%',
            },
          }
      if (!preview.value) {
        const node = h(DraggableWrapper, {
          ...wrapperProps,
          active: props.active,
        }, () => getRenderContent(element, preview.value))
        return node
      } else {
        const node = h('div', {
          class: [props.options.type === 'swiper' && 'swiper-slide'],
          style: swiper
            ? { height: '100%' }
            : {
                width: width.value + 'px',
                height: '100%',
              },
        }, getRenderContent(element, preview.value))
        return node
      }
    }

    const ViewRender = loadFromRemote('widgets', 'viewRender')
    function getRenderContent(element: any, isPreview = false) {
      switch (element._view) {
        case 'container':
          return h(ContainerView, { config: element })
        default:
          if (element._custom) {
            return h(CanvasView, { config: element, preview: isPreview })
          }

          // {
          //   const { marginLeft, marginTop, marginRight, marginBottom, ...otherStyle } = normalizeStyle(element.style)

          // }
          return h(ViewRender, {
            type: element._view,
            config: element,
            // style: otherStyle,
          })
      }
    }
    function wrapResizable(node: any, element: any) {
      const { onDragEnd, onDragStart, onEnter, onLeave, handleSelect } = props.options
      const elementStyle = normalizeStyle(element.style)
      return h(ResizeDomCore, {
        key: element._uuid,
        width: width.value,
        height: height.value,
        style: {
          ...elementStyle,
          position: 'relative',
          width: `${width.value}px`,
          height: `${displayHeight.value}px`,
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
        startFn: () => {
          state.dragging = true
        },
        resizeFn: (_evt: MouseEvent, { width: w, height: h }: any) => {
          width.value = w
          height.value = h
        },
        stopFn: () => {
          state.dragging = false
          const { cellWidth } = props.options
          cellNum.value = Math.max(Math.min(Math.round(width.value / cellWidth), props.options.grid), 1)

          const snapWidth = Math.max(cellNum.value * cellWidth, cellWidth)
          const snapHeight = Math.max(height.value, 10)
          width.value = snapWidth
          height.value = snapHeight
          emit('update:unit', cellNum.value)
          emit('update:w', width.value)
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
