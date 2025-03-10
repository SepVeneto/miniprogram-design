<template>
  <RemoteInput />
  <div
    v-if="loading"
    style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 36px; color: #4089ef"
  >
    <IconLoading />
  </div>
  <div id="mpd-container" />
</template>

<script setup>
import microApp from '@micro-zoe/micro-app'
import RemoteInput from './RemoteInput.vue'
import { useSidebar } from 'vitepress/theme'
import { useDesign } from '@sepveneto/mpd-core'
import IconLoading from './IconLoading.vue'
import { ref } from 'vue'

microApp.start()

const { close } = useSidebar()
const loading = ref(true)
close()

handleLoader()
function handleLoader() {
  const schema = {
    card: [{
      type: 'box',
    }],
    container: [
      { type: 'number', key: 'grid', label: '列数' },
      { type: 'number', key: 'style.columnGap', label: '列间隙' },
      { type: 'number', key: 'style.rowGap', label: '行间隙' },
    ],
  }
  const widgets = [
    {
      name: '基本组件',
      group: [
        {
          _name: '容器',
          _view: 'container',
          _schema: 'container',
        },
        {
          _name: '轮播',
          _view: 'swiper',
          _schema: 'swiper',
        },
        {
          _name: '卡片',
          _view: 'card',
          _schema: 'card',
          style: { width: 375, height: 100 },
        },
      ],
    },
  ]
  const remoteUrl = localStorage.getItem('RemoteUrl')
  const data = {
    schema,
    widgets,
    config: {
      body: {
        Home: [],
      },
    },
  }
  if (remoteUrl) {
    data.remoteUrl = remoteUrl
  }
  const isProduction = import.meta.env.MODE === 'production'
  useDesign('#mpd-container', {
    name: 'design',
    url: isProduction ? 'https://sepveneto.github.io/miniprogram-design/editor-container/dev/' : 'http://localhost:8082',
    inline: !isProduction,
    data,
    mounted: () => {
      loading.value = false
    },
  })
}
</script>
