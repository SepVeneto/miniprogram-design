import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import { CardWidgetConfig, GlobalConfig, MenuWidgetConfig, ShopWidgetConfig, TabbarWidgetConfig } from '@/widgets/type'

type Widget = CardWidgetConfig | MenuWidgetConfig | ShopWidgetConfig | CardWidgetConfig

interface Config{
  globalConfig: Partial<GlobalConfig>
  body: Widget[]
  tabbars: TabbarWidgetConfig
}

export const useApp = defineStore('app', () => {
  const widgetList = ref([])
  const config = ref<Config>({
    globalConfig: {},
    body: [],
    tabbars: {
      uuid: uuidv4(),
      type: 'tabbar',
      list: [],
    }
  });
  const currentTab = ref({})
  const currentRoute = ref(0)
  function setConfig(data: Config, widgets: any) {
    config.value = data
    currentRoute.value = 0
    currentTab.value = data.tabbars.list[currentRoute.value]

    widgetList.value = Object.values(widgets)
  }
  watch(config, (val) => {
    console.log(val)
    window.microApp?.dispatch(val)
  }, { deep: true })
  return {
    setConfig,
    widgetList,
    currentTab,
    currentRoute,
    selected: {} as Widget | TabbarWidgetConfig,
    config,
  };
})
