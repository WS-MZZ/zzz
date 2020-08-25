<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>

    </transition>
    
      <!-- 模态框 -->
    <el-dialog :visible.sync="dialogVisible" :title="'修改密码'">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="原密码">
          <el-input type="password" placeholder="请输入密码" v-model="oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" placeholder="请输入密码" v-model="newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" placeholder="请输入密码" v-model="newPassword2"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;" />
        <el-button type="primary" @click=updatePassword>确定</el-button>
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>      
  </el-dialog>  
    
  </section>
</template>

<script>

import { login, updatePassword } from '@/api/login'
import store from '@/store'

export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  data(){
    return {
      dialogVisible: false,
      id: 3,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    }
  },
  mounted(){
    // 订阅
    PubSub.subscribe('passwordForm',(event,data)=>{
        this.dialogVisible=data.dialogVisible;
    }),
    PubSub.subscribe(id,(event,data)=>{
        this.id=data.id;
    })
  },
  methods:{
   updatePassword(){
        if(this.newPassword !== this.newPassword2){
            this.$message({
                  message: '两次输入的密码不一致',
                  type: 'error'
                });
            return;
        }
        //调用ajax发送的方法得到返回结果
        let $this = this
        updatePassword(this.oldPassword, this.newPassword).then(response=>{
            //判断结果是否成功
            if(response.message === 'success') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                store.dispatch('FedLogOut').then(() => {
                  this.$router.push({ path: '/' });
                })
            }
            this.dialogVisible = false
        }).catch(function( err ){
            $this.$message({
                  message: '请确认原密码是否正确',
                  type: 'error'
                });
        })
    }
  }


}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
