<template>
  <div>
    <component
      :is="ConfigRender"
      v-if="schema.custom"
      v-model="data"
      type="tabbar"
    />
    <VueDraggable
      v-else
      v-model="data.list"
      item-key="_uuid"
      handle=".operate-move"
      style="margin-top: 10px;"
      :component-data="{
        type: 'transition-group',
        name: 'flip-list',
      }"
      :animation="200"
    >
      <template #item="{ element }">
        <draggable-wrapper
          dir="right"
          style="background: #f8f8f8"
          @delete="onDelete(element)"
        >
          <div style="display: flex;">
            <span style="flex-basis: 100px;">激活图标：</span>
            <oss-upload
              v-model="element.activeImage"
              width="25px"
              height="25px"
            />
          </div>
          <div style="display: flex">
            <span style="flex-basis: 100px">未激活图标：</span>
            <oss-upload
              v-model="element.inactiveImage"
              width="25px"
              height="25px"
            />
          </div>
          <div style="display: flex; margin: 10px 0; align-items: center;">
            <span style="white-space: nowrap;">可见性：</span>
            <el-radio-group v-model="element.isShow">
              <el-radio :value="1">
                显示
              </el-radio>
              <el-radio :value="0">
                隐藏
              </el-radio>
            </el-radio-group>
          </div>
          <div style="display: flex; margin: 10px 0;">
            <span style="white-space: nowrap;">名称：</span>
            <el-input v-model="element.text" />
          </div>
          <div style="display: flex; margin-bottom: 20px;">
            <span style="white-space: nowrap;">描述：</span>
            <el-input v-model="element.subTitle" />
          </div>
        </draggable-wrapper>
      </template>
    </VueDraggable>
  </div>
</template>

<script lang="ts" setup>
import VueDraggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import ossUpload from '@/components/ossUpload.vue'
import type { PropType } from 'vue'
import type { TabbarWidgetConfig } from './type'
import { useApp } from '@/store'
import { useFederatedComponent } from '@sepveneto/mpd-hooks'

const data = defineModel('modelValue', {
  type: Object as PropType<TabbarWidgetConfig>,
  default: () => ({ list: [] }),
})

defineProps({
  schema: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})

function onDelete(node: any) {
  const index = data.value.list.findIndex(item => item._uuid === node._uuid)
  if (index === -1) return

  data.value.list.splice(index, 1)
}

const app = useApp()
const { Component: ConfigRender } = useFederatedComponent(
  app.remoteUrl,
  'widgets',
  './configRender',
)
</script>

<style scoped lang="scss">
.operate-add {
  border: 1px dashed #999;
  text-align: center;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
  transition: border-radius 0.3s;
  &:hover {
    border-radius: 20px;
  }
}
</style>
