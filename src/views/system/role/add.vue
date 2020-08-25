<template>
    <div class="form-container" shadow="never">
       <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="80px" >
            <el-form-item label="角色名：" prop="name" >
                <el-input v-model="roleForm.name" placeholder="请输入角色名" width="300"></el-input>
            </el-form-item>
            <el-form-item label="Code：" prop="code">
                <el-input v-model="roleForm.code" placeholder="请输入角色Code" ></el-input>
            </el-form-item>
            <el-form-item label="权限：">
                <el-checkbox-group v-model="roleForm.permissionNames">
                    <el-checkbox v-for="permission in permissions" :label="permission.name" :key="permission.id" name="permissionNames"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import role from '@/api/system/role'
  import SingleImgUpload from '@/components/Upload/singleImgUpload'
  export default {
    components: {
      SingleImgUpload
    },
    data() {
      return {
        permissions:[],
        roleForm: {
            name:'',
            code:'',
            permissionNames: []
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入角色Code', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
        this.getPermissionList()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let $this = this
            role.addRole(this.roleForm).then(res => {
                this.$router.push({ path: '/system/role/list' });
            }).catch(err => {
                $this.$message.error('新增失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getPermissionList(){
          role.getPermissions().then(response => {
              if(response.code === 200){
                  this.permissions = response.data
              }else{
                  console.log(response)
              }
          }).catch(err => {
              console.log(err)
          })
      },
      cancel(){
          this.$router.push({ path: '/system/role/list' });
      },
      convertPermission2Text(permission){
        let text = permission.name + '('
        if(permission.type === 'MENU'){
            text += '菜单)'
        }else{
            text += '操作)'
        }
        return text
      }
    }
  }
</script>