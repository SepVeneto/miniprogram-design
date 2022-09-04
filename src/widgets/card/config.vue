<template>
  <div class="celltitle">是否显示</div>
  <div style="padding: 10px">
    <div>{{ data.isShow }}</div>
    <el-radio-group v-model="data.isShow">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
  </div>
  <div class="celltitle">食堂卡背景图片</div>
  <div style="padding: 10px">
    <el-upload />
  </div>
</template>

<script lang="ts" setup>
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