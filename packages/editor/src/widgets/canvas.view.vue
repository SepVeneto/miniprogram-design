<template>
  <free-scene move scale style="position: relative;">
    <draggable
      v-model="_config.list"
      item-key="_uuid"
      handle=".operate"
      :group="{name: 'widgets', pull: true, put: onPut}"
      class="canvas-wrap"
    >
      <template #item="{element}">
        <view-render
          :type="element._view"
          :config="element"
        />
      </template>
    </draggable>
  </free-scene>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
// import Sortable from 'sortablejs'
import { freeScene } from 'free-dom'
import 'free-dom/dist/theme.css'
// @ts-expect-error: from module federation
import viewRender from 'widgets_side/viewRender'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const _config = computed({
  get() {
    return props.config
  },
  set(val) {
    console.log('trigger')
    emit('update:modelValue', val)
  }
})

function onPut(_1: any, _2: any, dom: any) {
  const { _inContainer } = dom.__draggable_context.element
  return _inContainer === 'canvas'
}
</script>

<style scoped lang="scss">
.canvas-wrap {
  position: relative;
  min-height: 50px;
  &::before {
    content: '拖拽至此区域';
    color: #ddd;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
