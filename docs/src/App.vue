<template>
  <section>
    <div id="design-container" />
  </section>
</template>

<script lang="ts" setup>
import { useDesign } from '@sepveneto/mpd-core';
import { config, widgets, schema } from './config';
async function init () {
  const [, setData] = await useDesign(
    '#design-container',
    {
      name: 'resource',
      inline: true,
      url: window.location.origin + '/miniprogram-design/editor',
      data: {
        remoteUrl: '//localhost:8082',
      },
    },
  );
  setData({
    config,
    schema,
    widgets,
  });
}
init();
</script>
