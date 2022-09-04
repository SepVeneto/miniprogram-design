<template>
  <draggable
    v-model="widgetList"
    item-key="type"
    :group="{ name: 'widgets', pull: 'clone', put: false }"
    :clone="onClone"
    style="padding: 0 10px;"
    :sort="false"
  >
    <template #item="{element}">
      <div
        style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; cursor: move"
      >
        <div
          style="font-weight: bold; padding-left: 20px; border-left: 4px solid #4089ef;"
        >{{element.name}}</div>
        <!-- <el-image :src="element.img" /> -->
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { v4 as uuidv4 } from 'uuid'
const widgetList = [
  { type: 'card', name: '食堂卡' }
]

function onClone(origin: Record<string, unknown>) {
  const _data = { ...origin, uuid: uuidv4() }
  return _data
}
</script>
