<template>
  <draggable
    v-model="_config.list"
    item-key="uuid"
    handle=".operate"
    group="widgets"
    :style="viewStyle"
  >
    <template #item="{element}">
      <draggable-wrapper
        v-if="!preview"
        dir="top"
        :class="element._uuid"
        :active="selected._uuid === element._uuid"
        :hide="element.isShow != null && !element.isShow"
        mask
        @click.stop="handleSelect(element)"
      >
        <view-render :type="element._view" :config="element" />
      </draggable-wrapper>
      <view-render v-else :type="element._view" :config="element" />
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import viewRender from 'widgets_side/viewRender'
import { computed, inject } from 'vue'
import { useApp } from '@/store'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const app = useApp()
const selected = computed(() => app.selected)
const emit = defineEmits(['update:modelValue'])
const viewStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.config.grid}, 1fr)`
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
function handleSelect(data: any) {
  console.log('container', data)
  app.selected = data
}
</script>
