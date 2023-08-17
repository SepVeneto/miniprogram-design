import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import type { Ref } from 'vue'

const DEFAULT_WIDTH = 375
const DEFAULT_HEIGHT = 0

export function useContainer(
  containerRef: Ref<any>,
  config: Ref<Record<string, any>>,
  type: 'grid' | 'swiper',
) {
  const { style, grid } = toRefs(config.value)
  const containerRect = reactive({
    width: ref(DEFAULT_WIDTH),
    height: ref(DEFAULT_HEIGHT),
  })

  const containerWidth = computed(() => {
    if (!containerRect.width) return 0
    // 计算的是容器内部的尺寸，所以不需要额外计算padding
    return containerRect.width
  })
  const cellWidth = computed(() => {
    const { columnGap = 0 } = style.value
    if (type === 'swiper') return containerRect.width
    const width = containerWidth.value - columnGap * (grid.value - 1)
    return width / grid.value
  })

  watch(style, () => {
    syncSize()
  }, { flush: 'post', deep: true })

  onMounted(() => {
    syncSize()

    // 如果容器没有默认宽度，自动设定为375
    if (!style.value.width) style.value.width = 375
  })

  function syncSize() {
    const { width, height } = containerRef.value?.$el?.getBoundingClientRect() ?? {}
    containerRect.width = width ?? 375
    containerRect.height = height ?? 0
  }

  return {
    containerRect,
    cellWidth,
  }
}
