<template>
  <div class="design-wrap">
    <img
      style="width: 100%; z-index: 0;"
      :src="formData.design"
      @load="onLoad"
    >
    <FreeScene
      v-if="imgLoad"
      ref="sceneRef"
      class="scene-wrap"
      :style="sceneStyle"
      @batch-select="widgets.create"
      @mouseup="widgets.syncEvent"
    >
      <FreeDom
        v-for="item in formData.widgets"
        :key="item._uuid"
        v-model:x="item.style.x"
        v-model:y="item.style.y"
        v-model:w="item.style.width"
        v-model:h="item.style.height"
        data-type="node"
        @mouseup="zIndex.select(item)"
      >
        <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
          <ElTag>{{ item._name }}</ElTag>
        </div>
      </FreeDom>
    </FreeScene>
  </div>
</template>

<script lang="ts" setup>
import { FreeDom, FreeScene } from '@sepveneto/free-dom'
import type { CSSProperties, PropType } from 'vue'
import { nextTick, ref, toRef } from 'vue'
import { useZIndex } from '@/layout/useZIndex'
import { useWidgets } from './hooks'

const formData = defineModel({
  type: Object as PropType<{ design: string, widgets: any[] }>,
  default: () => ({ widgets: [] }),
})
const sceneStyle = ref<CSSProperties>({})
const sceneRef = ref()

const imgLoad = ref(false)
const zIndex = useZIndex(
  sceneRef,
  toRef(() => formData.value.widgets),
  {
    onDelete: (selected) => {
      const list = formData.value.widgets
      const index = list.findIndex(item => item._uuid === selected._uuid)
      list.splice(index, 1)
    },
  },
)

const widgets = useWidgets(toRef(() => formData.value.widgets))

function onLoad(evt: Event) {
  sceneStyle.value.height = (evt.target as HTMLImageElement).offsetHeight + 'px'
  imgLoad.value = true
  nextTick().then(() => {
    zIndex.init()
  })
}
</script>

<style lang="scss" scoped>
.design-wrap {
  position: relative;
  overflow: auto;
  width: 375px;
  height: 667px;
  border: 1px solid #999;
}
.scene-wrap {
  position: absolute;
  width: 100%;
  // height: 5249px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
