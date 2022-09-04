<template>
  <card-config v-if="selected.type === 'card'" v-model="selected" />
  <section v-else>
    <el-form>
      <el-form-item label="页面标题">
        <el-input v-model="globalConfig.title" />
      </el-form-item>
      <el-form-item label="底部展示">
        <el-input v-model="globalConfig.supportVal" />
      </el-form-item>
      <!-- <el-form-item label="分享标题">
        <el-input v-model="globalConfig.share.title" />
      </el-form-item> -->
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import { cardConfig } from '@/widgets/card'
import { useApp } from '@/store'
import { ref, computed } from 'vue'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const app = useApp()
const selected = computed(() => app.selected)
const globalConfig = ref(app.config.globalConfig)
</script>
