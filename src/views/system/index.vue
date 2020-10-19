<template>
  <div v-if="authMap.system.sysConfiguration.show" class="dashboard-container" style="overflow:scroll;height:100%">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="logo：">
          <ImgUpload
            class="imgUpload"
            :width="400"
            :height="200"
            :image="form.logo"
            url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
            @onSuccess="dealUpload($event, 'logo')"
          />
          <span>建议尺寸：400*200</span>
        </el-form-item>
        <el-form-item label="侧边栏logo：">
          <ImgUpload
            class="imgUpload"
            :width="400"
            :height="200"
            :image="form.leftLogo"
            url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
            @onSuccess="dealUpload($event, 'leftLogo')"
          />
          <span>建议尺寸：300*50</span>
        </el-form-item>
        <el-form-item label="登录背景图：">
          <ImgUpload
            class="imgUpload"
            :width="1920"
            :height="1080"
            :image="form.backgroundUrl"
            url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
            @onSuccess="dealUpload($event, 'backgroundUrl')"
          />
          <span>建议尺寸：1920*800</span>
        </el-form-item>
        <el-form-item label="网页标题：" prop="title">
          <el-input v-model="form.title" size="middle" style="width: 300px" maxlength="50" />
        </el-form-item>
        <el-form-item label="favicon：">
          <ImgUpload
            class="imgUpload"
            :width="20"
            :height="20"
            img-width="50px"
            img-height="50px"
            :image="form.favicon"
            url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
            @onSuccess="dealUpload($event, 'favicon')"
          />
          <span>建议尺寸：20*20</span>
        </el-form-item>
        <el-form-item label="footer：" prop="footer">
          <el-input v-model="form.footer" size="middle" maxlength="100" />
        </el-form-item>
        <div class="but">
          <el-button :loading="loading" type="primary" size="middle" @click="submit">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import ImgUpload from './modules/imgUpload'
import { updateSystemConfig, getSystemConfig } from '@/api/system'
import { mapGetters } from 'vuex'

export default {
  name: 'SystemConfig',
  components: {
    ImgUpload
  },
  data() {
    return {
      loading: false,
      form: {
        logo: '',
        backgroundUrl: '',
        favicon: '',
        footer: '',
        title: '',
        leftLogo: ''
      },
      logo: '',
      leftLogo: '',
      backgroundUrl: '',
      favicon: '',
      rules: {

      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'systemConfig',
      'userInfo',
      'authMap'
    ])
  },
  created() {
    if (this.authMap && this.authMap.system.sysConfiguration.show) {
      this.form = { ...this.systemConfig }
      console.log(this.form)
    }
  },
  methods: {
    submit() {
      console.log('from', this.form)
      this.loading = true
      updateSystemConfig(this.form).then(res => {
        this.loading = false
        this.$message({
          message: '提交成功',
          type: 'success'
          // onClose: () => {
          //   window.location.reload()
          // }
        })
      }).then(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    dealUpload(url, from) {
      this.form[from] = url
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      /*padding: 15px;*/
      // height: 100%;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      background-color: #fff;
      display: flex;
      // height: 100%;
      padding-bottom: 20px;
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
