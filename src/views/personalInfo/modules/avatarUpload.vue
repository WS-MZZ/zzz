<template>
  <div class="components-container">
    <pan-thumb :image="image" />

    <el-button type="primary" icon="el-icon-upload" style="margin: 0 auto;display: block;" @click="imagecropperShow=true">
      更换头像
    </el-button>

    <image-cropper v-show="imagecropperShow" :key="imagecropperKey" :width="300" :height="300"
                   url="https://httpbin.org/post" lang-type="zh" @close="close" @crop-upload-success="cropSuccess"/>
  </div>
</template>

<script>
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
  export default {
    name: 'avatarUpload',
    components: { ImageCropper, PanThumb },
    data() {
      return {
        imagecropperShow: false,
        imagecropperKey: 0,
        image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
      }
    },
    methods: {
      cropSuccess(resData) {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
        this.image = resData.files.avatar
      },
      close() {
        this.imagecropperShow = false
      }
    }
  }
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
