<template>
  <el-form label-width="100px">
    <el-divider content-position="left">样式</el-divider>
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
    
    <el-divider content-position="left">配置</el-divider>
    <el-form-item label="可见性">
      <el-checkbox v-model="data.isShow" :true-label="1" :false-label="0" />
    </el-form-item>
    <el-form-item label="解绑">
      <el-checkbox v-model="data.unbound" :true-label="1" :false-label="0" />
    </el-form-item>
    <el-form-item label="充值">
      <el-checkbox v-model="data.recharge" :true-label="1" :false-label="0" />
    </el-form-item>
    <el-form-item label="背景图片">
      <oss-upload
        v-model="data.defaultImg"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import ossUpload from '@/components/ossUpload.vue'
import { PropType, ref, watch } from 'vue'
import type { CardWidgetConfig } from '../type'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<CardWidgetConfig>,
    default: () => ({})
  }
})
const data = ref({} as CardWidgetConfig)
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
</script>
