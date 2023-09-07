<template>
  <el-button
    @click="show = true"
  >
    打开Dialog
  </el-button>
  <el-dialog v-model="show">
    <el-input v-model="data.a" />
    <el-button @click="confirm">
      confirm
    </el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: [Object],
    default: () => ({}),
  },
});
const emit = defineEmits(['update:modelValue']);
const data = ref(props.modelValue);
const show = ref(false);

function confirm () {
  show.value = false;
  emit('update:modelValue', data.value);
}
</script>
