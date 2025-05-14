import { defineStore } from 'pinia'
import type { TabbarWidgetConfig } from '@/layout/tabbar/type'
import { computed, ref, shallowRef, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { router } from '@/router'
import Editor from '@/layout/editor.vue'

import mock from '@/mock'
import { schema as schemaConfig } from '@/mock.schema'
import type { DisabledItemFn, WidgetNode } from '@/types/type'
import { useRoute } from 'vue-router'
import { emitEvt } from '@/utils'

export interface Settings {
  disabledItem?: DisabledItemFn
  // 禁用添加
  disabledAdd?: boolean
}
export interface Config{
  globalConfig: Record<string, any>
  pageConfig?: Record<string, any>
  body: Record<PropertyKey, any[]>
  tabbars: TabbarWidgetConfig
}

export const useApp = defineStore('app', () => {
  const emitter = shallowRef()
  const schemaType = ref<'widget' | 'page' | 'global'>('page')
  const widgetList = ref<{name: string, group: WidgetNode[]}[]>([])
  const config = ref<Config>({
    globalConfig: {},
    body: {},
    tabbars: {
      _uuid: uuidv4(),
      list: [],
    },
  })
  const schema = shallowRef<Record<string, any>>({})
  const routes = shallowRef<any[]>([
    { path: '/' },
  ])
  const remoteUrl = ref('')
  const history = ref<string[]>([])
  const hasHistory = computed(() => history.value.length > 1)
  const settings = ref<Settings>({})

  /** mock */
  if (!window.__MICRO_APP_ENVIRONMENT__) {
    config.value = mock
    schema.value = { ...schemaConfig }
    widgetList.value = [
      {
        name: '基本组件',
        group: [
          {
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            isShow: 1,
            title: '标题',
            style: {
              width: 375,
              height: 100,
              background: '#fff',
            },
          },
          {
            _name: '浮窗',
            _view: 'floatBtn',
            _schema: 'floatBtn',
            _inContainer: 'outer',
            isShow: 1,
            style: {
              width: 50,
              height: 50,
              position: 'fixed',
              bottom: 0,
              right: 0,
            },
          },
          {
            _name: '说明',
            _view: 'menuItem',
            _schema: 'desc',
            title: '说明',
            style: {
              background: '#fff',
            },
          },
          {
            _name: '容器',
            _view: 'container',
            _schema: 'container',
            isShow: 1,
            grid: 1,
            style: {
              boxSizing: 'border-box',
              columnGap: 10,
            },
            list: [],
          },
          {
            _name: '轮播',
            _view: 'swiper',
            _schema: 'swiper',
            type: 'swiper',
            style: {},
            list: [],
          },
          {
            _name: '图片',
            _view: 'image',
            _schema: 'image',
            img: '/favicon.ico',
            style: { width: 375, height: 100 },
          },
          {
            _name: '文字',
            _view: 'text',
            _schema: 'text',
            style: {
              fontSize: 16,
              color: '#000000',
            },
            content: '文字',
          },
          {
            _name: '画布',
            _view: 'canvas',
            _schema: 'canvas',
            style: {},
            list: [],
          },
        ],
      },
    ]
    routes.value = [
      { name: 'Home', path: '/', meta: { title: '首页' } },
      { name: 'Personal', path: '/personal', meta: { title: '个人中心' } },
      { name: 'canteenOrder', path: '/canteenOrder', meta: { title: '订单中心' } },
    ]
    updateRouter()
    // currentRoute.value = config.value.tabbars.list[0].type;
    remoteUrl.value = '//localhost:8090'
  }

  function getConfig(name: string) {
    return config.value.body[name]
  }
  function setSettings(_settings: Settings) {
    settings.value = _settings
  }
  function setConfig(
    data: Config,
    widgets: Record<string, any>,
    _schema: any,
    _routes?: any,
  ) {
    config.value = data
    // currentRoute.value = config.value.tabbars.list[0].type;
    // currentTab.value = data.tabbars.list[currentRoute.value]

    widgetList.value = Object.values(widgets)

    schema.value = _schema
    routes.value = _routes
    if (_routes) {
      updateRouter()
    } else {
      router.replace({ path: '/' })
    }
  }

  function setRoutes(_routes: any[]) {
    routes.value = _routes
    updateRouter()
  }

  watch(config, (val) => {
    window.microApp?.dispatch({ config: val })
    emitEvt('SET_CONFIG', val)
  }, { deep: true })
  function updateRouter(route?: any) {
    router.clearRoutes()
    if (route) {
      router.addRoute({ ...route, component: Editor })
    } else {
      routes.value.forEach(raw => {
        router.addRoute({ ...raw, component: Editor })
      })
      router.isReady().then(() => {
        if (routes.value.length > 0) {
          router.replace({ name: routes.value[0].name })
        } else {
          console.warn('请至少设置一个路由')
        }
      })
    }
  }
  // function findParent (uuid: string, root: any[]): any {
  //   for (const item of root) {
  //     if (item._uuid === uuid) return root;
  //     if (item.list) {
  //       const res = findParent(uuid, item.list);
  //       if (res) return res;
  //     }
  //   }
  //   return null;
  // }

  // function updateConfig () {
  //   if (selected.value._view === 'tabbar') {
  //     return;
  //   }
  //   const parent = findParent(selected.value._uuid, currentConfig.value);
  //   const index = parent.findIndex((item: any) => item._uuid === selected.value._uuid);
  //   parent[index] = { ...selected.value };
  // }
  function toHome() {
    history.value = []
    const home = routes.value[0]
    router.replace({ name: home.name })
  }

  const selected = ref<any>({})
  const activeUuids = ref<string[]>([])
  const active = {
    enter(uuid: string) {
      if (activeUuids.value.includes(uuid)) return
      activeUuids.value.push(uuid)
    },
    leave() {
      activeUuids.value.pop()
    },
  }
  const route = useRoute()
  function flatteBody() {
    if (!route.name) return

    const res: Record<string, any> = {}
    Object.entries(config.value.body).forEach(([name, list]) => {
      if (name === route.name) {
        res[name] = flatte(list)
      } else {
        res[name] = list
      }
    })
    function flatte(list: any[]) {
      const res: any[] = []
      list.forEach(item => {
        if (item.list && item.list.length > 0) {
          res.push(...flatte(item.list))
          item.list = []
        }
        res.push(item)
      })
      return res
    }

    config.value.body = res
  }
  return {
    emitter,
    schemaType,
    activeUuids,
    active,
    toHome,
    routes,
    // updateConfig,
    settings,
    setSettings,
    setConfig,
    setRoutes,
    getConfig,
    flatteBody,
    widgetList,
    // currentTab,
    // currentRoute,
    selected,
    config,
    schema,
    remoteUrl,
    history,
    hasHistory,
  }
})
