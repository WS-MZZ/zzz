<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="账号：">
      <span>{{ form.accountNo }}</span>
    </el-form-item>
    <el-form-item label="姓名：" prop="username">
      <el-input v-if="isEdit" v-model="form.username" size="small" maxlength="20"/>
      <span v-else>{{ form.username }}</span>
    </el-form-item>
    <el-form-item label="邮件：" prop="email">
      <el-input v-if="isEdit" v-model="form.email" size="small" />
      <span v-else>{{ form.email }}</span>
    </el-form-item>
    <el-form-item label="手机号：" prop="mobilePhone">
      <el-input v-if="isEdit" v-model="form.mobilePhone" size="small"/>
      <span v-else>{{ form.mobilePhone }}</span>
    </el-form-item>
    <el-form-item label="工号：">
      <span>{{ form.workNo }}</span>
    </el-form-item>
    <el-form-item label="英文名：">
      <el-input v-if="isEdit" v-model="form.englishName" size="small"/>
      <span v-else>{{ form.englishName }}</span>
    </el-form-item>
    <el-form-item label="部门：">
      <span>{{ form.department }}</span>
    </el-form-item>
    <el-form-item label="角色：">
      <span>{{ form.role }}</span>
    </el-form-item>
    <div class="but">
      <div v-if="isEdit">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </div>
      <el-button v-else type="primary" :disabled="isDisable" @click="edit">修改个人信息</el-button>
    </div>
  </el-form>
</template>

<script>
import regexps from '@/utils/regexps'
import { mapGetters } from 'vuex'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'PersonalDetails',
  comments: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        username: [
          { message: '请输入姓名', trigger: 'change', required: true }
        ],
        email: [
          { pattern: regexps.email, message: '请输入正确的邮箱', trigger: 'blur', required: true }
        ],
        mobilePhone: [
          { pattern: regexps.mobile, message: '请输入正确的手机号', trigger: 'blur', required: true }
        ]

      },
      form: '',
      isDisable: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.form = { ...this.userInfo }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateUserInfo(this.form).then(res => {
            this.$emit('submit', false)
            this.isDisable = true
            this.$message({
              message: '提交成功',
              type: 'success',
              onClose: () => {
                this.$router.go(0)
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$refs.form.resetFields()
      this.$emit('submit', false)
    },
    edit() {
      this.$emit('submit', true)
    }
  }
}
</script>

<style>
.el-form-item__error {
  position: initial;
}
</style>

<style lang="scss" scoped>
  .el-form{
    width: 80%;
    margin-left: 40px;
    margin-top: 30px;
    .el-form-item{
      margin-bottom: 5px;
    }
    .but{
      .el-form-item__content{
        margin-left: 0 !important;
      }
    }
    .el-input{
      max-width: 235px;
    }
  }
</style>
