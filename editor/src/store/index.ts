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
  const config = ref<Config>({
    globalConfig: {},
    body: [
      { type: 'card', defaultImg: '', uuid: uuidv4(), isShow: 1, url: '', order: 0, style: {} }
    ],
    tabbars: {
      uuid: uuidv4(),
      type: 'tabbar',
      list: [],
    }
  });
  function setConfig(data: Config) {
    config.value = data
  }
  watch(config, (val) => {
    window.microApp?.dispatch(val)
  }, { deep: true })
  return {
    setConfig,
    selected: {} as Widget | TabbarWidgetConfig,
    config,
  };
})
