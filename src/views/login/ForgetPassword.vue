<template>

</template>

<script>
import { validUsername, validPassword, validEmail } from '@/utils/validate'
import { getVerificationCode, submitNewPassword } from '@/api/user'

export default {
  name: 'ForgetPassword',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名只可以包括数字字母和汉字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码只可以包括数字和字母，不小于6位'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      const mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码缺失'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value !== this.forgetPasswordForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      forgetPasswordForm: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        rePassword: [{ required: true, trigger: 'blur', validator: validateRePassword }]

      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      count: 60
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    submit() {
      this.$refs.forgetPassword.validate(valid => {
        if (valid) {
          this.loading = true
          const submitForm = {
            confirmPassword: this.forgetPasswordForm.rePassword,
            email: this.forgetPasswordForm.email,
            newPassword: this.forgetPasswordForm.password,
            validCode: this.forgetPasswordForm.code
          }
          submitNewPassword(submitForm).then(response => {
            this.loading = false
            this.$message({
              message: '提交成功',
              type: 'success',
              onClose: () => {
                this.$emit('showLoginForm')
              }
            })
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode() {
      this.$refs.forgetPassword.validateField('email', errMsg => {
        if (errMsg) {
          console.log('邮箱错误')
        } else {
          this.countDownCode()
          getVerificationCode({ email: this.forgetPasswordForm.email }).catch(() => {
            alert('验证码发送失败请重试')
            clearInterval(this.countDown)
            this.count = 60
          })
        }
      })
    },
    countDownCode() {
      this.countDown = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          clearInterval(this.countDown)
          this.count = 60
        }
      }, 1000)
    },
    showLoginForm() {
      this.$emit('showLoginForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.fp-form {
  ::v-deep .el-input {
    input:-webkit-autofill {
        box-shadow: 0 0 0 1000px #ffffff inset !important;
    }
  }
}
.fp-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 230px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
  z-index: 999;
}
.fp-form-wrapper {
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  margin-bottom: 10px;
}
.tips {
  font-size: 14px;
  color: #409EFF;
  margin-bottom: 10px;
  font-weight: bold;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}
.title-container {
  position: relative;

  .title {
    font-size: 26px;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
.svg-icon {
  margin-left: 10px;
}
.el-form-item {
  margin-bottom: 18px;
}
.verify-code {
  width: 98%;
}
</style>

