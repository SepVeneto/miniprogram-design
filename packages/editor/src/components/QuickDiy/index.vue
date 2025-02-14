<template>
  <BcDialog
    v-model="show"
    title="快速生成"
    @closed="step = 0"
  >
    <ElSteps :active="step">
      <ElStep title="选择生成方式" />
      <ElStep title="导入资源" />
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
        v-if="step < 2"
        @click="step += 1"
      >
        下一步
      </BcButton>
      <BcButton
        v-if="step === 2"
        @click="handleSubmit"
      >
        确认
      </BcButton>
    </template>
  </BcDialog>
</template>

<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import GenMethod from './GenMethod.vue'
import { useApp } from '@/store'
import { useRoute } from 'vue-router'
import { useConfig } from '@/hooks'
import FromPic from './FromPic'
import FromFile from './FromFile'

const show = defineModel({ type: Boolean })
const formData = ref({
  method: '',
  size: {},
  widgets: [],
})

const step = ref(0)
const activeComp = computed(() => {
  switch (step.value) {
    case 0:
      return GenMethod
    case 1:
      switch (formData.value.method) {
        case 'picture':
          return FromPic.loadResource
        case 'design':
          return FromFile.loadResource
        default:
          return null
      }
    case 2:
      switch (formData.value.method) {
        case 'picture':
          return FromPic.normalize
        case 'design':
          return FromFile.normalize
        default:
          return null
      }
    default:
      return h('div', 'unknown step')
  }
})
const app = useApp()
const route = useRoute()
const config = useConfig('page')
function handleSubmit() {
  config.value = {
    ...config.value,
    layoutMode: 'free',
    size: formData.value.size,
  }
  app.config.body[route.name as string] = formData.value.widgets
  show.value = false
}
</script>
