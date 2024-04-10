<template>
  <section>
    <div id="design-container" />
    <div>test</div>
    <!-- <micro-app
      url="http://localhost:8082"
      name="demo"
    /> -->
  </section>
</template>

<script lang="ts" setup>
import { useDesign } from '@sepveneto/mpd-core';

useDesign('#design-container', {
  url: 'http://localhost:8082',
  name: 'demo',
  inline: true,
  data: {
    remoteUrl: 'http://localhost:8090',
    config: { globalConfig: {}, body: {}},
  }
})
</script>
