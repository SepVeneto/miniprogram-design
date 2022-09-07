<template>
  <div>食堂卡</div>
  <el-form label-width="100px">
    <el-form-item label="顶部外边距">
      <el-input v-model.number="data.style.marginTop" type="number">
        <template #suffix>px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="底部外边距">
      <el-input v-model.number="data.style.marginBottom" type="number">
        <template #suffix>px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="边框圆角">
      <el-input v-model.number="data.style.borderRadius" type="number">
        <template #suffix>px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model.number="data.style.width" type="number">
        <template #suffix>px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input v-model.number="data.style.height" type="number">
        <template #suffix>px</template>
      </el-input>
    </el-form-item>
    <el-form-item label="可见性">
      <el-checkbox v-model="data.isShow" :true-label="1" :false-label="0" />
    </el-form-item>
    <el-form-item label="背景图片">
      <oss-upload
        v-model="data.defaultImg"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
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