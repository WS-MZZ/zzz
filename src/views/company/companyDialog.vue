<template>
  <div>
    <el-dialog :visible="visible" class="dialog-dialog" title="编辑企业信息" width="600px" @close="cancle">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="logo：" prop="logoUrl">
          <ImgUpload
            class="imgUpload"
            :width="400"
            :height="200"
            :image="form.logoUrl"
            url="https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1"
            @onSuccess="dealUpload"
          />
          <el-input v-model="form.logoUrl" style="display: none;" />
        </el-form-item>
        <el-form-item label="企业名称：" prop="name">
          <el-input v-model="form.name" size="middle" />
        </el-form-item>
        <el-form-item label="联系人信息：" prop="contact">
          <el-input v-model="form.contact" size="middle" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancle">取消</el-button>
        <el-button type="primary" :loading="loading" size="small" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './modules/imgUpload'
import { updateCorpInfo } from '@/api/user'

export default {
  name: 'CompanyDialog',
  components: {
    ImgUpload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    corpInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      text: '建议尺寸：400*200',
      rules: {
        logoUrl: [
          { required: true, message: '', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系信息不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    corpInfo() {
      this.form = { ...this.corpInfo }
    }
  },
  created() {
    // 从父级获取企业信息显示在表单里
    this.form = { ...this.corpInfo }
  },
  methods: {
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          updateCorpInfo(this.form).then(res => {
            this.loading = false
            this.$message({
              message: '提交成功',
              type: 'success',
              onClose: () => {
                this.$router.go(0) // 这里如果不刷新页面，也可以emit到父级去改变企业信息
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancle() {
      this.form = { ...this.corpInfo }
      this.$emit('update:visible', false)
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    dealUpload(url) {
      this.form.logoUrl = url
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-transfer__buttons {
    .el-button{
      display: block;
    }
    .el-button+.el-button{
      margin-left: 0;
      width: 117px;
    }
  }
</style>
