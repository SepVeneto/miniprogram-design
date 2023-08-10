<template>
  <section>
    <div>
      <el-checkbox v-model="data.hidden">
        隐藏
      </el-checkbox>
    </div>
    <div
      ref="draggableRef"
      handle=".operate-move"
    >
      <draggable-wrapper
        v-for="element in data.list"
        :key="element.id"
        dir="right"
        style="background: #f8f8f8"
        disabled
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
    </div>
  </section>
</template>

<script lang="ts" setup>
import draggableWrapper from '@/components/draggableWrapper.vue';
import ossUpload from '@/components/ossUpload.vue';
import { ref, watch, PropType } from 'vue';
import { TabbarWidgetConfig } from './type';
import { useSortable } from '@/layout/useSortable';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object as PropType<TabbarWidgetConfig>,
    default: () => ({}),
  },
});

const draggableRef = ref<HTMLElement>();
const data = ref({} as TabbarWidgetConfig);
useSortable(draggableRef, data.value.list, {
  handle: '.operate-move',
});
watch(() => props.modelValue, (val) => {
  data.value = val;
}, { deep: true, immediate: true });
watch(data, (val) => {
  emit('update:modelValue', val);
}, { deep: true, immediate: true });
</script>
