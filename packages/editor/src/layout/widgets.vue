<template>
  <draggable
    v-model="widgetList"
    item-key="type"
    :group="{ name: 'widgets', pull: preview ? false : 'clone', put: false }"
    :clone="onClone"
    style="padding: 0 10px;"
    :sort="false"
  >
    <template #item="{element}">
      <div
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; cursor: move"
        :class="{ disabled: element._disabled }"
      >
        <div
          style="font-weight: bold; padding-left: 20px; border-left: 4px solid #4089ef;"
        >{{element._name}}</div>
        <!-- <el-image :src="element.img" /> -->
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'
import { useApp } from '@/store'
import { computed } from 'vue'
defineProps({
  preview: Boolean,
})
const app = useApp()
const widgetList = computed(() => app.widgetList)

function onClone(origin: Record<string, unknown>) {
  const _data = { ...origin, _uuid: uuidv4() }
  return _data
}
</script>
