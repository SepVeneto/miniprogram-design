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
</template>

<script lang="ts" setup>
import ActiveNode from '@/components/ActiveNode.vue'
import { Upload as IconUpload } from '@element-plus/icons-vue'
import {
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
  const res = await uploadRequest(data)
  selected.value.src = res
}
</script>
