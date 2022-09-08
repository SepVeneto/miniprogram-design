<template>
  <main
    ref="mainRef"
    style="min-height: calc(667px - 60px); position: relative;"
  >
    <draggable
      class="draggable-box"
      v-model="data"
      item-key="uuid"
      handle=".operate"
      group="widgets"
    >
      <template #item="{element: item}">
        <draggable-wrapper
          v-if="true"
          dir="top"
          @click="handleSelect(item)"
          :active="selected.uuid === item.uuid"
          :hide="item.isShow != null && !item.isShow"
          mask
        >
          <card-preview v-if="['card', 'explain', 'shop'].includes(item.type)" :config="item" />
          <menu-preview v-else-if="item.type === 'menu'" :config="item" />
          <mine-preview v-else-if="item.type === 'mine'" :config="item" />
          <reserve-preview v-else-if="item.type === 'reserve'" :config="item" />
        </draggable-wrapper>
        <div
          v-else
          :class="['card', {'is-active': selected.uuid === item.uuid }]"
          style="margin-bottom: 20px;"
          @click="handleSelect(item)"
        >
          <div class="container">
            <div class="operate">
              <el-icon style="z-index: 1;"><Rank /></el-icon>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </main>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import { Rank } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { useApp } from '@/store';
import CardPreview from '../widgets/card/preview.vue'
// import cardPreview from 'widgetsSide/card'

// import cardPreview from 'vite-side/Content'
import { minePreview } from '../widgets/mine'
import { menuPreview } from '../widgets/menu'
import { reservePreview } from '../widgets/reserve'
// const cardPreview = defineAsyncComponent('widgets-side/card')

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
