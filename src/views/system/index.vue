<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="logo：">
          <ImgUpload class="imgUpload" :width="400" :height="200" />
          <span>建议尺寸：400*200</span>
        </el-form-item>
        <el-form-item label="登录背景图：">
          <ImgUpload class="imgUpload" :width="1920" :height="800" />
          <span>建议尺寸：1920*800</span>
        </el-form-item>
        <el-form-item label="网页标题：" prop="email">
          <el-input v-model="form.email" size="middle" />
        </el-form-item>
        <el-form-item label="favicon：">
          <ImgUpload class="imgUpload" :width="20" :height="20" />
          <span>建议尺寸：20*20</span>
        </el-form-item>
        <el-form-item label="fooer：" prop="mobile">
          <el-input v-model="form.mobile" size="middle" />
        </el-form-item>
        <div class="but">
          <el-button type="primary" size="middle" @click="submit">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import ImgUpload from './modules/imgUpload'

export default {
  name: 'SystemConfig',
  components: {
    ImgUpload
  },
  data() {
    return {
      form: {

      },
      rules: {

      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {},
  methods: {
    submit() {
      this.$router.back(-1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      /*padding: 15px;*/
      height: 100%;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      background-color: #fff;
      display: flex;
      height: 100%;
      border-radius: 5px;
      padding-left: 50px;
      padding-top: 20px;
      .but{
        margin-left: 120px;
      }
    }
  }
  ::v-deep .pan-item{
    margin: 0 !important;
  }
  span{
    color: #999999;
  }
</style>
