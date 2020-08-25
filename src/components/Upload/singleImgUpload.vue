<template> 
  <div>
    <el-upload
      class="single-img-uploader"
      :action="uploadUrl()"
      :show-file-list="false"
      :on-success="handleSingleImgSuccess"
      :on-error="handleSingleImgError"
      :before-upload="beforeSingleImgUpload"
      >
      <img v-if="initImg" :src="initImg" class="single-img">
      <i v-else class="el-icon-plus single-img-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
  import { deleteFile } from '@/api/file'
  export default {
    name: 'singleImgUpload',
    props: {
      //图片属性数组
      value: String,
      useUuid: {
        type: Boolean,
        default: true
      },
      replace: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        imageUrl: '',
        dataObj: {
          useUuid: this.useUuid,
          replace: this.replace
        },
      };
    },
    computed:{
      initImg: function(){
        return this.value
      }
    },
    methods: {
      uploadUrl(){
        return process.env.BASE_API + "/api/file/v1";
      },
      handleSingleImgSuccess(res, file) {
        if(this.imageUrl.length > 0){
          deleteFile(this.imageUrl).then(res => {
            console.info(res)
          })
        }
        this.imageUrl = res.data.url
        this.$emit('input', this.imageUrl)
      },
      handleSingleImgError(err){
        this.$message.error('文件上传失败!')
      },
      beforeSingleImgUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        return isJPG;
      }
    }
  }
</script>
<style>
  .single-img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .single-img-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .single-img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .single-img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


