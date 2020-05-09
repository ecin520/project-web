<template lang="html">
<div class="editor">
  <div ref="toolbar" class="toolbar">
  </div>
  <div ref="editor" class="text">
  </div>
</div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editoritem',
  data() {
    return {
      editor: null,
      info_: null,
      isChange: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function (value) {
      if (!this.isChange) {
        this.editor.txt.html(this.value)
      }
      this.isChange = false;
    }
  },
  mounted() {
    this.init()
    this.editor.txt.html(this.value)
  },
  methods: {
    init() {
      let that = this
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = false
      this.editor.customConfig.uploadImgServer = 'http://www.pytap.com:8081//fileUpload/imageUpload'
      this.editor.customConfig.uploadImgHeaders = {
        'Content-Type': 'multipart/form-data'
      }
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024
      this.editor.customConfig.uploadImgMaxLength = 6
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.customUploadImg = function (files, insert) {

        let formdata = new FormData();
        formdata.append('file', files[0]);
        that.$axios({
          url: 'http://www.pytap.com:8081//fileUpload/imageUpload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response)
          insert(response.data)
        });
      }
      this.editor.customConfig.onchange = (html) => {
        this.isChange = true;
        this.info_ = html
        this.$emit('change', this.info_)
      }
      this.editor.create()
    }
  }
}
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}

.toolbar {
  border: 1px solid #ccc;
  flex-wrap: wrap;
}

.text {
  border: 1px solid #ccc;
  height: 300px;
}
</style>
