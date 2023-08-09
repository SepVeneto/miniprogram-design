<template>
  <main
    ref="mainRef"
    class="draggable-box"
    style="min-height: calc(667px - 60px); position: relative;"
  >
    <template v-if="!preview">
      <draggable-wrapper
        v-for="item in data"
        :key="item._uuid"
        dir="top"
        :active="activeUuid === item._uuid || selected._uuid === item._uuid"
        :hide="item.isShow != null && !item.isShow"
        :container="item._view === 'container'"
        :mask="item._view !== 'container' && item._view !== 'canvas' && item._mask"
        :custom-style="item.style"
        @mouseenter.stop="onEnter(item._uuid)"
        @mouseleave.stop="onLeave()"
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
        <template v-else>
          <ViewRender
            v-if="ViewRender"
            :type="item._view"
            :config="item"
            @update:config="updateConfig"
          />
        </template>
      </draggable-wrapper>
    </template>
    <template v-else>
      <template
        v-for="item in data"
        :key="item._uuid"
      >
        <container-view
          v-if="item._view === 'container'"
          :config="item"
        />
        <view-render
          v-else
          :type="item._view"
          :config="item"
          :style="normalizeStyle(item.style)"
        />
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import draggableWrapper from '@/components/draggableWrapper.vue';
import { ref, computed, provide, reactive, toRefs } from 'vue';
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
// import viewRender from 'widgets_side/viewRender';
import { useFederatedComponent, normalizeStyle } from '@sepveneto/mpd-hooks';
import canvasView from '@/widgets/canvas.view.vue';
import { useRoute } from 'vue-router';
import { useHoverActive } from '@/widgets/useHoverActive';
import { useSortable } from './useSortable';

const route = useRoute();

const props = defineProps({
  preview: Boolean,
});
const app = useApp();
const { activeUuid, onEnter, onLeave } = useHoverActive();

provide('Editor', reactive({
  ...toRefs(props),
  globalConfig: computed(() => app.config.globalConfig),

  updateConfig,
}));

const mainRef = ref();

const data = computed({
  get () {
    return app.config.body[route.name!] ?? [];
  },
  set (val: any) {
    app.config.body[route.name!] = val;
  },
});
useSortable(mainRef, data, {
  group: { name: 'widgets', pull: true, put: onPut },
});

// const selected = ref({} as any)
const selected = computed(() => app.selected);

const { Component: ViewRender } = useFederatedComponent(
  app.remoteUrl,
  'widgets_side',
  './viewRender',
);

function onPut (_1: any, _2: any, dom: any) {
  // const { _inContainer } = dom.__draggable_context.element;
  // // console.log(_1, _2, dom.__draggable_context.element, target)
  // return !_inContainer || _inContainer === 'outer';
  return true;
}
function handleSelect (data: any) {
  // 不能使用运算展开符，需要确保selected与editor指向同一地址
  // 否则选择后的配置结果无法反应到编辑器和store里
  app.selected = data;
  app.selected._fromContainer = false;
}
function updateConfig (data: any) {
  app.selected = data;
  app.selected._fromContainer = false;
  // app.updateConfig();
}
</script>

<style lang="scss" scoped>
.draggable-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
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
