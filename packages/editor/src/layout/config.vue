<template>
  <tabbar-config
    v-if="selected._schema === 'tabbar'"
    v-model="selected"
  />
  <schema-render
    v-else-if="selected._schema"
    :key="selected._uuid"
    v-model="selected"
    :schema="app.schema[selected._schema]"
    :remote-url="app.remoteUrl"
  />
  <section v-else>
    <schema-render
      v-model="globalConfig"
      :schema="app.schema.globalConfig"
      :remote-url="app.remoteUrl"
    />
  </section>
</template>

<script lang="ts" setup>
import schemaRender from '@sepveneto/mpd-schema';
import { tabbarConfig } from '@/layout/tabbar';
import { useApp } from '@/store';
import { computed } from 'vue';

const app = useApp();
const selected = computed<any>({
  get () {
    return app.selected;
  },
  set (val) {
    app.selected = val;
  },
});
const globalConfig = computed<any>({
  get () {
    return app.config.globalConfig;
  },
  set (val) {
    app.config.globalConfig = val;
  },
});
</script>
