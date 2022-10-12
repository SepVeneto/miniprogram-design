<template>
  <draggable
    v-model="_config.list"
    item-key="_uuid"
    handle=".operate"
    :animation="200"
    ghost-class="ghost"
    :component-data="{
      type: 'transition-group',
      name: 'flip-list'
    }"
    :group="{name: 'widgets', pull: true, put: onPut}"
    :class="['draggable-group', { 'is-preview': preview }]"
    :style="viewStyle"
  >
    <template #item="{element}">
      <draggable-wrapper
        v-if="!preview"
        dir="top"
        :active="selected._uuid === element._uuid"
        :hide="element.isShow != null && !element.isShow"
        mask
        @click.stop="handleSelect(element)"
      >
        <canvas-view v-if="element._view === 'canvas'" :config="element" />
        <view-render v-if="element._view !== 'container' && element._view !== 'canvas'" :type="element._view" :config="element" />
      </draggable-wrapper>
      <view-render v-else :type="element._view" :config="element" />
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import 'free-dom/dist/theme.css'
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import canvasView from './canvas.view.vue'
// @ts-expect-error: from module federation
import viewRender from 'widgets_side/viewRender'
import { computed, inject } from 'vue'
import { useApp } from '@/store'
import { useNormalizeStyle } from '@/hooks'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const app = useApp()
const selected = computed(() => app.selected)
const emit = defineEmits(['update:modelValue'])
const style = useNormalizeStyle(props.config.style)
const viewStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.config.grid}, 1fr)`,
  ...style.value
}))
const _config = computed({
  get() {
    return props.config
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const editorContext = inject('Editor', { preview: false })
const preview = computed(() => {
  return editorContext.preview
})
function onPut(_1: any, _2: any, dom: any) {
  const { _inContainer } = dom.__draggable_context.element
  return !_inContainer || _inContainer === 'inner'
}
function handleSelect(data: any) {
  app.selected = data
  app.updateConfig()
}
</script>

<style scoped lang="scss">
.draggable-group {
  width: 100%;
  min-height: 50px;
  position: relative;
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
  &.is-preview::before {
    display: none;
  }
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>


