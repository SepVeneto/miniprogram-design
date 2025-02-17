<template>
  <div class="design-wrap">
    <img
      style="width: 375px; z-index: 0;"
      :src="formData.design"
      @load="onLoad"
    >
    <FreeScene
      v-if="imgLoad"
      ref="sceneRef"
      class="scene-wrap"
      :style="sceneStyle"
      manual-diff
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
import { nextTick, ref, shallowRef, toRef } from 'vue'
import { useContextMenu } from '@/layout/useContextMenu'
import { useWidgets } from '../hooks'

type FormData = { design: string, widgets: any[], size: { width: number, height: number } }
const formData = defineModel({
  type: Object as PropType<FormData>,
  default: () => ({ widgets: [] }),
})
const sceneStyle = ref<CSSProperties>({ width: '375px' })
const sceneRef = ref()

const imgLoad = ref(false)
const zIndex = useContextMenu(
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
const size = shallowRef<FormData['size']>()

function onLoad(evt: Event) {
  const img = evt.target as HTMLImageElement
  sceneStyle.value.height = img.offsetHeight + 'px'
  size.value = {
    width: img.offsetWidth,
    height: img.offsetHeight,
  }
  formData.value.size = size.value
  imgLoad.value = true
  nextTick().then(() => {
    zIndex.init(sceneRef)
  })
}
</script>

<style lang="scss" scoped>
.design-wrap {
  position: relative;
  overflow: auto;
  text-align: center;
  height: 667px;
}
.scene-wrap {
  position: absolute;
  width: 100%;
  // height: 5249px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
