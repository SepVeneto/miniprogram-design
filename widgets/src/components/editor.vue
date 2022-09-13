<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { v4 as uuidv4 } from 'uuid';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import OSS from 'ali-oss'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      eidtorId: uuidv4(),
      editor: null,
      // html: '<p>hello</p>',
      toolbarConfig: {
        // customUploadImg: this.customUploadImg,
      },
      editorConfig: { placeholder: '请输入内容...', MENU_CONF: {} },
      mode: 'default', // or 'simple'
    };
  },
  created() {
    this.editorConfig.MENU_CONF['uploadImage'] = {
      // 自定义上传
      customUpload: async (file, insertFn) => {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        const res = await window.microApp?.getData()?.upload?.(file)
        insertFn(res.url);
      },
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    uploadFile(file) {
      return this.uploadOss({ file })
    },
    async uploadOss(fileData) {
      const { file } = fileData
      // 获取参数信息
      const {data:{save_path, credentials_data}} = await this.$api.uploadOssData({name:file.name})

      // 上传到oss
      const client = new OSS(credentials_data)
      const result = await client.put(save_path , file);
      // 上传-OSS上传保存
      const prama = {
        name: file.name,
        size: file.size,
        mime: file.type,
        url: result.url,
        md5: result.res.headers.etag,
      }
      return this.uploadOssSave(prama)
    },

    // 上传-OSS上传保存
    async uploadOssSave(prama) {
      const { code, msg, data } = await this.$api.uploadOssSave(prama)
      if (code == 0) {
        return data
      } else {
        this.$message.error(msg)
      }
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>
