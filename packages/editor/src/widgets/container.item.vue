<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import { computed, defineComponent, h, onMounted, ref, withModifiers } from 'vue'
import type { GridItem } from './hooks'
import { normalizeStyle } from '@sepveneto/mpd-hooks'
import { ResizeDomCore } from '@sepveneto/free-dom'
import CanvasView from '@/widgets/canvas.view.vue'
import ContainerView from './container.view.vue'
import { watch } from 'vue'

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
    // from draggable wrapper padding-top
    const displayHeight = computed(() => height.value + 18)

    onMounted(() => {
      // 切换编辑模式时重新更新宽度
      width.value = props.w
    })
    const cellNum = ref(1)
    watch(() => props.options.cellWidth, (cw) => {
      width.value = cw * cellNum.value
    })

    function renderItem(element: GridItem) {
      const { preview, onEnter, onLeave, handleSelect } = props.options
      const base = {
        dir: 'top',
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
      const elementStyle = normalizeStyle(element.style)
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
          style: swiper
            ? { height: '100%' }
            : {
                width: width.value + 'px',
                height: '100%',
              },
        }, getRenderContent(element, preview))
        return node
      }
    }
    function getRenderContent(element: any, isPreview = false) {
      switch (element._view) {
        case 'container':
          return h(ContainerView, { config: element })
        default:
          if (element._custom) {
            return h(CanvasView, { config: element, preview: isPreview })
          }

          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { marginLeft, marginTop, marginRight, marginBottom, ...otherStyle } = normalizeStyle(element.style)

            return props.options.ViewRender
              ? h(props.options.ViewRender, {
                type: element._view,
                config: element,
                style: otherStyle,
              })
              : h('div', props.options.errorLoading ? '加载失败!' : '加载中...')
          }
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
        resizeFn: (_evt, { width: w, height: h }) => {
          width.value = w
          height.value = h
        },
        stopFn: () => {
          const { cellWidth } = props.options
          cellNum.value = Math.round(width.value / cellWidth)
          // const offset = Math.max((cellNum - 1), 0) * columnGap

          // const offsetWidth = parseFloat(String(marginLeft)) + parseFloat(String(marginRight))
          // const offsetHeight = 0
          // parseFloat(String(marginTop)) - parseFloat(String(marginBottom))

          const snapWidth = Math.max(cellNum.value * cellWidth, cellWidth)
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
