<template>
  <main id="menus">
    <div class="menu-swarps" style="position: relative" :style="style">
      <div v-for="itemchild in list" :key="itemchild.id">
        <div
          class="menu-item"
          :style="{
            width: itemchild.width + 'px',
            height: itemchild.height + 'px',
            backgroundColor: itemchild.backgroundColor,
            padding: 16 + 'px',
            marginBottom: itemchild.marginBottom + 'px',
          }"
        >
          <div class="menu-title">
            {{ itemchild.title }}
          </div>
          <div class="menu-desc">{{ itemchild.desc }}</div>
          <img class="menu-img" :src="itemchild.defaultImg" alt="" />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useNormalizeStyle } from '@/hooks';
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
});
const style = useNormalizeStyle(props.config.style);
const list = computed(() => {
  return props.config.childrens;
});
</script>

<style lang="scss" scoped>
#menus {
  .menu-swarps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // overflow: hidden;
    position: relative;
    justify-content: center;
    .menu-item {
      box-sizing: border-box;
      text-align: center;
      transition: all 0.3s;
      .menu-title {
        font-size: 17px;
        font-weight: 600;
      }
      .menu-desc {
        font-size: 14px;
      }
      .menu-img {
        width: 80%;
        height: 80px;
        margin-top: 20px;
        object-fit: cover;
        object-position: 50% 20%;
      }
    }
  }
}
</style>
