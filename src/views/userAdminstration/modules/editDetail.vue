<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form :model="form" :inline="true" :rules="rules" class="demo-form-inline" label-width="100px" :label-position="labelPosition">
        <el-form-item label="账号" prop="user">
          <el-input v-model="form.user" size="middle" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色" class="selectStyle">
            <el-option label="角色一" value="shanghai" />
            <el-option label="角色二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" size="middle" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department" size="middle" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" size="middle" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.jobNumber" size="middle" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" size="middle" />
        </el-form-item>
        <el-form-item label="英文名">
          <el-input v-model="form.englishName" size="middle" />
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="form.email" size="middle" />
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
import { userEditDetail } from '@/api/userAdminstration'
export default {
  name: 'EditDetail',
  data() {
    return {
      id: Number,
      form: {
        user: '',
        role: '',
        password: '',
        username: '',
        phone: '',
        englishName: '',
        email: '',
        department: '',
        jobNumber: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 6 到 20 个字母', trigger: 'blur' }
        ],
        password: { required: true, message: '请输入登录密码', trigger: 'blur' },
        username: { required: true, message: '请输入姓名', trigger: 'blur' },
        email: { required: true, message: '请输入邮箱', trigger: 'blur' },
        role: { required: true, message: '请选择角色', trigger: 'change' }
      },
      labelPosition: 'right'
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.$route.query.types === 'edit') {
      this.userEditDetails()
    }
  },
  methods: {
    userEditDetails() {
      userEditDetail(this.id).then(response => {
        console.log('编辑详情', response)
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    // 提交
    onSubmit() {}
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
  .demo-form-inline{
      width: 800px;
  }
  .selectStyle{
      width:185px;
  }
  .btnStyle{
      text-align: center;
  }
</style>
