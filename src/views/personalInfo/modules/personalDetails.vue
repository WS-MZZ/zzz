<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="账号：">
      <span>{{form.account}}</span>
    </el-form-item>
    <el-form-item label="姓名：">
      <el-input v-model="form.name" v-if="isEdit"></el-input>
      <span v-else>{{form.name}}</span>
    </el-form-item>
    <el-form-item label="邮件：" prop="email">
      <el-input v-model="form.email" v-if="isEdit"></el-input>
      <span v-else>{{form.email}}</span>
    </el-form-item>
    <el-form-item label="手机号：" prop="mobile">
      <el-input v-model="form.mobile" v-if="isEdit"></el-input>
      <span v-else>{{form.mobile}}</span>
    </el-form-item>
    <el-form-item label="工号：">
      <span>{{form.number}}</span>
    </el-form-item>
    <el-form-item label="英文名：">
      <el-input v-model="form.enName" v-if="isEdit"></el-input>
      <span v-else>{{form.enName}}</span>
    </el-form-item>
    <el-form-item label="部门：">
      <span>{{form.department}}</span>
    </el-form-item>
    <el-form-item label="角色：">
      <span>{{form.role}}</span>
    </el-form-item>
    <div class="but">
      <el-button type="primary" v-if="isEdit" @click="submit">保存</el-button>
      <el-button type="primary" v-else @click="edit">修改个人信息</el-button>
    </div>
  </el-form>
</template>

<script>
  import regexps from "@/utils/regexps";

  export default {
    name: 'personalDetails',
    comments:{},
    computed: {},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rules: {
          email : [
            { pattern: regexps.email, message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          mobile : [
            { pattern: regexps.mobile, message: '请输入正确的手机号', trigger: 'blur' }
          ],

        },
        form:{
          account: "账号",
          name: "姓名",
          email: "邮件",
          mobile: "手机号",
          number: "工号",
          enName: "英文名",
          department: "部门",
          role: "角色"
        }
      }
    },
    methods:{
      submit(){
        this.$emit('submit', false);
      },
      edit() {
        this.$emit('submit', true);
      }
    }
  }
</script>

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
