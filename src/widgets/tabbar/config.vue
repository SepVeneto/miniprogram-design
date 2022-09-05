<template>
  <draggable
    v-model="data.list"
    item-key="id"
    handle=".operate-move"
  >
    <template #item="{element }">
      <draggable-wrapper
        dir="right"
        style="background: #f8f8f8"
      >
        <div>
          <span>图标：</span>
          <el-image :src="element.activeImage" />
        </div>
        <div style="display: flex; margin: 10px 0;">
          <span style="white-space: nowrap;">名称：</span>
          <el-input v-model="element.text" />
        </div>
        <div style="display: flex; margin-bottom: 20px;">
          <span style="white-space: nowrap;">描述：</span>
          <el-input v-model="element.subTitle" />
        </div>
      </draggable-wrapper>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import ossUpload from '@/components/ossUpload.vue'
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})
const data = ref({} as any)
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
</script>
