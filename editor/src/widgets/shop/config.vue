<template>
  <div>食堂卡</div>
  <el-form label-width="100px">
    <el-divider content-position="left">样式</el-divider>
    <el-form-item label="顶部外边距">
      <el-input v-model="data.style.marginTop">
        <!-- <template #suffix>px</template> -->
      </el-input>
    </el-form-item>
    <el-form-item label="底部外边距">
      <el-input v-model="data.style.marginBottom" />
    </el-form-item>
    <el-form-item label="边框圆角">
      <el-input v-model="data.style.borderRadius" />
    </el-form-item>

    <el-divider content-position="left">配置</el-divider>
    <el-form-item label="链接地址">
      <el-input v-model="data.url" />
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

<script lang="ts" setup>
import ossUpload from '@/components/ossUpload.vue'
import { PropType, ref, watch } from 'vue'
import { ShopWidgetConfig } from '../type';
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<ShopWidgetConfig>,
    default: () => ({})
  }
})
const data = ref({} as ShopWidgetConfig)
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
</script>