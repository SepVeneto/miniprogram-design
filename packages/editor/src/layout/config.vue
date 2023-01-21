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
  />
  <section v-else>
    <schema-render
      v-model="globalConfig"
      :schema="app.schema.globalConfig"
    />
  </section>
</template>

<script lang="ts" setup>
import schemaRender from '@mpd/schema';
import { tabbarConfig } from '@/layout/tabbar';
import { useApp } from '@/store';
import { computed } from 'vue';
defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
});
const app = useApp();
const selected = computed({
  get () {
    return app.selected;
  },
  set (val) {
    app.selected = val;
    app.updateConfig();
  },
});
const globalConfig = computed({
  get () {
    return app.config.globalConfig;
  },
  set (val) {
    app.config.globalConfig = val;
  },
});
</script>
