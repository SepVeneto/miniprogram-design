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
import { useSortable } from '@vueuse/integrations/useSortable';
import { v4 as uuidv4 } from 'uuid';
import { ref, computed } from 'vue';
import type { Sortable } from 'sortablejs';

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
  // clone: onClone,
  sort: false,
  onStart: (evt: any) => {
    console.log('start', evt);
    const index = evt.item.dataset.index;
    evt.item._underlying_vm_ = JSON.parse(JSON.stringify(list.value[index]));
  },
});

function onClone (to: Sortable, from: Sortable) {
  if (props.preview) return false;
  console.log(to, from);
  // const _data = JSON.parse(JSON.stringify({ ...origin, _uuid: uuidv4() }));
  // return _data;
  return 'clone' as const;
}
</script>
