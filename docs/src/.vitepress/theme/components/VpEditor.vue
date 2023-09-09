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

// onMounted(() => {
//   console.log('mounted')
//   handleLoader()
// })

handleLoader()
function handleLoader() {
  const schema = {
    card: [{
      type: 'box',
    }],
  }
  const widgets = [
    {
      name: '基本组件',
      group: [
        {
          _name: '卡片',
          _view: 'card',
          _schema: 'card',
          style: {},
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
    url: isProduction ? 'https://sepveneto.github.io/miniprogram-design/editor/prod/' : 'http://localhost:8082',
    inline: !isProduction,
    data,
    mounted: () => {
      loading.value = false
    },
  })
}
</script>
