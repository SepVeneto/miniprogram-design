<template>
  <section>
    <div>
      <button @click="handleGen">
        gen json
      </button>
    </div>
    <div id="design-container" />
  </section>
</template>

<script lang="ts" setup>
import { useDesign } from '@sepveneto/mpd-core'
import { schema, widgets } from './config'
import { shallowRef } from 'vue'

const getFn = shallowRef()

useDesign('#design-container', {
  url: 'http://localhost:8082',
  name: 'demo',
  inline: true,
  data: {
    remoteUrl: 'http://localhost:8090',
    widgets,
    schema,
    routes: [
      { name: 'Home', path: '/', meta: { title: '首页' } },
      { name: 'Personal', path: '/personal', meta: { title: '个人中心' } },
    ],
    config: { globalConfig: {}, body: {} },
  },
}).then(([get, set]) => {
  getFn.value = get
})

function handleGen() {
  console.log(getFn.value())
}
</script>
