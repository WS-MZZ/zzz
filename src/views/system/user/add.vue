<template>
    <div class="form-container" shadow="never">
       <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px" >
            <el-form-item label="用户名：" prop="username" >
                <el-input v-model="userForm.username" placeholder="请输入用户名" width="300"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="userForm.phone" placeholder="请输入手机号" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="userForm.email" placeholder="请输入邮箱" ></el-input>
            </el-form-item>
            <el-form-item label="头像：" prop="avatar">
                <single-img-upload v-model="userForm.avatar"/>
            </el-form-item>
            <el-form-item label="角色：">
                <el-checkbox-group v-model="userForm.roleNames">
                    <el-checkbox v-for="role in roles" :label="role.name" :key="role.id" name="roleNames"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="冻结：" prop="frozen">
                <el-switch v-model="userForm.frozen"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import user from '@/api/system/user'
  import SingleImgUpload from '@/components/Upload/singleImgUpload'
  export default {
    components: {
      SingleImgUpload
    },
    data() {
      return {
        roles:[],
        userForm: {
            username:'',
            phone:'',
            email:'',
            avatar:'',
            roleNames: [],
            frozen: true
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          email:[
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    created(){
        this.getRoleList()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let $this = this
            user.addUser(this.userForm).then(res => {
                this.$router.push({ path: '/user/list' });
            }).catch(err => {
                $this.$message.error('新增失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getRoleList(){
          user.getRoleList().then(response => {
              if(response.code === 200){
                  this.roles = response.data
              }else{
                  console.log(response)
              }
          }).catch(err => {
              console.log(err)
          })
      },
      cancel(){
          this.$router.push({ path: '/system/user/list' });
      }
    }
  }
</script>