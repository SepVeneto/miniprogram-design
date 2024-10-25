<template>
  <VueDraggable
    :model-value="list"
    :group="{ name: 'widgets', pull: 'clone', put: false }"
    :clone="onClone"
    :sort="false"
    item-key="type"
    style="padding: 0 10px;"
    @start="onStart"
    @end="onEnd"
  >
    <template #item="{ element }">
      <div
        :data-view="element._view"
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; cursor: move"
        :class="{ disabled: element._disabled }"
      >
        <div
          style="font-weight: bold; padding-left: 20px; border-left: 4px solid #4089ef;"
        >
          {{ element._name }}
        </div>
        <!-- <el-image :src="element.img" /> -->
      </div>
    </template>
  </VueDraggable>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { computed } from 'vue'
import VueDraggable from 'vuedraggable'
import { useState } from '@/store'

const state = useState()

const props = defineProps({
  preview: Boolean,
  list: {
    type: Array,
    default: () => ([]),
  },
})

const list = computed<any[]>(() => props.list)

function onStart(evt: any) {
  state.dragging = true
  state.currentElem = onClone(evt.item._underlying_vm_)
}
function onEnd() {
  state.dragging = false
  state.currentElem = {}
}
function onClone(original: any) {
  return JSON.parse(JSON.stringify({
    ...original,
    _uuid: uuidv4(),
  }))
}
</script>
