<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div v-if="false" class="breadcrumb-container" style="margin-left: 30%">
      <p style="margin: 0">{{ currentEnterprise }}
        <el-dropdown class="avatar-container" trigger="click" placement="bottom-end">
          <span style="cursor: pointer;color: #20a0ff;">[切换企业]</span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown" style="overflow: hidden;width: 300px;">
            <el-dropdown-item v-for="(item, index) in enterpriseList" @click.native="changeEnterprise(index, item)">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </p>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <img v-else src="@/assets/user.svg" class="user-avatar">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/personalInfo">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <a target="_blank" href="">
            <el-dropdown-item>更换皮肤</el-dropdown-item>
          </a>
          <a @click="showChangePass">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="showChangePassForm" :before-close="cancel" width="30%">
      <div class="changePassword">
        <el-form ref="changePassword" :model="password" :rules="rules" label-width="150px">
          <el-form-item label="密码" prop="oldPassword">
            <el-input v-model="password.oldPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="password.newPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="重复新密码密码" prop="confirmPassword">
            <el-input v-model="password.confirmPassword" type="password" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getEnterpriseList, changeEnterprise } from '@/api/enterprise'
import { changePassword } from '@/api/user'
import { setToken } from '@/utils/auth'
import { validPassword } from '@/utils/validate'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码只可以包括数字和字母，不小于6位'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value !== this.password.newPassword) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      enterpriseList: [],
      currentEnterprise: '',
      showChangePassForm: false,
      password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateRePassword }]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'corpId',
      'userInfo'
    ])
  },
  created() {
    getEnterpriseList().then(res => {
      if (res[0]) {
        this.$store.commit('enterprise/SET_CORP_ID', res[0].id)
      }
      if (Array.isArray(res)) {
        this.enterpriseList = res
        this.currentEnterprise = res[0].name
      }
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changeEnterprise(index, item) {
      this.currentEnterprise = item.name
      changeEnterprise(item.id).then(res => {
        setToken(res.id_token)
        window.location.href = '/'
      })
    },
    showChangePass() {
      this.showChangePassForm = true
    },
    submit() {
      this.$refs.changePassword.validate(valid => {
        if (valid) {
          this.loading = true
          this.password.id = this.userInfo.id
          changePassword(this.password).then(res => {
            this.loading = false
            this.cancel()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    cancel() {
      this.showChangePassForm = false
      this.resetForm('changePassword')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  /*overflow: hidden;*/
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 60px;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50px;
          vertical-align: middle;
        }
        .name {
          vertical-align: middle;
          margin-left: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
