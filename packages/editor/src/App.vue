<template>
  <ElConfigProvider
    :locale="zhCn"
    namespace="mpd"
  >
    <section
      class="main-container"
      @click="handleOutside"
    >
      <main
        ref="mainRef"
        style="display: flex; justify-content: space-between;"
      >
        <aside
          v-if="!settings.disableAdd"
          style="width: 300px;"
        >
          <ElCard>
            <template #header>
              <span>组件</span>
            </template>
            <el-scrollbar
              wrap-style="height: 700px;"
              noresize
            >
              <widget-wrap
                :list="app.widgetList"
                :preview="isPreview"
              />
            </el-scrollbar>
          </ElCard>
        </aside>
        <div>
          <!-- TODO: tools -->
          <div class="mobile-frame">
            <div
              class="mobile-content"
              :style="globalStyle"
            >
              <header
                class="header"
                :class="{ hidden: !showTopbar }"
              >
                <div style="cursor: pointer; position: absolute; left: 10px;">
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
                <span
                  class="icon"
                  style="position: absolute; right: 0;"
                />
              </header>
              <ElScrollbar style="transform: translate(0, 0);">
                <router-view
                  :preview="isPreview"
                />
              </ElScrollbar>
              <template
                v-if="tabbar"
              >
                <tabbarPreview
                  v-if="showTabbar"
                  :preview="isPreview"
                  :config="tabbar"
                  :active="tabbar._uuid === selected._uuid"
                  @click="handleSelect(tabbar)"
                />
              </template>
              <!-- <div
                v-else
                style="ba ckground: #fff; height: var(--tabbar-height)"
              /> -->
            </div>
          </div>
          <EditorOperate v-model="mode" />
        </div>
        <aside
          id="widget-setting"
          style="min-width: 400px; max-height: 810px"
        >
          <SettingGlobal v-if="selected._name == null" />
          <SettingWidget v-else />
        </aside>
      </main>
    </section>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import widgetWrap from '@/layout/widgetWrap.vue'
import { tabbarPreview } from '@/layout/tabbar'
import { computed, onMounted, ref } from 'vue'
import { useApp } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import type { Mode } from '@/layout/EditorOperate.vue'
import EditorOperate from '@/layout/EditorOperate.vue'
// @ts-expect-error: no def
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import SettingGlobal from './layout/Setting.global.vue'
import SettingWidget from './layout/Setting.widget.vue'
import { useConfig } from './hooks'

const route = useRoute()
const router = useRouter()
const app = useApp()
const mainRef = ref()
const mode = ref<Mode>('edit')

const tabbar = computed(() => app.config.tabbars)
const selected = computed(() => app.selected)
const title = computed(() => route.meta.title)
const isPreview = computed(() => mode.value === 'preview')
const settings = computed(() => app.settings)
// const needBack = computed(() => route.)

const pageConfig = useConfig('page')

const showTopbar = computed(() => pageConfig.value.topbarShow)
const showTabbar = computed(() => pageConfig.value.tabbarShow)
const globalStyle = computed(() => {
  const config = pageConfig.value.background || {}
  switch (config.type) {
    case 'image':
      return {
        backgroundImage: `url(${config.image})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }
    case 'color':
      return {
        backgroundColor: config.color,
      }
    default:
      return {}
  }
})

onMounted(() => {
  window.microApp && window.microApp.dispatch({
    event: 'mounted',
  })
})

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
  --padding-left-x: 14px;
  --padding-right-x: 15px;
  --tabbar-height: 50px;
  --header-height: 44px;
  --safe-bottom: 40px;
  float: left;
  background: url('./assets/iPhone13.png');
  width: 375px;
  height: 720px;
  padding-left: var(--padding-left-x);
  padding-right: var(--padding-right-x);
  padding-top: 50px;
  padding-bottom: var(--safe-bottom);
  box-sizing: content-box;
  background-size: calc(375px + var(--padding-left-x) + var(--padding-right-x)) 100%;
  .mobile-content {
    display: flex;
    flex-direction: column;
    height: inherit;
    background: #f4f5f7;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  .header {
    flex-shrink: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 375px;
    height: var(--header-height);
    box-sizing: border-box;
    padding: 0 16px;
    font-size: 18px;
    position: relative;
    background: #fff;
    &.hidden {
      background: transparent;
      position: absolute;
    }
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
