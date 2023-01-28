import { defineStore } from 'pinia';
import { computed, ref, shallowRef, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { TabbarWidgetConfig } from '@/layout/tabbar/type';

import { schema as schemaConfig } from '@/mock.schema';
import mock from '@/mock.json';
import { router } from '@/router';
import Editor from '@/layout/editor.vue';

export interface GlobalConfig {
  color: string
  emptyColor: string
  bubbleColor: string
  loginBg: string
  title: string
}

interface Config{
  globalConfig: Partial<GlobalConfig>
  body: Record<string, any[]>
  tabbars: TabbarWidgetConfig
}

export const useApp = defineStore('app', () => {
  const widgetList = ref<any[]>([]);
  const config = ref<any>({
    globalConfig: {},
    body: {},
    tabbars: {
      uuid: uuidv4(),
      type: 'tabbar',
      list: [],
    },
  });
  const currentTab = ref({});
  const currentRoute = ref();
  const schema = shallowRef<Record<string, any>>({});
  const routes = shallowRef<any[]>([
    { name: 'Home', path: '/' },
  ]);

  /** mock */
  if (!window.__MICRO_APP_ENVIRONMENT__) {
    config.value = mock;
    schema.value = { ...schemaConfig };
    widgetList.value = [
      {
        name: '基本组件',
        group: [
          {
            _name: '菜单项',
            _view: 'menuItem',
            _schema: 'menuItem',
            title: '标题',
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
    ];
    routes.value = [
      { name: 'Home', path: '/' },
      { name: 'Personal', path: '/personal' },
      { name: 'canteenOrder', path: '/canteenOrder' },
    ];
    updateRouter();
    currentRoute.value = config.value.tabbars.list[0].type;
  }

  function getConfig (name: string) {
    return config.value.body[name];
  }
  function setConfig (
    data: Config,
    widgets: Record<string, any>,
    _schema: any,
  ) {
    config.value = data;
    currentRoute.value = config.value.tabbars.list[0].type;
    // currentTab.value = data.tabbars.list[currentRoute.value]

    widgetList.value = Object.values(widgets);

    schema.value = _schema;
  }
  watch(config, (val) => {
    window.microApp?.dispatch(val);
  }, { deep: true });

  function updateRouter (route?: any) {
    if (route) {
      router.addRoute({ ...route, component: Editor });
    } else {
      routes.value.forEach(raw => {
        router.addRoute({ ...raw, component: Editor });
      });
      router.replace({ name: 'Home' });
    }
  }
  function findParent (uuid: string, root: any[]): any {
    for (const item of root) {
      if (item._uuid === uuid) return root;
      if (item.list) {
        const res = findParent(uuid, item.list);
        if (res) return res;
      }
    }
    return null;
  }

  function updateConfig () {
    if (selected.value._view === 'tabbar') {
      return;
    }
    const parent = findParent(selected.value._uuid, currentConfig.value);
    const index = parent.findIndex((item: any) => item._uuid === selected.value._uuid);
    parent[index] = { ...selected.value };
  }
  const currentConfig = computed(() => {
    return config.value.body[currentRoute.value];
  });
  const selected = ref<any>({});
  return {
    updateConfig,
    setConfig,
    getConfig,
    widgetList,
    currentTab,
    currentRoute,
    selected,
    config,
    schema,
  };
});
