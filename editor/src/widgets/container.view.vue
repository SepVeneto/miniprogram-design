<template>
  <draggable
    v-model="_config.childrens"
    item-key="uuid"
    handle=".operate"
    group="widgets"
    style="display: grid; grid-template-columns: repeat(2, 1fr);"
  >
    <template #item="{element}">
      <draggable-wrapper
        dir="top"
        :active="selected.uuid === element.uuid"
        :hide="element.isShow != null && !element.isShow"
        mask
        @click="handleSelect(element)"
      >
        <view-render :type="'container-' + element.type" :config="element" />
      </draggable-wrapper>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import viewRender from 'widgets_side/viewRender'
import { computed } from 'vue'
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
const _config = computed({
  get() {
    return props.config
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
function handleSelect(data: any) {
  app.selected = data
}
</script>
