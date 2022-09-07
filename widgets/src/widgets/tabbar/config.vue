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
        <div style="display: flex;">
          <span style="flex-basis: 100px;">激活图标：</span>
          <oss-upload
            v-model="element.activeImage"
            width="25px"
            height="25px"
          />
        </div>
        <div style="display: flex">
          <span style="flex-basis: 100px">未激活图标：</span>
          <oss-upload
            v-model="element.inactiveImage"
            width="25px"
            height="25px"
          />
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

<script setup>
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
const data = ref({})
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
</script>
