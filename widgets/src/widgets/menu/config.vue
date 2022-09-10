<template>
  <section>
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
      <el-form-item label="背景颜色">
        <el-color-picker v-model="data.style.backgroundColor" />
      </el-form-item>
    </el-form>

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
            <el-form-item label="可见性">
              <el-checkbox v-model="element.isShow" :true-label="1" :false-label="0" />
            </el-form-item>
          </el-form>
        </draggable-wrapper>
      </template>
    </draggable>
  </section>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import ossUpload from '@/components/ossUpload.vue'
import { PropType, ref, watch } from 'vue'
import { MenuWidgetConfig } from '../type';
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<MenuWidgetConfig>,
    default: () => ({})
  }
})
const data = ref({} as MenuWidgetConfig)
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
</script>
