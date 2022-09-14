<template>
  <div
    :style="style" 
    @dragover="onDragover"
  >
    <div v-if="config.defaultImg" style="position: relative;">
      <el-image
        style="width: 100%; height: 100%;"
        :src="config.defaultImg"
      />
      <widget-wrapper
        class="title"
        :style="config.title.style"
        v-model:custom-style="_config.title.style"
      >
        <span>{{config.title.content}}</span>
      </widget-wrapper>
      <!-- <div class="reserve_con">
        <div class="text_side">
          <div class="title" :style="config.title.style">{{ config.title.content }}</div>
          <div class="desc" :style="config.desc.style">{{ config.desc.content }}</div>
        </div>
      </div> -->
    </div>
    <div v-else style="width: 100%; height: 100%;">empty</div>
  </div>
</template>

<script lang="ts" setup>
import { useNormalizeStyle } from '@/hooks';
import widgetWrapper from '@/components/widgetWrapper.vue'
import { computed } from 'vue';
const emit = defineEmits(['update:config'])
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const _config = computed({
  get() {
    return props.config
  },
  set(val) {
    emit('update:config', val)
  }
})
const style = useNormalizeStyle(props.config.style)
function onDragover(evt: DragEvent) {
  evt.preventDefault()
}
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
		.desc{
			font-size: 13px;
			color: #848484;
		}
	}

}
.title{
	color: #FF9171;
	font-size: 16px;
	line-height: 1.5;
  top: 0;
  left: 0;
}
</style>
