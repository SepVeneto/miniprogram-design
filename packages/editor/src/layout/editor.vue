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
          :active="activeUuid === item._uuid || selected._uuid === item._uuid"
          :hide="item.isShow != null && !item.isShow"
          :container="item._view === 'container'"
          :mask="item._view !== 'container' && item._view !== 'canvas' && item._mask"
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
import { ref, computed, provide, reactive, toRefs } from 'vue';
import { useApp } from '@/store';
import containerView from '@/widgets/container.view.vue';
// import viewRender from 'widgets_side/viewRender';
import { useFederatedComponent } from '@sepveneto/mpd-hooks';
import canvasView from '@/widgets/canvas.view.vue';
import { useRoute } from 'vue-router';
import { useHoverActive } from '@/widgets/useHoverActive';

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
  set (val) {
    app.config.body[route.name!] = val;
  },
});
// const selected = ref({} as any)
const selected = computed(() => app.selected);

const { Component: ViewRender } = useFederatedComponent(
  app.remoteUrl,
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
  // app.updateConfig();
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
