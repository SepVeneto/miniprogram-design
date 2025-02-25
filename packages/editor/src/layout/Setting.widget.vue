<template>
  <ElCard>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <BcInput
          v-model="selected._desc"
          style="margin-right: 20px;"
          placeholder=""
        >
          <template #suffix>
            {{ selected._name }}
          </template>
        </BcInput>

        <div style="flex-shrink: 0;">
          <el-switch
            v-if="!['container', 'swiper'].includes(selected._view)"
            v-model="selected._custom"
            :disabled="selected._custom === false"
            style="--mpd-switch-on-color: var(--mpd-color-success); --mpd-switch-off-color: var(--mpd-color-primary)"
            inactive-text="固定模板"
            active-text="自定义"
            inline-prompt
            @change="handleModeChange"
          />
          <el-button
            type="primary"
            text
            :disabled="isPreview || !selected._schema"
            @click="handleDelete"
          >
            删除
          </el-button>
        </div>
      </div>
    </template>

    <el-scrollbar
      wrap-style="height: 700px;"
      noresize
    >
      <VConfig />
    </el-scrollbar>
  </ElCard>
</template>

<script setup lang="ts">
import { useApp, useHistory } from '@/store'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Mode } from './EditorOperate.vue'
import { useRoute } from 'vue-router'
import VConfig from '@/layout/config.vue'

const props = defineProps({
  mode: {
    type: String as PropType<Mode>,
    default: 'edit',
  },
})

const app = useApp()
const selected = computed(() => app.selected)

const isPreview = computed(() => props.mode === 'preview')

function handleModeChange(isCustom: any) {
  if (!isCustom) return

  if ('template' in selected.value) {
    if (typeof selected.value.template !== 'object') {
      console.warn('[@sepveneto/mpd-editor] template is a reserved field!')
    }
  } else {
    app.selected.template = { list: [] }
  }
}

const route = useRoute()
const history = useHistory()
function handleDelete() {
  const currentConfig = app.config.body[route.name!]
  const index = currentConfig.findIndex(item => item._uuid === selected.value._uuid)
  // 删被嵌套的组件
  if (index === -1) {
    const list = currentConfig.find((item: any) => item.list && item.list.length > 0)?.list ?? null
    if (list) {
      const tIndex = list.findIndex((item: any) => item._uuid === selected.value._uuid)
      history.create(`删除-${selected.value._name}`)
      list.splice(tIndex, 1)
    }
    app.selected = {}
    return
  }
  currentConfig.splice(index, 1)
  history.create(`删除-${selected.value._name}`)
  app.selected = {}
}
</script>
