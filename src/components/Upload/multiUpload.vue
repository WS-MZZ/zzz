<template> 
  <div>
    <el-upload
      ref="fileUpload"
      class="upload-demo"
      :action="uploadUrl()"
      :accept="'image/*'"
      list-type="picture-card"
      :multiple="true"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :on-exceed="handleExceed" style="padding-bottom: 30px" drag>
    <i class="el-icon-upload"></i>
    <!--<i class="el-icon-plus"></i>-->
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>
<script>
  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      //:limit="maxCount"
      maxCount:{
        type:Number,
        default:8
      }
    },
    data() {
      return {
        path: null,
        url: null,
        dialogVisible: false,
        dialogImageUrl:null,
        //fileList:[],
        resultFileList:[]
      };
    },
    // created(){
    //     for(let i=0;i<this.value.length;i++){
    //       this.fileList.push({url:this.value[i]});
    //       this.resultFileList.push({url:this.value[i]});
    //     }
    // },
    computed:{
      fileList(){
        let list = []
        for(let i=0;i<this.value.length;i++){
          list.push({url:this.value[i]});
          this.resultFileList.push({url:this.value[i]});
        }
        return list;
      }
    },
    methods: {
      uploadUrl(){
        return process.env.BASE_API+"/api/file/v1";
      },
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        if(file && file.status === "success"){
            let list = []
            for(let i = 0, len = this.resultFileList.length; i < len; i ++){
                if(this.resultFileList[i].url !== file.url){
                    list.push(this.resultFileList[i])
                }
            }
            this.resultFileList = Object.assign({}, list)
        }
        console.log(this.resultFileList)
        this.emitInput(this.resultFileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      beforeUpload(file) {
        let reg = new RegExp(".gif" + "$");   
        if(reg.test(file.name)){
          this.$message({
            message: '不支持gif格式的文件',
            type: 'error',
            duration:1500
          });
          return false;
        }
      },
      handleUploadSuccess(res, file) {
        // for(let i=0;i<this.$refs.fileUpload.uploadFiles.length;i++){
        //   this.url=this.$refs.fileUpload.uploadFiles[this.$refs.fileUpload.uploadFiles.length-1].response.data.url;
        let fileName=this.$refs.fileUpload.uploadFiles[this.$refs.fileUpload.uploadFiles.length-1].name;
        //   let has=false;
        //   for(let j=0;j<this.fileList.length;j++){
        //     if(this.fileList[j].url===this.url){
        //       has=true;
        //       break;
        //     }
        //   }
        //   if(!has){
            //this.fileList.push({name: fileName, url: this.url});
            this.resultFileList.push({name: fileName, url: file.response.data.url});
        //   }
        // }
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>
.el-upload--picture-card{
  line-height: normal !important;
}
</style>


