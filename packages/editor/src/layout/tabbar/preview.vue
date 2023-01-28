<template>
  <footer class="tabbar">
    <div
      class="footer-container"
      :class="[{ 'is-active': active }, { 'is-preview': preview }]"
    >
      <ul>
        <li
          v-for="(item, index) in configList"
          :key="item._uuid"
          class="bottom-nav-item"
          @click="handleSelect(item.type)"
        >
          <div class="li_content">
            <div class="bottom-cmg">
              <img
                :src="route.name === item.type ? item.activeImage : item.inactiveImage"
                alt=""
              >
            </div>
            <span
              class="bottom-text1"
              :style="{ color: route.name === item.type ? item.activeColor : '' }"
            >{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// import homeIconInactive from './assets/sy_icon_sy_sel.png';
// import homeIconActive from './assets/sy_icon_active_sy_sel.png';
// import myIconInactive from './assets/my_icon_sy_sel.png';
// import myIconActive from './assets/my_icon_active_sy_sel.png';
import { ref, computed, PropType } from 'vue';
import type { TabbarWidgetConfig } from './type';
import { useApp } from '@/store';
import { useRoute, useRouter } from 'vue-router';
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
// const app = useApp();
const configList = computed(() => {
  const _list = props.config.list ?? [];
  return _list;
});
// const tabbarType = ref();
function handleSelect (type: string) {
  router.replace({ name: type });
  // app.currentRoute = type;
  // app.currentTab = configList.value[index];
  // tabbarIdx.value = index;
  // tabbarType.value = type;
}
</script>

<style lang="scss" scoped>
.tabbar {
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
</style>
