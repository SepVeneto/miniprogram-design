<template>
  <main
    ref="mainRef"
    style="min-height: calc(667px - 60px); position: relative;"
  >
    <draggable
      class="draggable-box"
      v-model="data"
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
          <view-render v-else :type="item._view" :config="item" />
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
import { ref, computed, provide } from 'vue'
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
import viewRender from 'widgets_side/viewRender'
// const menuPreview = defineAsyncComponent(() => import('widgets_side/menu'))

const props = defineProps({
  preview: Boolean,
})

provide('Editor', props)

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
</script>

<style lang="scss" scoped>
.draggable-box {
  padding: 2px;
  height: 400px;
  // .card {
  //   position: relative;
  //   .container {
  //     position: relative;
  //     padding: 10px;
  //     overflow: hidden;
  //     .operate {
  //       display: none;
  //       position: absolute;
  //       cursor: move;
  //       top: 0;
  //       left: 50%;
  //       transform: translateX(-50%);
  //       &::after {
  //         content: '';
  //         display: block;
  //         width: 36px;
  //         height: 28px;
  //         border-radius: 50%;
  //         background: #fff;
  //         position: absolute;
  //         top: -50%;
  //         left: 50%;
  //         transform: translateX(-50%);
  //       }
  //     }
  //   }
  //   &.is-active .operate, &:hover .operate {
  //     display: block;
  //   }
  //   &:hover::before, &.is-active::before {
  //     content: '';
  //     display: block;
  //     width: 100%;
  //     height: 100%;
  //     position: absolute;
  //     border: 1px dashed #4a09ef
  //   }
  // }
}
</style>
