<template>
  <section
    class="main-container"
    @click="handleOutside"
  >
    <main
      ref="mainRef"
      style="display: flex; justify-content: space-between;"
    >
      <aside style="width: 300px; background: #fff;">
        <ElCard>
          <template #header>
            <span>组件</span>
          </template>
          <el-scrollbar wrap-style="height: 700px;">
            <widget-wrap
              :list="app.widgetList"
              :preview="isPreview"
            />
          </el-scrollbar>
        </ElCard>
      </aside>
      <div>
        <div class="mobile-frame">
          <div class="mobile-content">
            <header class="header">
              <div style="cursor: pointer;">
                <el-icon
                  v-if="app.hasHistory"
                  @click="router.back()"
                >
                  <ArrowLeftBold />
                </el-icon>
                <el-icon
                  v-else
                  @click="app.toHome()"
                >
                  <img
                    style="width: 100%; height: 100%;"
                    src="@/assets/home.svg"
                  >
                </el-icon>
              </div>
              <span>{{ title }}</span>
              <span class="icon" />
            </header>
            <el-scrollbar
              style="height: calc(100% - var(--header-height) - var(--tabbar-height))"
            >
              <router-view :preview="isPreview" />
            </el-scrollbar>
            <template
              v-if="tabbar"
            >
              <tabbarPreview
                :preview="isPreview"
                :config="tabbar"
                :active="tabbar._uuid === selected._uuid"
                @click="handleSelect(tabbar)"
              />
            </template>
            <div
              v-else
              style="background: #fff; height: var(--tabbar-height)"
            />
          </div>
        </div>
        <EditorOperate v-model="mode" />
      </div>
      <aside style="background: #fff; width: 400px; max-height: 810px">
        <ElCard>
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ selected._name || '配置' }}</span>
              <el-button
                type="primary"
                text
                :disabled="isPreview || !selected._schema || ['tabbar'].includes(selected._schema)"
                @click="handleDelete"
              >
                删除
              </el-button>
            </div>
          </template>
          <el-scrollbar wrap-style="height: 700px;">
            <ElConfigProvider :locale="zhCn">
              <VConfig />
            </ElConfigProvider>
          </el-scrollbar>
        </ElCard>
      </aside>
    </main>
  </section>
</template>

<script lang="ts" setup>
import widgetWrap from '@/layout/widgetWrap.vue'
import VConfig from '@/layout/config.vue'
import { tabbarPreview } from '@/layout/tabbar'
import { computed, onMounted, ref } from 'vue'
import { useApp } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import type { Mode } from '@/layout/EditorOperate.vue'
import EditorOperate from '@/layout/EditorOperate.vue'
// @ts-expect-error: no def
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const route = useRoute()
const router = useRouter()
const app = useApp()
const mainRef = ref()
const mode = ref<Mode>('edit')

const tabbar = computed(() => app.config.tabbars)
const selected = computed(() => app.selected)
const title = computed(() => route.meta.title)
const isPreview = computed(() => mode.value === 'preview')
// const needBack = computed(() => route.)

onMounted(() => {
  window.microApp?.dispatch({
    event: 'mounted',
  })
})

function handleDelete() {
  const currentConfig = app.config.body[route.name!]
  const index = currentConfig.findIndex(item => item._uuid === selected.value._uuid)
  if (index === -1) {
    const list = currentConfig.find((item: any) => item.list && item.list.length > 0)?.list ?? null
    if (list) {
      const tIndex = list.findIndex((item: any) => item._uuid === selected.value._uuid)
      list.splice(tIndex, 1)
    }
    app.selected = {}
    return
  }
  currentConfig.splice(index, 1)
  app.selected = {}
}
function handleSelect(data: any) {
  app.selected = data
}
function handleOutside({ target }: Event) {
  if (target === mainRef.value) {
    app.selected = {}
  }
}
</script>

<style lang="scss" scoped>
.top-header {
  background: #fff;
  padding: 0 20px;
  height: 90px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.mobile-frame {
  --padding-x: 15px;
  --tabbar-height: 50px;
  --header-height: 44px;
  --safe-bottom: 40px;
  float: left;
  background: url('./assets/iPhone13.png');
  width: 375px;
  height: 720px;
  padding: 0 var(--padding-x);
  padding-top: 50px;
  padding-bottom: var(--safe-bottom);
  box-sizing: content-box;
  background-size: calc(375px + 2 * var(--padding-x)) 100%;
  .mobile-content {
    height: inherit;
    background: #f4f5f7;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    overflow: hidden;
  }
  .header {
    width: 375px;
    height: var(--header-height);
    box-sizing: border-box;
    padding: 0 16px;
    font-size: 18px;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('./assets/4_objects.svg');
      background-size: 100%;
      display: inline-block;
      width: 87px;
      height: 32px;
    }
  }
}
.main-container {
  // display: flex;
  width: 100%;
  // justify-content: space-between;
}
// .mobile-wrapper {
//   padding: 10px;
//   border: 1px solid #222;
//   border-radius: 6px;
// }
.draggable-box {
  min-height: 400px;
}
</style>
