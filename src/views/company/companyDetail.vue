<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="企业名称：" prop="name">
          <el-input v-model="form.name" size="middle" />
        </el-form-item>
        <el-form-item label="logo：" prop="logoUrl">
          <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input v-model="form.contact" size="middle" />
        </el-form-item>
        <el-form-item label="账号：" prop="accountNo">
          <el-input v-model="form.accountNo" size="middle" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码：" prop="password">
          <el-input type="password" v-model="form.password" size="middle" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email" size="middle" />
        </el-form-item>
        <el-form-item label="手机号：" prop="mobilePhone">
          <el-input v-model="form.mobilePhone" size="middle" />
        </el-form-item>
        <el-form-item label="有效期至：" prop="expireDate">
          <el-date-picker
            v-model="form.expireDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <div class="but">
          <el-button :loading="loading" type="primary" size="middle" @click="submit">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

// import regexps from '@/utils/regexps'
import { createEnterprise, updateEnterprise, getEnterpriseDetail } from '@/api/enterprise'

export default {
  name: 'CompanyDetail',
  components: {},
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        name: [
          { message: '请输入名称', trigger: 'blur', required: true }
        ],
        contact: [
          { message: '请输入联系人', trigger: 'blur', required: true }
        ],
        accountNo: [
          { message: '请输入账号', trigger: 'blur', required: true }
        ],
        password: [
          { message: '请输入密码', trigger: 'blur', required: true }
        ],
        email: [
          { message: '请输入邮箱', trigger: 'blur', required: true }
        ],
        mobilePhone: [
          { message: '请输入手机号', trigger: 'blur', required: true }
        ],
        expireDate: [
          { message: '请输入截止日期', trigger: 'blur', required: true }
        ]

      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    isEdit() {
      return this.$route.query.types === 'edit'
    }
  },
  created() {
    if (this.$route.query.types === 'edit') {
      getEnterpriseDetail(this.$route.query.id).then(res => {
        this.form = res
      })
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          let changeRequest
          if (this.$route.query.types === 'add') {
            changeRequest = createEnterprise
          } else if (this.$route.query.types === 'edit') {
            changeRequest = updateEnterprise
          }
          changeRequest(this.form).then(res => {
            this.$message({
              message: '成功',
              type: 'success',
              onClose: () => {
                this.$router.push({
                  path: '/company'
                })
              }
            })
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  .upload{
    ::v-deep .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 82px;
    }
  }
</style>
