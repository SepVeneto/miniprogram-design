<template>
  <div>食堂卡</div>
  <el-form label-width="100px">
    <el-form-item label="解绑">
      <el-checkbox v-model="data.unbound" :true-label="1" :false-label="0" />
    </el-form-item>
    <el-form-item label="充值">
      <el-checkbox v-model="data.recharge" :true-label="1" :false-label="0" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { PropType, ref, watch } from 'vue'
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
