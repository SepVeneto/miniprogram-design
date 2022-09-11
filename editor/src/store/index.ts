import { defineStore } from 'pinia';
import { computed, ref, shallowRef, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import { TabbarWidgetConfig } from '@/layout/tabbar/type'

export interface GlobalConfig {
  color: string
  emptyColor: string
  bubbleColor: string
  loginBg: string
  title: string
}

interface Config{
  globalConfig: Partial<GlobalConfig>
  body: Record<string, unknown>[][]
  tabbars: TabbarWidgetConfig
}

export const useApp = defineStore('app', () => {
  const widgetList = ref<unknown[]>([])
  const config = ref<Config>({
    globalConfig: {},
    body: [[
      { type: 'card', style: {}, isShow: 1, order: 1, defaultImg: '', uuid: '1', _name: 'test' }
    ], []],
    tabbars: {
      uuid: uuidv4(),
      type: 'tabbar',
      list: [],
    }
  });
  const currentTab = ref({})
  const currentRoute = ref(0)
  const schema = shallowRef<Record<string, any>>({})

  function setConfig(data: Config, widgets: Record<string, unknown>) {
    config.value = data
    currentRoute.value = 0
    currentTab.value = data.tabbars.list[currentRoute.value]

    widgetList.value = Object.values(widgets)
    const cardSchema = [
      {
        type: 'number',
        label: '顶部外边距',
        key: 'style.marginTop',
      },
      {
        type: 'number',
        label: '底部外边距',
        key: 'style.marginBottom',
      },
      {
        type: 'number',
        label: '边框圆角',
        key: 'style.borderRadius',
      },
      {
        type: 'number',
        label: '宽度',
        key: 'style.width',
      },
      {
        type: 'number',
        label: '高度',
        key: 'style.height',
      },
      {
        type: 'checkbox',
        label: '可见性',
        key: 'isShow',
      },
      {
        type: 'image',
        label: '背景图片',
        key: 'defaultImg',
      }
    ]
    schema.value = {
      card: cardSchema,
      explain: [
        {
          type: 'number',
          label: '顶部外边距',
          key: 'style.marginTop',
        },
        {
          type: 'number',
          label: '底部外边距',
          key: 'style.marginBottom',
        },
        {
          type: 'number',
          label: '边框圆角',
          key: 'style.borderRadius',
        },
        {
          type: 'number',
          label: '宽度',
          key: 'style.width',
        },
        {
          type: 'number',
          label: '高度',
          key: 'style.height',
        },
        {
          type: 'checkbox',
          label: '可见性',
          key: 'isShow',
        },
        {
          type: 'image',
          label: '背景图片',
          key: 'defaultImg',
        }
      ],
      shop: [
        {
          type: 'number',
          label: '顶部外边距',
          key: 'style.marginTop',
        },
        {
          type: 'number',
          label: '底部外边距',
          key: 'style.marginBottom',
        },
        {
          type: 'number',
          label: '宽度',
          key: 'style.width',
        },
        {
          type: 'number',
          label: '高度',
          key: 'style.height',
        },
        {
          type: 'checkbox',
          label: '可见性',
          key: 'isShow',
        },
        {
          type: 'input',
          label: '跳转地址',
          key: 'url',
        },
        {
          type: 'image',
          label: '背景图片',
          key: 'defaultImg',
        }
      ],
      reserve: [
        {
          type: 'number',
          label: '顶部外边距',
          key: 'style.marginTop',
        },
        {
          type: 'number',
          label: '底部外边距',
          key: 'style.marginBottom',
        },
        {
          type: 'number',
          label: '宽度',
          key: 'style.width',
        },
        {
          type: 'number',
          label: '高度',
          key: 'style.height',
        },
        {
          type: 'checkbox',
          label: '可见性',
          key: 'isShow',
        },
        {
          type: 'image',
          label: '背景图片',
          key: 'defaultImg',
        },
        {
          type: 'input',
          label: '菜品预定名称',
          key: 'title.content',
        },
        {
          type: 'input',
          label: '菜品预定描述',
          key: 'desc.content'
        }
      ],
      mine: [
        ...cardSchema,
        {
          type: 'checkbox',
          label: '解绑',
          key: 'unbound',
          trueLabel: 1,
          falseLabel: 0,
        },
        {
          type: 'checkbox',
          label: '充值',
          key: 'recharge',
          trueLabel: 1,
          falseLabel: 0,
        }
      ],
      container: {
        columns: 2,
        config: [
          {
            type: 'number',
            label: '顶部外边距',
            key: 'marginTop',
          },
          {
            type: 'number',
            label: '底部外边距',
            key: 'marginBottom',
          },
          {
            type: 'colorPicker',
            label: '背景颜色'
          }
        ],
      },
    }
  }
  watch(config, (val) => {
    console.log('watch', val)
    window.microApp?.dispatch(val)
  }, { deep: true })

  function updateConfig() {
    const index = currentConfig.value.findIndex(item => item.uuid === selected.value.uuid)
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
