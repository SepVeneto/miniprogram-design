<template>
  <div>
    <OssUpload
      v-if="formData.method === 'image'"
      v-model="formData.design"
      width="375px"
      height="667px"
      @change="formData.widgets = []"
    />
    <OssUpload
      v-else-if="formData.method === 'source'"
      v-model="formData.design"
      width="375px"
      height="667px"
      @change="formData.widgets = []"
    />
    <Editor
      v-else-if="formData.method === 'code'"
      v-model="formData.design"
      :navigation-bar="false"
      mode="text"
    />
    <pre>{{ formData.design }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, defineAsyncComponent } from 'vue'
import OssUpload from '../ossUpload.vue'

const Editor = defineAsyncComponent(() => import('json-editor-vue'))
const formData = defineModel({
  type: Object as PropType<{ design: string, widgets: any[], method: string }>,
  default: () => ({ design: '', widgets: [] }),
})
</script>
