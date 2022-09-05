<template>
  <draggable
    v-model="data.childrens"
    item-key="id"
    handle=".operate-move"
  >
    <template #item="{element}">
      <draggable-wrapper
        dir="right"
        style="background: #f8f8f8"
      >
        <el-form>
          <el-form-item label="图标">
            <oss-upload v-model="element.defaultImg" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="element.title" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="element.desc" />
          </el-form-item>
          <el-form-item label="宽度">
            <el-input v-model="element.width" />
          </el-form-item>
          <el-form-item label="高度">
            <el-input v-model="element.height" />
          </el-form-item>
        </el-form>
      </draggable-wrapper>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper'
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
