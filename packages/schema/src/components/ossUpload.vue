<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :http-request="customRequest"
    >
      <div
        v-if="imageUrl"
        class="image-preview"
      >
        <img
          :src="imageUrl"
          class="avatar"
          :style="imgStyle"
        >
        <div class="image-operate">
          <ElIcon
            @click.stop="handlePreview"
          >
            <IconZoomIn />
          </ElIcon>
          <ElIcon
            @click.stop="handleRemove"
          >
            <IconDelete />
          </ElIcon>
        </div>
      </div>
      <el-icon
        v-else
        class="avatar-uploader-icon"
        :style="imgStyle"
      >
        <Plus />
      </el-icon>
    </el-upload>
    <el-dialog v-model="show">
      <img
        style="width: 100%;"
        :src="previewUrl"
        alt="Preview Image"
      >
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Delete as IconDelete, ZoomIn as IconZoomIn, Plus } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import type { UploadRequestOptions } from 'element-plus'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  width: {
    type: String,
    default: undefined,
  },
  height: {
    type: String,
    default: undefined,
  },
  httpRequest: {
    type: Function as PropType<any>,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: '',
  },
})
const show = ref(false)
const previewUrl = ref('')
const imgStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
  }
})
const imageUrl = computed<string>({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
const uploadRequest: any = window.microApp?.getData()?.upload ?? noop
function noop() {
  /* empty */
}
async function customRequest(data: UploadRequestOptions) {
  const res = await uploadRequest(data)
  imageUrl.value = res
}
const handlePreview = () => {
  show.value = true
  previewUrl.value = imageUrl.value
}
const handleRemove = () => {
  imageUrl.value = ''
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
.image-preview {
  position: relative;
  &:hover .image-operate {
    opacity: 1;
  }
}
.image-operate {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  column-gap: 20px;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 34px;
}
</style>

<style>
.avatar-uploader .mpd-upload {
  border: 1px dashed var(--mpd-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--mpd-transition-duration-fast);
}

.avatar-uploader .mpd-upload:hover {
  border-color: var(--mpd-color-primary);
}

.mpd-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
