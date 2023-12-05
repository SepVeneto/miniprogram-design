import { defineStore } from 'pinia'
import type { TabbarWidgetConfig } from '@/layout/tabbar/type'
import { computed, ref, shallowRef, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { router } from '@/router'
import Editor from '@/layout/editor.vue'

import mock from '@/mock'
import { schema as schemaConfig } from '@/mock.schema'

export interface Config{
  globalConfig: Record<string, unknown>
  body: Record<PropertyKey, any[]>
  tabbars: TabbarWidgetConfig
}

export const useApp = defineStore('app', () => {
  const widgetList = ref<any[]>([])
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
            title: '标题',
            width: 0,
            height: 0,
            style: {
              background: '#fff',
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
            grid: 2,
            style: {},
            list: [],
          },
          {
            _name: '轮播',
            _view: 'swiper',
            _schema: 'swiper',
            style: {},
            list: [],
          },
          {
            _name: '图片',
            _view: 'image',
            _schema: 'image',
            _inContainer: 'canvas',
            img: '/favicon.ico',
            style: { width: 40, height: 40 },
          },
          {
            _name: '文字',
            _view: 'text',
            _schema: 'text',
            _inContainer: 'canvas',
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

  watch(config, (val) => {
    window.microApp?.dispatch({ config: val })
  }, { deep: true })
  function updateRouter(route?: any) {
    if (route) {
      router.addRoute({ ...route, component: Editor })
    } else {
      routes.value.forEach(raw => {
        router.addRoute({ ...raw, component: Editor })
      })
      router.isReady().then(() => {
        router.replace({ name: routes.value[0].name })
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
    console.log(home)
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
  return {
    activeUuids,
    active,
    toHome,
    // updateConfig,
    setConfig,
    getConfig,
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
