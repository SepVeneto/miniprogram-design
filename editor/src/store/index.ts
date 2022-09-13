import { defineStore } from 'pinia';
import { computed, ref, shallowRef, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import { TabbarWidgetConfig } from '@/layout/tabbar/type'

import { schema as schemaConfig} from '@/mock.schema'
import mock from '@/mock.json'

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
  const widgetList = ref<any[]>([])
  const config = ref<any>({
    globalConfig: {},
    body: {},
    tabbars: {
      uuid: uuidv4(),
      type: 'tabbar',
      list: [],
    }
  });
  const currentTab = ref({})
  const currentRoute = ref()
  const schema = shallowRef<Record<string, any>>({})

  /** mock */
  config.value = mock
  schema.value = { ...schemaConfig }
  currentRoute.value = config.value.tabbars.list[0].type

  function setConfig(data: Config, widgets: Record<string, any>, _schema: any) {
    config.value = data
    currentRoute.value = 0
    currentTab.value = data.tabbars.list[currentRoute.value]

    widgetList.value = Object.values(widgets)

    schema.value = _schema
  }
  watch(config, (val) => {
    console.log('watch', val)
    window.microApp?.dispatch(val)
  }, { deep: true })

  function updateConfig() {
    const index = currentConfig.value.findIndex((item: any) => item._uuid === selected.value._uuid)
    if (index === -1) return;
    currentConfig.value[index] = { ...selected.value };
  }
  const currentConfig = computed(() => {
    return config.value.body[currentRoute.value]
  })
  const selected = ref<any>({})
  return {
    updateConfig,
    setConfig,
    widgetList,
    currentTab,
    currentRoute,
    selected,
    config,
    schema,
  };
})
