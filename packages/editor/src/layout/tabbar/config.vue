<template>
  <section>
    <VueDraggable
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
              <el-radio :label="1">
                显示
              </el-radio>
              <el-radio :label="0">
                隐藏
              </el-radio>
            </el-radio-group>
          </div>
          <div style="display: flex; margin: 10px 0;">
            <span style="white-space: nowrap;">名称：</span>
            <el-input
              v-model="element.text"
            />
          </div>
          <div style="display: flex; margin-bottom: 20px;">
            <span style="white-space: nowrap;">描述：</span>
            <el-input
              v-model="element.subTitle"
            />
          </div>
        </draggable-wrapper>
      </template>
    </VueDraggable>

    <!-- <div
      class="operate-add"
      @click="handleAdd"
    >
      <ElIcon :size="36">
        <IconPlus />
      </ElIcon>
    </div> -->
  </section>
</template>

<script lang="ts" setup>
// import { Plus as IconPlus } from '@element-plus/icons-vue'
import VueDraggable from 'vuedraggable'
import draggableWrapper from '@/components/draggableWrapper.vue'
import ossUpload from '@/components/ossUpload.vue'
import type { PropType } from 'vue'
import {
  // computed,
  ref,
  watch,
} from 'vue'
import type { TabbarWidgetConfig } from './type'
// import { v4 as uuidv4 } from 'uuid'
// import { useApp } from '@/store'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<TabbarWidgetConfig>,
    default: () => ({}),
  },
})
// const store = useApp()

const data = ref({} as TabbarWidgetConfig)

watch(() => props.modelValue, (val) => {
  data.value = val
}, { deep: true, immediate: true })
watch(data, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })
// const tabbarOptions = computed(() => {
//   const list = store.config.tabbars.list
//   return list.map(item => ({ label: item.text, value: item.type }))
// })

function onDelete(node: any) {
  const index = data.value.list.findIndex(item => item._uuid === node._uuid)
  if (index === -1) return

  data.value.list.splice(index, 1)
}
// function handleAdd() {
//   const defaultItem = tabbarOptions.value[0]
//   data.value.list.push({
//     _uuid: uuidv4(),
//     type: defaultItem.value,
//     text: defaultItem.label,
//   })
// }
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
