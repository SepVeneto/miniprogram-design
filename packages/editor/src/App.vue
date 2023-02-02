<template>
  <section
    class="main-container"
    @click="handleOutside"
  >
    <header style="margin-bottom: 10px;">
      <el-button
        :type="preview ? 'primary' : ''"
        @click="preview = !preview"
      >
        预览
      </el-button>
    </header>
    <main
      ref="mainRef"
      style="display: flex; justify-content: space-between;"
    >
      <aside style="width: 300px; background: #fff;">
        <div
          style="padding: 20px; margin-bottom: 10px; border-bottom: 1px solid #ddd;"
        >
          组件
        </div>
        <el-scrollbar wrap-style="height: 700px; padding: 20px;">
          <widget-wrap
            :list="app.widgetList"
            :preview="preview"
          />
        </el-scrollbar>
      </aside>
      <div class="mobile-frame">
        <div class="mobile-content">
          <header class="header">
            <span>{{ app.currentTab.text }}</span>
            <span class="icon" />
          </header>
          <el-scrollbar
            style="height: calc(100% - var(--header-height) - var(--tabbar-height))"
          >
            <router-view :preview="preview" />
            <!-- <v-editor :preview="preview" /> -->
          </el-scrollbar>
          <tabbar-preview
            :preview="preview"
            :config="tabbar"
            :active="tabbar._uuid === selected._uuid"
            @click="handleSelect(tabbar)"
          />
        </div>
      </div>
      <aside style="background: #fff; width: 400px; max-height: 810px">
        <div style="display: flex; justify-content: space-between; padding: 20px; align-items: center; border-bottom: 1px solid #ddd; margin-bottom: 10px;">
          <span>{{ selected._name || '配置' }}</span>
          <el-button
            type="primary"
            text
            :disabled="preview || !selected._schema || ['tabbar'].includes(selected._schema)"
            @click="handleDelete"
          >
            删除
          </el-button>
        </div>
        <el-scrollbar wrap-style="height: 700px; padding: 20px;">
          <v-config />
        </el-scrollbar>
      </aside>
    </main>
  </section>
</template>

<script lang="ts" setup>
import VEditor from '@/layout/editor.vue';
import widgetWrap from '@/layout/widgetWrap.vue';
import VConfig from '@/layout/config.vue';
import { tabbarPreview } from '@/layout/tabbar';
import { ref, computed } from 'vue';
import { useApp } from '@/store';
const app = useApp();
const mainRef = ref();
const tabbar = computed(() => app.config.tabbars);
const selected = computed(() => app.selected);
const preview = ref(false);

function handleDelete () {
  const currentConfig = app.config.body[app.currentRoute];
  const index = currentConfig.findIndex(item => item._uuid === selected.value._uuid);
  if (index === -1) {
    const list = currentConfig.find((item: any) => item.list && item.list.length > 0)?.list ?? null;
    if (list) {
      const tIndex = list.findIndex((item: any) => item._uuid === selected.value._uuid);
      list.splice(tIndex, 1);
    }
    app.selected = {};
    return;
  }
  currentConfig.splice(index, 1);
  app.selected = {};
}
function handleSelect (data: any) {
  app.selected = data;
}
function handleOutside ({ target }: Event) {
  if (target === mainRef.value) {
    app.selected = {};
  }
}
</script>

<style lang="scss" scoped>
.top-header {
  background: #fff;
  padding: 0 20px;
  height: 90px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.mobile-frame {
  --padding-x: 15px;
  --tabbar-height: 50px;
  --header-height: 44px;
  --safe-bottom: 40px;
  background: url('./assets/iPhone13.png');
  width: 375px;
  height: 720px;
  padding: 0 var(--padding-x);
  padding-top: 50px;
  padding-bottom: var(--safe-bottom);
  box-sizing: content-box;
  background-size: calc(375px + 2 * var(--padding-x)) 100%;
  .mobile-content {
    height: inherit;
    background: #f4f5f7;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    overflow: hidden;
  }
  .header {
    width: 375px;
    height: var(--header-height);
    box-sizing: border-box;
    padding: 0 16px;
    font-size: 18px;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      background: url('./assets/4_objects.svg');
      background-size: 100%;
      display: inline-block;
      width: 87px;
      height: 32px;
    }
  }
}
.main-container {
  // display: flex;
  width: 100%;
  // justify-content: space-between;
}
// .mobile-wrapper {
//   padding: 10px;
//   border: 1px solid #222;
//   border-radius: 6px;
// }
.draggable-box {
  padding: 2px;
  min-height: 400px;
}
</style>
