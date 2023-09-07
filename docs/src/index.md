<div id="mpd-container" />
<!-- <button @click="handleLoader">loader</button> -->
<!-- <ClientOnly>
<micro-app name="design" url="https://sepveneto.github.io/miniprogram-design/" />
</ClientOnly> -->

<script setup>
import { useDesign } from '@sepveneto/mpd-core'
import { ref, onMounted } from 'vue'
const show = ref(false)
const containerRef = ref()

// onMounted(() => {
//   console.log('mounted')
//   handleLoader()
// })

handleLoader()
function handleLoader() {
  const schema = {
    card: [{
      type: 'box',
    }]
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
            }
          ]
        }
      ]
  const remoteUrl = localStorage.getItem('RemoteUrl')
  const data = {
      schema,
      widgets,
      config: {
        body: {
          Home: []
        }
      }
    }
  if (remoteUrl) {
    data.remoteUrl = remoteUrl
  }
  useDesign('#mpd-container', {
    name: 'design',
    // url: 'https://sepveneto.github.io/miniprogram-design/',
    url: 'http://10.7.12.26:9087/miniprogram-design/__dev/',
    inline: true,
    data,
  })
}
</script>
