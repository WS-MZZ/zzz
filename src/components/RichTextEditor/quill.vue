<template>
  <div class="quill-editor-example">
    <!-- quill-editor -->
    <quill-editor
      ref="quillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import FileUploaderForQuill from "./FileUploaderForQuill.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
/* eslint-disable */
import { quillEditor } from "vue-quill-editor";

let uploader;
let imageHandlerOptions = {
  API_URL: process.env.BASE_API + "/api/file/v1",
  UPLOAD_PATH: "/richTextEditor"
};

const toolbarContainer = [
  [
    {
      header: [1, 2, false]
    }
  ],
  [
    "bold",
    {
      color: []
    }
  ],
  ["link", "image", "video"]
];

export default {
  name:"quill",
  props:{
    value: String
  },
  components: {
    quillEditor
  },
  data() {
    return {
      name: "quill",
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarContainer,
            handlers: {
              image: function() {
                uploader.handle("image");
              },
              video: function() {
                uploader.handle("video");
              }
            }
          }
        }
      }
    };
  },
  methods: {
    onEditorBlur(editor) {
      //console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      //console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      //console.log("editor ready!", editor);
    },
    onEditorChange(editor){
      //this.content = this.$refs.quillEditor.quill.container.innerHTML
      this.$emit("input", this.$refs.quillEditor.quill.container.innerHTML)
    }
  },
  computed: {
    editor: function(){
      return this.$refs.quillEditor.quill
    }
  },
  mounted() {
    uploader = new FileUploaderForQuill(this.editor, imageHandlerOptions);
    //设置html
    if(this.value){
      this.content = this.value
    }else{
      this.editor.root.innerHTML = "<p>to insert something...</p>"
    }
  }
};
</script>
