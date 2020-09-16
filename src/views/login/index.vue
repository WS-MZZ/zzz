<template>
  <div class="login-container-1" :style="{'background': background, backgroundSize:'100% 100%'}">
    <el-form v-if="!forgetPassword" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="login-form-wrapper">
        <div class="title-container">
          <h3 class="title">
            <img :src="systemConfig.logo ? systemConfig.logo : defaultLogo" alt="">
          </h3>
        </div>

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            maxlength="20"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <svg-icon slot="prefix" icon-class="user" class="svg-icon kg-icon" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            maxlength="20"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="svg-icon kg-icon" />
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class="kg-icon" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:22px;" @click.native.prevent="handleLogin">登录</el-button>
        <div style="text-align: center">
          <a type="primary" class="tips" @click="gotoForgetPassword">
            忘记密码?
          </a>
        </div>

      </div>

    </el-form>
    <forget-password v-else v-on:showLoginForm="showLoginForm" />
  </div>
</template>

<script>
import { validUsername, validPassword } from '@/utils/validate'
import ForgetPassword from '@/views/login/ForgetPassword'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    ForgetPassword
  },
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
    const defaultBg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599651220829&di=e0cddae088501e12a2e44ad15f9fc4dd&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D2782670685%2C3677123616%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1000%26h%3D667'
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
      redirect: undefined,
      forgetPassword: false,
      defaultLogo: 'https://developer.chilunyc.com/static/media/logo-2.d93e61a1.svg'
    }
  },
  computed: {
    ...mapGetters([
      'systemConfig'
    ]),
    background() {
      if (this.systemConfig.backgroundUrl) {
        return "url('" + this.systemConfig.backgroundUrl + "') no-repeat 100%"
      } else {
        return "url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599651220829&di=e0cddae088501e12a2e44ad15f9fc4dd&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D2782670685%2C3677123616%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1000%26h%3D667') no-repeat center"
      }
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
    },
    gotoForgetPassword() {
      this.forgetPassword = true
    },
    showLoginForm() {
      this.forgetPassword = false
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */
.login-container-1 {
  .el-input {
    display: inline-block;

    input {
      background: transparent;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 40px;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0 1000px $cursor inset !important;
      // }
    }
  }

  .el-form-item {
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$cursor: #fff;
/* reset element-ui css */

.login-container-1 {
  background-size: 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background: rgba(255, 255, 255, 0);
    ::v-deep .el-input {
      display: inline-block;
      background: rgba(255, 255, 255, 0.1);
      .el-input__inner {
        color: #FFFFFF;
      }
      .el-input__inner:focus {
        border-color: initial;
      }

      input {
        background: transparent;
        -webkit-appearance: none;
        border-radius: 4px;
        border: 1px solid #FFFFFF;
        padding: 12px 5px 12px 40px;
      }
      input:-internal-autofill-previewed,
      input:-internal-autofill-selected {
          -webkit-text-fill-color: #FFFFFF !important;
          transition: background-color 5000s ease-in-out 0s !important;
          border-color: #ffffff;
      }
    }
  }
  .login-form-wrapper {
    // background: rgba(255, 255, 255, 1);
    padding: 20px;
    margin-bottom: 10px;
  }

  .tips {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 10px;
    font-weight: bold;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .svg-icon {
    margin-left: 10px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .kg-icon {
    color: #ffffff;
  }
}

</style>
