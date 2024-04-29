<template>
  <FreeDom
    handle=".mpd-card__header"
    disabled-resize
    class="draggable-layout"
    style="min-width: 100px; width: auto !important; height: auto !important;"
  >
    <ElCard>
      <template #header>
        {{ header }}
      </template>
      <slot />
    </ElCard>
  </FreeDom>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus'
import { FreeDom } from '@sepveneto/free-dom'

defineProps({
  header: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.draggable-layout {
  cursor: auto;
  &:deep(.mpd-card__header) {
    cursor: move;
  }
}
</style>
