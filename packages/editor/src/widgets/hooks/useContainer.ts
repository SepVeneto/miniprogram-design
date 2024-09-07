import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from 'vue'
import type { Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { toFixed } from '@/utils'

const DEFAULT_WIDTH = 375
const DEFAULT_HEIGHT = 0

export function useContainer(
  containerRef: Ref<any>,
  config: Ref<Record<string, any>>,
  type: 'grid' | 'swiper',
  preview: Ref<boolean>,
) {
  const { style, grid } = toRefs(config.value)

  const containerRect = reactive({
    width: ref(DEFAULT_WIDTH),
    height: ref(DEFAULT_HEIGHT),
  })

  const containerWidth = computed(() => {
    const _width = Math.min(containerRect.width, width.value) || DEFAULT_WIDTH
    // 对于编辑模式，计算的是容器内部的尺寸，所以不需要额外计算padding
    // 对于预览模式，没有套一个container，所以padding是直接应用在容器本身的
    // 需要额外计算padding
    if (preview.value) {
      const { paddingLeft = 0, paddingRight = 0 } = style.value
      return _width - paddingLeft - paddingRight
    }
    return _width
  })
  const cellWidth = computed(() => {
    if (type === 'swiper') return containerRect.width
    const res = toFixed(containerWidth.value / grid.value - (grid.value - 1) * (style.value.columnGap || 0) / 2)
    return res
  })
  const height = ref()
  const width = ref()

  // let observe: ResizeObserver
  const observeFn = useDebounceFn((records) => {
    const record = records[0]
    height.value = record.contentRect.height
    width.value = record.contentRect.width
  })

  watchEffect(() => {
    const { paddingBottom = 0, paddingTop = 0 } = style.value
    const realHeight = height.value + paddingBottom + paddingTop
    containerRect.height = realHeight
    // style.value.height = realHeight
  })

  const observe = new window.ResizeObserver(observeFn)

  watchEffect(() => {
    nextTick().then(() => {
      const el = containerRef.value.targetDomElement
      if (preview.value) {
        observe.unobserve(el)
      } else {
        observe.observe(el)
      }
    })
  })
  watch(style, () => {
    syncSize()
  }, { flush: 'post', deep: true })

  onMounted(() => {
    syncSize()

    // 如果容器没有默认宽度，自动设定为375
    if (!style.value.width) style.value.width = containerRect.width
    // if (!style.value.height) style.value.height = containerRect.height
  })
  onBeforeUnmount(() => {
    observe.disconnect()
  })

  function syncSize() {
    const { width, height } = containerRef.value?.$el.getBoundingClientRect() ?? {}
    const { paddingBottom = 0, paddingTop = 0 } = style.value
    containerRect.width = Number(width.toFixed(2)) || 375
    const calHeight = height + paddingBottom + paddingTop
    containerRect.height = style.value.height === 'auto'
      ? calHeight
      : (style.value.height || calHeight)
  }

  return {
    containerRect,
    cellWidth,
  }
}
