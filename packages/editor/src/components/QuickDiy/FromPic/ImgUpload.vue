<template>
  <div style="display: flex; justify-content: center;">
    <OssUpload
      v-model="formData.design"
      width="375px"
      height="667px"
      accept="image/*"
      @change="formData.widgets = []"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import OssUpload from '@/components/ossUpload.vue'
const formData = defineModel({
  type: Object as PropType<{ design: string, widgets: any[] }>,
  default: () => ({ design: '', widgets: [] }),
})
</script>
