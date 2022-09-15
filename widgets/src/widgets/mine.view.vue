<template>
  <div class="mine-preview" :style="style">
    <el-image
      v-if="config.defaultImg"
      style="width: 100%; height: 100%;"
      :src="config.defaultImg"
    />
    <div
      v-if="config.unbound"
      class="mine-unbound"
    >解绑</div>
    <div
      v-if="config.recharge"
      class="mine-recharge"
    >充值</div>
  </div>
</template>

<script lang="ts" setup>
import { useNormalizeStyle } from '@/hooks';
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const style = useNormalizeStyle(props.config.style)
</script>

<style scoped lang="scss">
.mine-preview {
  position: relative;
  margin: 0 auto;
  .mine-unbound {
		position: absolute;
		top: 0;
		right: 0;
		color: #fff;
		padding: 18px;
		font-size: 13px;
  }
  .mine-recharge {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 70px;
		height: 30px;
		border-top-left-radius: 32px;
		border-bottom-right-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #994D1E;
		font-size: 15px;
		background: linear-gradient(180deg, #CEBE4D, #D6CA8B);
  }
}
</style>
