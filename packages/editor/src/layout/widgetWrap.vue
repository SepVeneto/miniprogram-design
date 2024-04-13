<template>
  <el-collapse>
    <el-collapse-item
      v-for="(item, index) in list"
      :key="index"
      :title="item.name"
    >
      <widgets
        :list="item.group"
        :preview="preview"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import widgets from './widgets.vue'
import type { PropType } from 'vue'
defineProps({
  preview: Boolean,
  list: {
    type: Array as PropType<{ name: string, group: Record<string, any>[] }[]>,
    default: () => ([]),
  },
})
</script>
