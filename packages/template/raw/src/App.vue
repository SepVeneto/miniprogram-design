<template>
  <section>
    <div id="design-container" />
  </section>
</template>

<script lang="ts" setup>
import { useDesign } from '@sepveneto/mpd-core'
import { config, schema, widgets } from './config'
async function init() {
  const [getData, setData] = await useDesign(
    '#design-container',
    { port: 8090, url: window.location.origin + '/miniprogram-design/editor' },
  )
  setData({
    config,
    schema,
    widgets,
  })
}
init()
</script>
