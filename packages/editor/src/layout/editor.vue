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
      :group="{name: 'widgets', pull: true, put: onPut}"
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
          <view-render v-if="item._view !== 'container'" :type="item._view" :config="item" @update:config="updateConfig" />
          <container-view v-if="item._view === 'container'" :config="item" />
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
import { ref, computed, provide, reactive, toRefs } from 'vue'
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
// @ts-expect-error: from module federation
import viewRender from 'widgets_side/viewRender'

const props = defineProps({
  preview: Boolean,
})
const app = useApp()

provide('Editor', reactive({
  ...toRefs(props),
  globalConfig: computed(() => app.config.globalConfig),
  updateConfig,
}))

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

function onPut(_1: any, _2: any, dom: any) {
  const { _inContainer } = dom.__draggable_context.element
  return !_inContainer || _inContainer === 'outer'
}
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
