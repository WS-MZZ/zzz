<template>
  <el-form ref="forgetPassword" :model="loginForm" :rules="loginRules" class="fp-form" auto-complete="on" label-position="left">
    <div class="fp-form-wrapper">
      <div class="title-container">
        <h3 class="title">
          找回密码
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <svg-icon slot="prefix" icon-class="user" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <svg-icon slot="prefix" icon-class="user" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-form-item prop="username">
        <el-col :span="16">
          <el-input
            ref="username"
            v-model="loginForm.username"
            class="verify-code"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <svg-icon slot="prefix" icon-class="user" class="svg-icon" />
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="width:100%;">获取验证码</el-button>
        </el-col>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="svg-icon" />
        </el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:22px;" @click.native.prevent="handleLogin">登录</el-button>
      <div class="tips" @click="">
        前往登录
      </div>
    </div>

  </el-form>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'ForgetPassword',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fp-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0)
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
  margin-bottom: 15px;
}
.verify-code {
  width: 98%;
}
</style>

