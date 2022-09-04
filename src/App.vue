<template>
  <main
    ref="mainRef"
    class="main-container"
    @click="handleOutside"
  >
    <aside style="width: 300px; background: #fff;">
      <div
        style="padding: 20px; margin-bottom: 10px; border-bottom: 1px solid #ddd;"
      >组件</div>
      <widgets />
    </aside>
    <div class="mobile-frame">
      <header class="header">
        <!-- <span>{{globalConfig.title}}</span> -->
      </header>
      <el-scrollbar wrap-style="height: calc(667px - 60px);" style="height: calc(100% - 60px - 26px)">
        <main style="min-height: calc(667px - 60px); position: relative;">
          <v-editor />
          <!-- <div v-if="globalConfig.supportVal" style="text-align: center; font-size: 12px;">{{globalConfig.supportVal}}提供技术支持</div> -->
        </main>
      </el-scrollbar>
      <footer-bar
        v-model="footerConfig.list"
        :color="config.color"
        :active="selected.uuid === footerConfig.uuid"
        @click="handleSelect(footerConfig)"
      />
    </div>
    <aside style="background: #fff; width: 400px;">
      <div style="display: flex; justify-content: space-between; padding: 20px; align-items: center; border-bottom: 1px solid #ddd; margin-bottom: 10px;">
        <span>配置</span>
        <el-button type="primary" text @click="handleDelete" :disabled="!['freeCouponCard', 'btnMenu'].includes(selected.type)">删除</el-button>
      </div>
      <el-scrollbar wrap-style="height: 700px; padding: 20px;">
        <v-config />
      </el-scrollbar>
    </aside>
  </main>
</template>

<script lang="ts" setup>
import VEditor from '@/layout/editor.vue'
import widgets from '@/layout/widgets.vue'
import VConfig from '@/layout/config.vue'
import { ref } from 'vue';
const mainRef = ref()
const selected = ref({} as any)
const config = {} as any
const globalConfig = { share: {} } as any
const footerConfig = {} as any
const data = ref([{ uuid: 1 }])

function handleDelete(data: any) {
  return;
}
function handleSelect(data: any) {
  selected.value = data
}
function handleOutside({ target }: Event) {
  if (target === mainRef.value) {
    selected.value = {}
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
  background: #fff;
  flex: 0 0 375px;
  height: 695px;
  border: 8px solid #222;
  border-radius: 10px;
  .header {
    width: 375px;
    background-image: url('http://club.liantuobank.com/imgPath/club-open/1554278245739.png');
    height: 26px;
    position: relative;
    & > span {
      position: absolute;
      top: 18px;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 1;
    }
  }
}
.main-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
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
