<template>
  <BcDialog
    v-model="show"
  >
    <ElSteps :active="step">
      <ElStep title="导入设计图" />
      <ElStep title="指定功能组件" />
    </ElSteps>

    <component
      :is="activeComp"
      v-model="formData"
    />

    <template #footer>
      <BcButton @click="show = false">
        取消
      </BcButton>
      <BcButton
        v-if="step > 0"
        @click="step -= 1"
      >
        上一步
      </BcButton>
      <BcButton
        v-if="step < 1"
        @click="step += 1"
      >
        下一步
      </BcButton>
      <BcButton
        v-if="step === 1"
        @click="handleSubmit"
      >
        确认
      </BcButton>
    </template>
  </BcDialog>
</template>

<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import ImgUpload from './ImgUpload.vue'
import FunctionModule from './FunctionModule.vue'
import { useApp } from '@/store'
import { useRoute } from 'vue-router'
import { useConfig } from '@/hooks'

const show = defineModel({ type: Boolean })
const formData = ref({
  widgets: [],
})

const step = ref(0)
const activeComp = computed(() => {
  switch (step.value) {
    case 0:
      return ImgUpload
    case 1:
      return FunctionModule
    default:
      h('div', 'unknown step')
  }
})
const app = useApp()
const route = useRoute()
const config = useConfig()
function handleSubmit() {
  config.value = {
    ...config.value,
    layoutMode: 'free',
  }
  app.config.body[route.name as string] = formData.value.widgets
  show.value = false
}
</script>
