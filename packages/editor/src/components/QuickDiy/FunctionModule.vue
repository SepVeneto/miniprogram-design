<template>
  <div class="design-wrap">
    <img
      style="width: 100%; z-index: 0;"
      :src="formData.design"
      @load="onLoad"
    >
    <FreeScene
      v-if="imgLoad"
      class="scene-wrap"
      :style="sceneStyle"
      @batch-select="onBatchSelect"
      @mouseup="handleUpdateEvt"
    >
      <FreeDom
        v-for="item in formData.widgets"
        :key="item._uuid"
        :height="item.style.height"
        :width="item.style.width"
        :x="item.style.x"
        :y="item.style.y"
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
import { computed, ref, shallowRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import { useApp } from '@/store'

const formData = defineModel({ default: {} })
const app = useApp()
const sceneStyle = ref({})

const currentEvt = shallowRef()
const imgLoad = ref(false)
function onLoad(evt) {
  sceneStyle.value.height = (evt.target as HTMLImageElement).offsetHeight + 'px'
  imgLoad.value = true
}
function handleUpdateEvt(evt: MouseEvent) {
  currentEvt.value = evt
}

const menus = computed(() => {
  const list = []
  app.widgetList.forEach(item => {
    list.push({
      label: item.name,
      children: item.group.map(each => ({
        label: each._name,
        onClick: () => {
          createWidget(each)
        },
      })),
    })
  })
  return list
})
let batchPos
function createWidget(widget) {
  const { lastX, lastY, startX, startY } = batchPos
  console.log(lastX - startX)
  formData.value.widgets.push({
    _uuid: uuidv4(),
    ...widget,
    style: {
      ...(widget.style || {}),
      x: startX,
      y: startY,
      width: Math.abs(startX - lastX),
      height: Math.abs(startY - lastY),
    },
  })
}
function showMenu(x: number, y: number, addtionalData) {
  console.log(app.widgetList)
  ContextMenu.showContextMenu({
    zIndex: 2024,
    x,
    y,
    items: menus.value,
  })
}

function onBatchSelect(pos) {
  batchPos = pos
  showMenu(
    currentEvt.value.x,
    currentEvt.value.y,
    pos,
  )
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
