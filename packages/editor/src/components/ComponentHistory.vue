<template>
  <DraggableLayout
    header="历史记录"
    style="min-width: 200px;"
  >
    <ElScrollbar
      :height="400"
      noresize
    >
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="history-record"
        :class="{ active: history.current === index }"
        @click="history.jumpTo(item.id)"
      >
        {{ item.name }}
      </div>
    </ElScrollbar>
  </DraggableLayout>
</template>

<script lang="ts" setup>
import DraggableLayout from './DraggableLayout.vue'
import { useHistory } from '@/store'
import { computed } from 'vue'

const history = useHistory()
const list = computed(() => history.list)
</script>

<style lang="scss" scoped>
.history-record {
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s;
  font-size: 12px;
  &.active {
    color: var(--mpd-color-primary);
    background: var(--mpd-color-primary-light-9);
    &:hover {
      color: #fff;
      background: var(--mpd-color-primary);
    }
  }
  &:hover {
    color: #fff;
    background: var(--mpd-color-primary);
  }
}
</style>
