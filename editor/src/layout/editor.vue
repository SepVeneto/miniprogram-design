<template>
  <main
    ref="mainRef"
    style="min-height: calc(667px - 60px); position: relative;"
  >
    <draggable
      class="draggable-box"
      v-model="data"
      :animation="200"
      ghost-class="ghost"
      :component-data="{
        type: 'transition-group',
        name: 'flip-list'
      }"
      item-key="_uuid"
      handle=".operate"
      group="widgets"
    >
      <template #item="{element: item}">
        <draggable-wrapper
          v-if="!preview"
          dir="top"
          :active="selected._uuid === item._uuid"
          :hide="item.isShow != null && !item.isShow"
          :container="item._view === 'container'"
          :mask="item._view !== 'container'"
          @click="handleSelect(item)"
        >
          <container-view v-if="item._view === 'container'" :config="item" />
          <view-render v-else :type="item._view" :config="item" @update:config="updateConfig" />
        </draggable-wrapper>
        <template v-else>
          <container-view v-if="item._view === 'container'" :config="item" />
          <view-render v-else :type="item._view" :config="item" />
        </template>
      </template>
    </draggable>
  </main>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import { Rank } from '@element-plus/icons-vue'
import { ref, computed, provide, reactive, toRefs } from 'vue'
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
import viewRender from 'widgets_side/viewRender'
// const menuPreview = defineAsyncComponent(() => import('widgets_side/menu'))

const props = defineProps({
  preview: Boolean,
})

provide('Editor', reactive({ ...toRefs(props), updateConfig }))

const app = useApp()
const mainRef = ref()

const data = computed({
  get() {
    return app.config.body[app.currentRoute] ?? []
  },
  set(val) {
    app.config.body[app.currentRoute] = val;
  }
})
// const selected = ref({} as any)
const selected = computed(() => app.selected)

function handleSelect(data: any) {
  app.selected = data
}
function updateConfig(data: any) {
  app.selected = data;
  app.updateConfig()
}
</script>

<style lang="scss" scoped>
.draggable-box {
  padding: 2px;
  height: 400px;
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
