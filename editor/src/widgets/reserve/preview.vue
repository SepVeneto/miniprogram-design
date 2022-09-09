<template>
  <div :style="style">
    <div v-if="config.defaultImg" style="position: relative;">
      <el-image
        style="width: 100%; height: 100%;"
        :src="config.defaultImg"
      />
      <div class="reserve_con">
        <div class="text_side">
          <div class="title" :style="config.title.style">{{ config.title.content }}</div>
          <div class="desc" :style="config.desc.style">{{ config.desc.content }}</div>
        </div>
      </div>
    </div>
    <div v-else style="width: 100%; height: 100%;">empty</div>
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

<style lang="scss" scoped>
.reserve_con {
	position: absolute;
	width: 40%;
	height: 100%;
	top: 0;
	right: 0;
	.text_side{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.title{
			color: #FF9171;
			font-size: 16px;
			line-height: 1.5;
		}
		.desc{
			font-size: 13px;
			color: #848484;
		}
	}
}
</style>
