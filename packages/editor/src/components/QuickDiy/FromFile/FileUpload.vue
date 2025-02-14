<template>
  <div style="display: flex; justify-content: center;">
    <ElUpload
      drag
      accept=".sketch"
      :auto-upload="false"
      :show-file-list="false"
      @change="onFile"
    >
      <el-icon class="el-icon--upload">
        <IconUploadFilled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </ElUpload>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, shallowRef } from 'vue'
import { UploadFilled as IconUploadFilled } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import sketch2json from 'sketch2json'

const formData = defineModel({
  type: Object as PropType<{ design: string, widgets: any[] }>,
  default: () => ({ design: '', widgets: [] }),
})
const file = shallowRef('')
console.log(file)

async function onFile(file: UploadFile) {
  const buffer = await file2arrayBuffer(file.raw!)
  const res = await sketch2json(buffer)
  const defaultPage = res.document.pages[0]
  const widgets = processSketch(res)
  console.log(widgets, res)
}

async function file2arrayBuffer(file: File) {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = (evt) => {
      resolve(evt.target?.result)
    }
    reader.onerror = (evt) => {
      reject(evt)
    }
    reader.readAsArrayBuffer(file)
  })
}

function processSketch(sketch: any) {
  const pages = {}
  Object.keys(sketch.pages).forEach(page => {
    const config = sketch.pages[page]
    pages[page] = convertLayout(config.layers[0].layers)
  })
  return pages
}

function convertLayout(layers: any[]) {
  return layers.filter(layer => layer.isVisible).map(layer => {
    const { x, y, width, height } = layer.frame
    const widget = {
      _uuid: layer.do_objectID,
      name: layer.name,
      style: {
        x,
        y,
        width,
        height,
      },
    }
    return widget
  })
}
</script>
