<template>
  <DraggableLayout header="组件树">
    <ElTree
      :allow-drop="allowDrop"
      :data="data"
      :props="{
        label: '_name',
        children: 'list',
      }"
      draggable
      node-key="_uuid"
      default-expand-all
      @node-click="handleNodeClick"
    >
      <template #empty>
        空
      </template>
    </ElTree>
  </DraggableLayout>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type { AllowDropType } from 'element-plus/es/components/tree/src/tree.type'
import { useApp } from '@/store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DraggableLayout from './DraggableLayout.vue'

const route = useRoute()
const app = useApp()
const data = computed(() => {
  if (!route.name) return []
  return app.config.body[route.name]
})

const allowDrop = (draggingNode: any, dropNode: any, type: AllowDropType) => {
  const { _inContainer } = draggingNode.data
  const allowContainer = !_inContainer || _inContainer === 'inner'
  const allowOuter = !_inContainer || _inContainer === 'outer'
  const isContainer = ['swiper', 'container'].includes(dropNode.data._view)
  const targetIsContainer = ['swiper', 'container'].includes(draggingNode.data._view)

  if (targetIsContainer && isContainer) return false
  if (dropNode.level === 1) {
    if (type === 'inner' && allowContainer && isContainer) {
      return true
    }
    if (type !== 'inner' && allowOuter) {
      return true
    }
  } else if (dropNode.level === 2) {
    if (type !== 'inner' && allowContainer) {
      return true
    }
  }
  return false
}
function handleNodeClick(data: any) {
  app.selected = data
  console.log(data)
}
</script>
