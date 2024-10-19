<template>
  <div>
    <OssUpload
      v-model="formData.design"
      width="375px"
      height="667px"
    />
  </div>
</template>

<script lang="ts" setup>
import OssUpload from '../ossUpload.vue';
const formData = defineModel({ default: {}})
</script>
