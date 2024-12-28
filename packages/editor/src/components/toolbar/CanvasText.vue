<template>
  <ElSelect
    :model-value="selected.fontSize"
    style="width: 50px;"
    size="small"
    allow-create
    filterable
    default-first-option
    :teleported="false"
    placeholder=""
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
    true-value="bold"
    false-value="normal"
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
</template>

<script lang="ts" setup>
import ActiveNode from '@/components/ActiveNode.vue'
import {
  ElColorPicker,
  ElIcon,
  ElOption,
  ElSelect,
} from 'element-plus'
import { ref, watchEffect } from 'vue'
import IconColor from '@/assets/toolbar/color.vue'
import IconBold from '@/assets/toolbar/bold.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})
const selected = ref<Partial<{ color: string, fontWeight: string, fontSize: number }>>({})
const colorRef = ref()

watchEffect(() => {
  selected.value = props.modelValue.style || {}
})

function onChange(val: string | number) {
  const num = Number(val)
  if (isNaN(num)) return
  selected.value.fontSize = num
}
function handleShowColor() {
  setTimeout(() => {
    colorRef.value.show()
  }, 200)
}
</script>
