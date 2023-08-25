<template>
  <div
    class="vv-editor--toolbar__option"
    :class="[isActive && 'vv-editor--toolbar__option--active']"
    @click="handleToggle"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Number],
    default: undefined,
  },
  trueLabel: {
    type: [String, Boolean, Number],
    default: true,
  },
  falseLabel: {
    type: [String, Boolean, Number],
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const isActive = computed(() => props.modelValue === props.trueLabel)
function handleToggle() {
  emit('update:modelValue', isActive.value ? props.falseLabel : props.trueLabel)
}
</script>

<style lang="scss" scoped>
.vv-editor--toolbar__option {
  width: 24px;
  height: 24px;
  border: var(--el-border);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
}
.vv-editor--toolbar__option--active {
  background: var(--el-color-primary);
  color: #fff;
}
</style>
