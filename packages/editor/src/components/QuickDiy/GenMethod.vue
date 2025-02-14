<template>
  <div style="display: flex; justify-content: space-around;">
    <div
      v-for="item in methods"
      :key="item.prop"
      class="gen-method--item"
      :class="formData.method === item.prop && 'active'"
      @click="formData.method = item.prop"
    >
      <ElIcon :size="128">
        <component :is="item.icon" />
      </ElIcon>
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Collection as IconCollection,
  // Document as IconDocument,
  Picture as IconPicture,
} from '@element-plus/icons-vue'

const formData = defineModel({ type: Object })

const methods = [
  { label: '从图片', prop: 'picture', icon: IconPicture },
  // { label: '从文档', prop: 'json', icon: IconDocument },
  { label: '从设计稿', prop: 'design', icon: IconCollection },
]
</script>

<style scoped lang="scss">
.gen-method--item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  &:hover {
    color: var(--mpd-color-primary-light-5);
  }
  &.active {
    color: var(--mpd-color-primary);
  }
}
</style>
