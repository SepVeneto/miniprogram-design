<template>
  <div class="vv-editor--toolbar">
    <ElSelect
      v-model="selected.fontSize"
      style="width: 80px;"
    >
      <ElOption
        v-for="item in [12, 14, 16]"
        :key="item"
        :label="item"
        :value="item"
      />
    </ElSelect>
    <!-- <div
      v-for="(node, index) in nodeList"
      :key="index"
      class="vv-editor--toolbar__item"
      @click="handleAction(node.type)"
    >
      <component :is="node.icon" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ElOption, ElSelect } from 'element-plus'
import { computed } from 'vue'
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
  selected: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['add', 'operate'])
const type = computed(() => props.selected.type)
const nodeList = computed(() => {
  return textOptions
})

function handleAction(oType: string) {
  if (type.value) {
    emit('operate', oType)
  }
}
</script>

<style lang="scss" scoped>
.vv-editor--toolbar {
  display: flex;
}
.vv-editor--toolbar__item {
  font-size: 18px;
  cursor: pointer;
}
</style>
