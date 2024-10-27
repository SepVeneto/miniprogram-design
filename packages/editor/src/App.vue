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
        <aside style="width: 300px; background: #fff;">
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
              <div :style="editorStyle">
                <router-view
                  :preview="isPreview"
                  :style="backgroundStyle"
                />
              </div>
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
                <span>{{ selected._name || '页面配置' }}</span>
                <div v-if="selected._schema && !['tabbar'].includes(selected._schema)">
                  <el-switch
                    v-if="!['container', 'swiper'].includes(selected._view)"
                    v-model="selected._custom"
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
                <div v-else>
                  <ElButton @click="show = true">快速生成</ElButton>
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
        </aside>
      </main>
    </section>

    <QuickDiy v-model="show" />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import widgetWrap from '@/layout/widgetWrap.vue'
import VConfig from '@/layout/config.vue'
import { tabbarPreview } from '@/layout/tabbar'
import { computed, onMounted, ref } from 'vue'
import { useApp, useHistory } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import type { Mode } from '@/layout/EditorOperate.vue'
import EditorOperate from '@/layout/EditorOperate.vue'
// @ts-expect-error: no def
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import QuickDiy from '@/components/QuickDiy/index.vue'

const route = useRoute()
const router = useRouter()
const app = useApp()
const history = useHistory()
const mainRef = ref()
const mode = ref<Mode>('edit')
const show = ref(false)

const tabbar = computed(() => app.config.tabbars)
const selected = computed(() => app.selected)
const title = computed(() => route.meta.title)
const isPreview = computed(() => mode.value === 'preview')
// const needBack = computed(() => route.)

const globalConfig = computed(() => {
  if (!route.name || !app.config.pageConfig?.[route.name as string]) {
    return app.config.globalConfig
  } else {
    return app.config.pageConfig[route.name as string]
  }
})
const showTopbar = computed(() => globalConfig.value.topbarShow)
const showTabbar = computed(() => globalConfig.value.tabbarShow)
const globalStyle = computed(() => {
  const config = globalConfig.value.background || {}
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
const editorStyle = computed(() => {
  return {
    height: `calc(100% ${showTopbar.value ? '- var(--header-height)' : ''} ${showTabbar.value ? '- var(--tabbar-height))' : ''}`,
    overflowX: 'hidden',
  }
})
const viewStyle = computed(() => {
  return {
    height: '100%',
    overflowX: 'hidden',
  }
})
/**
 * @deprecated
 */
const backgroundStyle = computed(() => {
  const { type, image, color } = app.config.globalConfig.background || {}
  switch (type) {
    case 'image':
      return {
        backgroundImage: `url(${image})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      }
    case 'color':
      return {
        backgroundColor: color,
      }
  }
  return {}
})

onMounted(() => {
  window.microApp && window.microApp.dispatch({
    event: 'mounted',
  })
})

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
function handleSelect(data: any) {
  app.selected = data
}
function handleOutside({ target }: Event) {
  if (target === mainRef.value || ['draggable-box', 'vv-free-dom--scene'].includes((target as HTMLElement).className)) {
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
    height: inherit;
    background: #f4f5f7;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  .header {
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
