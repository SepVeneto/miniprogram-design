<template>
  <card-config v-if="['card', 'explain'].includes(selected.type)" v-model="selected" />
  <tabbar-config v-else-if="selected.type === 'tabbar'" v-model="selected" />
  <shop-config v-else-if="selected.type === 'shop'" v-model="selected" />
  <menu-config v-else-if="selected.type === 'menu'" v-model="selected" />
  <mine-config v-else-if="selected.type === 'mine'" v-model="selected" />
  <section v-else>
    <el-form label-width="100px">
      <el-form-item label="主题">
        <el-color-picker v-model="globalConfig.color" show-alpha />
      </el-form-item>
      <el-form-item label="空记录背景色">
        <el-color-picker v-model="globalConfig.emptyColor" show-alpha />
      </el-form-item>
      <el-form-item label="气泡颜色">
        <el-color-picker v-model="globalConfig.bubbleColor" show-alpha />
      </el-form-item>
      <el-form-item label="页面标题">
        <el-input v-model="globalConfig.title" />
      </el-form-item>
      <el-form-item label="登录背景图片">
        <oss-upload v-model="globalConfig.loginBg" />
      </el-form-item>
      <!-- <el-form-item label="分享标题">
        <el-input v-model="globalConfig.share.title" />
      </el-form-item> -->
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import { cardConfig } from '@/widgets/card'
import { tabbarConfig } from '@/widgets/tabbar'
import { menuConfig } from '@/widgets/menu'
import { shopConfig } from '@/widgets/shop'
import { mineConfig } from '@/widgets/mine'
import { useApp } from '@/store'
import { ref, computed } from 'vue'
import ossUpload from '@/components/ossUpload.vue'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const app = useApp()
const selected = computed({
  get() {
    return app.selected;
  },
  set(val) {
    app.selected = val
  }
})
const globalConfig = computed({
  get() {
    return app.config.globalConfig
  },
  set(val) {
    app.config.globalConfig = val
  }
})
</script>
