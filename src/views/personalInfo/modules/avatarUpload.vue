<template>
  <div class="components-container">
    <el-form label-width="80px" style="margin:30px 0 0 40px" label-position="right">
      <el-form-item label="头像：">
        <pan-thumb :image="image" @click.native="imagecropperShow=true" />
      </el-form-item>
    </el-form>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { updateAvatar } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'AvatarUpload',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    image() {
      return this.userInfo.logoUrl
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      let logoData = {
        id: this.userInfo.id,
        logoUrl: resData.url
      }
      updateAvatar(logoData).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success',
          onClose: () => {
            this.$router.go(0)
          }
        })
      })
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.components-container{
  width: 200px;
}
  .avatar{
    width: 200px;
    height: 200px;
  }
</style>
