<template>
  <div style="border: 1px solid #ccc; z-index: 10;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      v-bind="$attrs"
      @on-created="onCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IToolbarConfig, DomEditor } from '@wangeditor/editor';
import { shallowRef, onBeforeUnmount } from 'vue';

const editorRef = shallowRef<IDomEditor>();

// onMounted(() => {

// })

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'blockquote',
    'code',
    'fontFamily',
    'codeBlock',
    'group-indent',
  ],
};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      customUpload: async (file: File, insertFn: any) => {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        const url = await window.microApp?.getData()?.upload?.({ file });
        insertFn(url);
      },
    },
  },
};
const mode = 'default';

onBeforeUnmount(() => {
  editorRef.value?.destroy?.();
});

async function onCreated (editor: IDomEditor) {
  editorRef.value = editor;
}
</script>
