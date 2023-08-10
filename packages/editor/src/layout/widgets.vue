<template>
  <section
    ref="widgetsRef"
    style="padding: 0 10px;"
  >
    <div
      v-for="(element, index) in list"
      :key="index"
      style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; cursor: move"
      :class="{ disabled: element._disabled }"
      :data-index="index"
      :data-container="element._inContainer"
    >
      <div
        style="font-weight: bold; padding-left: 20px; border-left: 4px solid #4089ef;"
      >
        {{ element._name }}{{ element }}
      </div>
      <!-- <el-image :src="element.img" /> -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, computed } from 'vue';
import { useSortable } from './useSortable';

const props = defineProps({
  preview: Boolean,
  list: {
    type: Array,
    default: () => ([]),
  },
});

const widgetsRef = ref();
const list = computed<any[]>(() => props.list);

useSortable(widgetsRef, list, {
  group: { name: 'widgets', pull: onClone, put: false },
  sort: false,
  handle: undefined,
  clone: (original) => JSON.parse(JSON.stringify({
    ...original,
    _uuid: uuidv4(),
  })),
});

function onClone () {
  if (props.preview) return false;
  return 'clone' as const;
}
</script>
