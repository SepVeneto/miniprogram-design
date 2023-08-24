<template>
  <div
    class="vv-editor--toolbar"
  >
    <ElSelect
      :model-value="selected.fontSize"
      style="width: 50px;"
      size="small"
      allow-create
      filterable
      default-first-option
      :teleported="false"
      @change="onChange"
    >
      <ElOption
        v-for="item in [{ label: 12, value: 12 }, { label: 14, value: 14 }, { label: 16, value: 16 }]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
    <ActiveNode
      v-model="selected.fontWeight"
      true-label="bold"
      false-label="normal"
    >
      <ElIcon>
        <IconBold />
      </ElIcon>
    </ActiveNode>
    <ActiveNode>
      <ElIcon :color="selected.color">
        <IconColor @click="handleShowColor" />
      </ElIcon>
      <ElColorPicker
        ref="colorRef"
        v-model="selected.color"
        popper-class="vv-editor--toolbar__colorpanel"
      />
    </ActiveNode>
  </div>
</template>

<script lang="ts" setup>
import ActiveNode from '@/components/ActiveNode.vue'
import {
  ElColorPicker,
  ElIcon,
  ElOption,
  ElSelect,
} from 'element-plus'
import { computed, ref, watchEffect } from 'vue'
import IconFont from '@/assets/toolbar/font.vue'
import IconColor from '@/assets/toolbar/color.vue'
import IconBold from '@/assets/toolbar/bold.vue'

const textOptions = [
  {
    type: 'fontSize',
    name: '大小',
    icon: IconFont,
    options: [
      { name: '12px', value: 12 },
      { name: '14px', value: 14 },
      { name: '16px', value: 16 },
      { name: '18px', value: 18 },
      { name: '20px', value: 20 },
    ],
  },
  {
    type: 'fontWeight',
    name: '粗细',
    icon: IconBold,

  },
  { type: 'color', name: '颜色', icon: IconColor },
]
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['add', 'operate'])

const colorRef = ref()
const selected = ref<Partial<{ color: string, fontWeight: string, fontSize: number }>>({})

const type = computed(() => props.modelValue.type)

watchEffect(() => {
  selected.value = props.modelValue.style || {}
})

function onChange(val: string | number) {
  const num = Number(val)
  if (isNaN(num)) return
  console.log(num)
  selected.value.fontSize = num
}
function handleShowColor() {
  console.log(colorRef.value)
  setTimeout(() => {
    colorRef.value.show()
  }, 200)
}
function handleAction(oType: string) {
  if (type.value) {
    emit('operate', oType)
  }
}
</script>

<style lang="scss" scoped>
.vv-editor--toolbar {
  background: var(--el-border-color);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  z-index: 999;
  :deep(.el-color-picker__trigger) {
    display: none;
  }
}
.vv-editor--toolbar__item {
  font-size: 18px;
  cursor: pointer;
}
</style>
