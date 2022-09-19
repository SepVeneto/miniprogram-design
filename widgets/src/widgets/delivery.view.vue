<template>
  <div class="card" :style="{ background: '#fff' }">
    <img :src="config.icon">
    <div style="flex-grow: 1">
      <div class="title">送餐预定</div>
      <div class="tips">预定后就餐时段内送达</div>
    </div>
    <div style="flex-shrink: 1">
      <div class="btn" :style="{ color: '#222' }">
        立即预定
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px 16px;
  display: flex;
  border-radius: 16px;
  align-items: center;
  width: 345px;
  img {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    margin-right: 24px;
  }
  .title {
    font-size: 15px;
    font-weight: 500;
    color: #333333;
    line-height: 21px;
  }
  .tips {
    font-size: 13px;
    font-weight: 400;
    color: #6a6a6a;
    line-height: 18px;
  }
  .btn {
    width: 78px;
    box-shadow: 0px 2px 16x 0px rgba(236, 255, 213, 0.5);
    border-radius: 18px;
    border: 1px solid currentColor;
    font-size: 13px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>