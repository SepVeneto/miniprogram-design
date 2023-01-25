<template>
  <el-button
    @click="show = true"
  >
    打开Dialog
  </el-button>
  <el-dialog v-model="show">
    <div>dialog</div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const show = ref(false);
</script>
