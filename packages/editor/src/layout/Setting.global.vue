<template>
  <ElCard>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <ElTabs
          v-if="!onlyGlobal"
          v-model="app.schemaType"
        >
          <ElTabPane
            label="页面配置"
            name="page"
          />
          <ElTabPane
            label="全局配置"
            name="global"
          />
        </ElTabs>
        <div v-else>
          全局配置
        </div>
        <div>
          <ElButton
            :disabled="quickDiyDisabled"
            @click="show = true"
          >
            快速生成
          </ElButton>
        </div>
      </div>
    </template>

    <el-scrollbar
      wrap-style="height: 700px;"
      noresize
    >
      <VConfig />
    </el-scrollbar>

    <QuickDiy v-model="show" />
  </ElCard>
</template>

<script lang="ts" setup>
import QuickDiy from '@/components/QuickDiy/index.vue'
import { useApp } from '@/store'
import { computed, ref, watch } from 'vue'
import VConfig from '@/layout/config.vue'

const show = ref(false)
const app = useApp()
const quickDiyDisabled = computed(() => {
  const res = app.schema.globalConfig?.find((item: any) => item.key === 'layoutMode')
  return res?.disabled
})
const onlyGlobal = ref(false)
watch(() => app.routes, val => {
  if (val.length === 1) {
    app.schemaType = 'global'
    onlyGlobal.value = true
  } else {
    app.schemaType = 'page'
    onlyGlobal.value = false
  }
}, { immediate: true })
</script>
