<template>
  <ActiveNode>
    <ElUpload
      :limit="1"
      accept="image/*"
      :show-file-list="false"
      :http-request="customRequest"
    >
      <ElIcon>
        <IconUpload />
      </ElIcon>
    </ElUpload>
  </ActiveNode>
  <ActiveNode>
    <ElDropdown
      :teleported="false"
      @command="selected.mode = $event"
    >
      <ElIcon>
        <IconPicture />
      </ElIcon>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="scaleToFill">
            scaleToFill
          </ElDropdownItem>
          <ElDropdownItem command="aspectFit">
            aspectFit
          </ElDropdownItem>
          <ElDropdownItem command="aspectFill">
            aspectFill
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ActiveNode>
</template>

<script lang="ts" setup>
import ActiveNode from '@/components/ActiveNode.vue'
import { Picture as IconPicture, Upload as IconUpload } from '@element-plus/icons-vue'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElUpload,
} from 'element-plus'
import type { UploadRequestOptions } from 'element-plus'
import { ref, watchEffect } from 'vue'

type ToolbarImage = {
  src: string
  mode: 'scaleToFill' | 'aspectFit' | 'aspectFill'
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})
const selected = ref<Partial<ToolbarImage>>({})

watchEffect(() => {
  selected.value = props.modelValue || {}
})

const uploadRequest: any = window.microApp?.getData()?.upload ?? noop
function noop() {
  /* empty */
}
async function customRequest(data: UploadRequestOptions) {
  selected.value.src = 'https://th.bing.com/th/id/OIP.0-UL9rX37JofuquE90BSjgHaGI?w=195&h=180&c=7&r=0&o=5&pid=1.7'
  // const res = await uploadRequest(data)
  // selected.value.src = res
}
</script>
