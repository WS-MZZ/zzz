<template>
  <el-form ref="forgetPassword" :model="forgetPasswordForm" :rules="loginRules" class="fp-form" auto-complete="on" label-position="left">
    <div class="fp-form-wrapper">
      <div class="title-container">
        <h3 class="title">
          找回密码
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="forgetPasswordForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="20"
        >
          <svg-icon slot="prefix" icon-class="user" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input
          ref="email"
          v-model="forgetPasswordForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="2"
          auto-complete="on"
        >
          <i slot="prefix" class="el-input__icon el-icon-folder" style="padding-left: 8px" />
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-col :span="16">
          <el-input
            ref="code"
            v-model="forgetPasswordForm.code"
            class="verify-code"
            placeholder="验证码"
            name="code"
            type="text"
            tabindex="3"
            auto-complete="on"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock" style="padding-left: 8px" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button v-if="count === 60" type="primary" style="width:100%;" @click="getCode">获取验证码</el-button>
          <el-button v-else type="primary" disabled style="width:100%;">{{ count }}s</el-button>
        </el-col>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="forgetPasswordForm.password"
          :type="passwordType"
          placeholder="新密码"
          name="password"
          tabindex="4"
          auto-complete="on"
          maxlength="20"
        >
          <svg-icon slot="prefix" icon-class="password" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-form-item prop="rePassword">
        <el-input
          :key="passwordType"
          ref="rePassword"
          v-model="forgetPasswordForm.rePassword"
          :type="passwordType"
          placeholder="重复新密码"
          name="password"
          tabindex="5"
          auto-complete="on"
          maxlength="20"
        >
          <svg-icon slot="prefix" icon-class="password" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:22px;" @click.native.prevent="submit">提交</el-button>
      <el-link type="primary" class="tips" @click="showLoginForm">
        前往登录
      </el-link>
    </div>

  </el-form>
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

