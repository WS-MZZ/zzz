<template>
  <div class="components-container">
    <pan-thumb
      :image="image"
      :width="imgWidth"
      :height="imgHeight"
      :borderRadius="borderRadius"
      @click.native="imagecropperShow = true"
      :style2 = "true"
    />

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="width"
      :height="height"
      :url="url"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  name: 'ImgUpload',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      borderRadius: '5px'
    }
  },
  props: {
    // 剪裁图片的宽
    width: {
      type: Number,
      default: 200
    },
    // 剪裁图片的高
    height: {
      type: Number,
      default: 200
    },
    imgWidth: {
      type: String,
      default: '120px'
    },
    imgHeight: {
      type: String,
      default: '120px'
    },
    // 上传地址
    url: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  methods: {
    click() {
      console.log(111)
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.url
      this.$emit('onSuccess', resData.url)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

