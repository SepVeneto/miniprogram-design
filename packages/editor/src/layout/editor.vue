<template>
  <main
    ref="mainRef"
    style="min-height: calc(667px - 60px); position: relative;"
  >
    <draggable
      v-model="data"
      class="draggable-box"
      :animation="200"
      ghost-class="ghost"
      :component-data="{
        type: 'transition-group',
        name: 'flip-list',
      }"
      item-key="_uuid"
      handle=".operate"
      :group="{ name: 'widgets', pull: true, put: onPut }"
    >
      <template #item="{ element: item }">
        <draggable-wrapper
          v-if="!preview"
          dir="top"
          :active="selected._uuid === item._uuid"
          :hide="item.isShow != null && !item.isShow"
          :container="item._view === 'container'"
          :mask="item._view !== 'container' && item._view !== 'canvas' && item._mask"
          @click="handleSelect(item)"
        >
          <container-view
            v-if="item._view === 'container'"
            :config="item"
          />
          <canvas-view
            v-else-if="item._view === 'canvas'"
            :config="item"
          />
          <component
            :is="Component"
            v-else
            :type="item._view"
            :config="item"
            @update:config="updateConfig"
          />
          <!--
 <view-render
            v-else
            :type="item._view"
            :config="item"
            @update:config="updateConfig"
          />
-->
        </draggable-wrapper>
        <template v-else>
          <container-view
            v-if="item._view === 'container'"
            :config="item"
          />
          <view-render
            v-else
            :type="item._view"
            :config="item"
          />
        </template>
      </template>
    </draggable>
  </main>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import draggableWrapper from '@/components/draggableWrapper.vue';
import { ref, computed, provide, reactive, toRefs, shallowRef, watch } from 'vue';
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
// @ts-expect-error: from module federation
// import viewRender from 'widgets_side/viewRender';
import canvasView from '@/widgets/canvas.view.vue';

const props = defineProps({
  preview: Boolean,
});
const app = useApp();

provide('Editor', reactive({
  ...toRefs(props),
  globalConfig: computed(() => app.config.globalConfig),

  updateConfig,
}));

const mainRef = ref();

const data = computed({
  get () {
    return app.config.body[app.currentRoute] ?? [];
  },
  set (val) {
    app.config.body[app.currentRoute] = val;
  },
});
// const selected = ref({} as any)
const selected = computed(() => app.selected);

const { Component, errorLoading } = useFederatedComponent(
  'http://localhost:8090/remoteEntry.js',
  'widgets_side',
  './viewRender',
);

function onPut (_1: any, _2: any, dom: any) {
  const { _inContainer } = dom.__draggable_context.element;
  // console.log(_1, _2, dom.__draggable_context.element, target)
  return !_inContainer || _inContainer === 'outer';
}
function handleSelect (data: any) {
  app.selected = data;
}
function updateConfig (data: any) {
  app.selected = data;
  app.updateConfig();
}

function useDynamicScript (url: string) {
  const ready = ref(false);
  const errorLoading = ref(false);

  const element = document.createElement('script');
  element.src = url;
  element.type = 'text/javascript';
  element.async = true;

  element.onload = () => {
    ready.value = true;
    document.head.removeChild(element);
  };
  element.onerror = () => {
    ready.value = false;
    errorLoading.value = true;
  };

  document.head.appendChild(element);

  return { ready, errorLoading };
}

function useFederatedComponent (remoteUrl, scope, module) {
  const Component = shallowRef();
  // const key = `${remoteUrl}-${scope}-${module}`;
  const { ready, errorLoading } = useDynamicScript(remoteUrl);

  watch(ready, async () => {
    Component.value = await loadComponent(scope, module);
  });
  return { Component, errorLoading };
}

async function loadComponent (scope, module) {
  // return async () => {
  await __webpack_init_sharing__('default');
  const container = window[scope];
  await container.init(__webpack_init_sharing__.default);
  const factor = await window[scope].get(module);
  const Module = factory();
  return Module;
  // }
}
</script>

<style lang="scss" scoped>
.draggable-box {
  padding: 2px;
  height: 400px;
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
