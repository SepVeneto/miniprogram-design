<template>
  <footer class="tabbar">
    <div
      class="footer-container"
      :class="[{ 'is-active': active }, { 'is-preview': preview }]"
    >
      <ul>
        <li
          v-for="(item) in configList"
          :key="item._uuid"
          class="bottom-nav-item"
          @click="handleSelect(item.name)"
        >
          <div class="li_content">
            <div class="bottom-cmg">
              <img
                :src="route.name === item.name ? item.activeImage : item.inactiveImage"
                alt=""
              >
            </div>
            <span
              class="bottom-text1"
              :style="{ color: route.name === item.name ? item.activeColor : '' }"
            >{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="config.hidden"
      class="hide-mask"
    >
      <el-icon
        :size="40"
        color="#fff"
      >
        <Hide />
      </el-icon>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Hide } from '@element-plus/icons-vue';
import { computed, PropType } from 'vue';
import type { TabbarWidgetConfig } from './type';
import { useRoute, useRouter } from 'vue-router';
import { useApp } from '@/store';
const store = useApp();
const route = useRoute();
const router = useRouter();
const props = defineProps({
  preview: Boolean,
  active: Boolean,
  config: {
    type: Object as PropType<TabbarWidgetConfig>,
    default: () => ({
      list: [],
    }),
  },
});
const configList = computed(() => {
  const _list = props.config.list ?? [];
  return _list;
});
function handleSelect (type: string) {
  /**
   * TODO 全局拦截replace修改history
   */
  store.history = [];
  router.replace({ name: type });
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: relative;
  width: 375px;
  height: 50px;
  // padding: 0px 2px 2px 2px;
  box-sizing: border-box;
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .bottom-nav-item {
      flex: 1;
      text-align: center;
      cursor: pointer;
      .li_content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 10px;
        .bottom-cmg {
          position: relative;
          box-sizing: border-box;
          width: 25px;
          height: 25px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .bottom-text1 {
          width: 100%;
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.footer-container {
    background: #fff;
    // display: flex;
    // justify-content: space-around;
    z-index: 1;
    position: relative;
    width: 100%;
    height: 100%;
    &:hover::before, &.is-active::before {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      border: 1px dashed #4089ef;
      border-bottom-left-radius: 18px;
      border-bottom-right-radius: 18px;
      box-sizing: border-box;
    }
    &.is-preview:hover::before, &.is-active.is-preview::before {
      display: none;
    }
}
.hide-mask {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
