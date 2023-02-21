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
      url: '//localhost:8082',
      // data: {
      //   remoteUrl: 'http://localhost:8090',
      // },
    },
  );
  setData({
    remoteUrl: 'http://localhost:8090',
    config,
    schema,
    widgets,
    routes: [
      { name: 'Home', path: '/', meta: { title: '首页' } },
      { name: 'Personal', path: '/personal', meta: { title: '个人中心' } },
      { name: 'canteenOrder', path: '/canteenOrder', meta: { title: '订单中心' } },
    ],
  });
}
init();
</script>
