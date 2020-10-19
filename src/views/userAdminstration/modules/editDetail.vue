<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" :rules="rules" class="demo-form-inline" label-width="100px" :label-position="labelPosition">
        <el-form-item label="账号" prop="accountNo">
          <el-input v-model="form.accountNo" size="middle" @blur="changeInfo" />
        </el-form-item>
        <el-form-item label="角色" prop="sysRoleIdList">
          <el-select v-model="form.sysRoleIdList" multiple placeholder="请选择角色" class="selectStyle" @change="$forceUpdate()">
            <el-option v-for="(item,index) of formRole" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="showPassword" label="登录密码" prop="password">
          <el-input v-model="form.password" size="middle" type="password" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department" size="middle" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" size="middle" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.workNo" size="middle" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobilePhone" size="middle" />
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="form.englishName" size="middle" />
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="form.email" size="middle" :disabled="disabled" />
        </el-form-item>
        <div class="btnStyle">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button size="middle" @click="cancel">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userEditDetail, editUserInfo, addUser, getAccountnoInfo, getRoleSelect, addOldUser } from '@/api/userAdminstration'
var checkEmail = (rule, value, callback) => {
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
export default {
  name: 'EditDetail',
  data() {
    return {
      id: Number,
      form: {
        accountNo: '',
        password: '',
        username: '',
        mobilePhone: '',
        englishName: '',
        sysRoleIdList: [],
        email: '',
        department: '',
        workNo: '',
        id: this.$route.query.id
      },
      rules: {
        user: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 6 到 20 个字母', trigger: 'blur' }
        ],
        accountNo: { required: true, message: '请输入账号', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        username: { required: true, message: '请输入姓名', trigger: 'blur' },
        email: { required: true, validator: checkEmail, trigger: 'blur' },
        sysRoleIdList: { required: true, message: '请选择角色', trigger: 'change' }
      },
      labelPosition: 'right',
      formRole: [],
      disabled: false,
      showPassword: true,
      validateFieldsForAdd: []
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.$route.query.types === 'edit') {
      this.userEditDetails(this.$route.query.id)
      this.showPassword = false
    } else {
      this.showPassword = true
    }
    this.roleSelect()
  },
  methods: {
    userEditDetails(id) {
      userEditDetail(id).then(response => {
        console.log('编辑详情', response)
        this.form = response
        this.form.sysRoleIdList = []
        const testList = []
        response.sysRoleDetailVMList.forEach(item => {
          testList.push(item.id)
        })
        this.form.sysRoleIdList = testList
        // this.form.sysRoleIdList.push(response.sysRoleDetailVMList[0].id)
        // this.form.sysRoleIdList = response.sysRoleDetailVMList[0].id
      })
    },
    // 监听账号联级
    changeInfo() {
      // if (this.$route.query.types === 'add') {
      //   this.AccountnoInfo(this.form.accountNo)
      // }
    },
    // AccountnoInfo(accountNo) {
    //   if (accountNo === '' || null) {
    //     return
    //   } else {
    //     getAccountnoInfo(accountNo).then(res => {
    //       if (res === '' || null) {
    //         this.disabled = true
    //         this.showPassword = true
    //       } else {
    //         this.showPassword = false
    //         this.form = res
    //         console.log('hhh', res)
    //         this.form.sysRoleIdList = []
    //         this.form.sysRoleIdList.push(res.sysRoleDetailVMList[0].id)
    //         this.disabled = true
    //       }
    //     }).catch(err => {
    //       console.log(err)
    //       this.showPassword = true
    //     })
    //   }
    // },
    // 角色下拉框
    roleSelect() {
      getRoleSelect().then(res => {
        console.log('角色', res)
        this.formRole = res.data
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit() {
      if (this.showPassword === false) {
        this.$refs.form.rules = {
          user: [
            { required: true, message: '请输入账号名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 6 到 20 个字母', trigger: 'blur' }
          ],
          accountNo: { required: true, message: '请输入账号', trigger: 'blur' },
          username: { required: true, message: '请输入姓名', trigger: 'blur' },
          email: { required: true, validator: checkEmail, trigger: 'blur' },
          sysRoleIdList: { required: true, message: '请选择角色', trigger: 'change' }
        }
      } else {
        this.$refs.form.rules = {
          user: [
            { required: true, message: '请输入账号名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 6 到 20 个字母', trigger: 'blur' }
          ],
          accountNo: { required: true, message: '请输入账号', trigger: 'blur' },
          password: { required: true, message: '请输入密码', trigger: 'blur' },
          username: { required: true, message: '请输入姓名', trigger: 'blur' },
          email: { required: true, validator: checkEmail, trigger: 'blur' },
          sysRoleIdList: { required: true, message: '请选择角色', trigger: 'change' }
        }
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          let changeRequest
          if (this.$route.query.types === 'edit') {
            changeRequest = editUserInfo
          } else {
            changeRequest = addUser
          }
          changeRequest(this.form).then(res => {
            this.$message({
              message: '成功',
              type: 'success',
              onClose: () => {
                this.$router.push({
                  path: '/user'
                })
              }
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 监听下拉
    test(val) {
      console.log('val', val)
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
  .el-form{
    margin-top: 30px;
  }
  .demo-form-inline{
      width: 400px;
  }
  .el-select{
    width: 100%;
  }
  .btnStyle{
      text-align: center;
  }
</style>
