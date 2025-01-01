<template>
  <div class="gen-method">
    <div
      class="method-item"
      :class="[formData.method === 'code' && 'active']"
      @click="handleSelect('code')"
    >
      <ElIcon :size="100">
        <IconDocument />
      </ElIcon>
      <div>导入代码</div>
    </div>
    <div
      class="method-item"
      :class="[formData.method === 'image' && 'active']"
      @click="handleSelect('image')"
    >
      <ElIcon :size="100">
        <IconPicture />
      </ElIcon>
      <div>导入图片</div>
    </div>
    <div
      class="method-item"
      :class="[formData.method === 'source' && 'active']"
      @click="handleSelect('source')"
    >
      <ElIcon :size="100">
        <IconCollection />
      </ElIcon>
      <div>导入设计稿</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Collection as IconCollection,
  Document as IconDocument,
  Picture as IconPicture,
} from '@element-plus/icons-vue'
import type { PropType } from 'vue'
const formData = defineModel({
  type: Object as PropType<{ method: string, design: any }>,
  default: () => ({ method: '', design: null }),
})

function handleSelect(method: string) {
  formData.value.method = method
  if (method === 'code') {
    formData.value.design = ''
  }
}
</script>

<style lang="scss" scoped>
.gen-method {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.method-item {
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: var(--mpd-color-primary);
  }
  &.active {
    background: var(--mpd-color-primary);
    color: #fff;
  }
}
</style>
