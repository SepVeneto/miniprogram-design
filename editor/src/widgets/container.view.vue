<template>
  <draggable v-model="_config.childrens">
    <template #item="{element}">
      <draggable-wrapper>
        <div>{{element}}</div>
      </draggable-wrapper>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import { computed } from 'vue'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:modelValue'])
const _config = computed({
  get() {
    return props.config
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
console.log(props.config)
</script>
