<template> 
  <div style="width:50%;margin-left: auto;margin-right: auto;padding-top:30px">
    <el-steps :active="active" simple finish-status="success">
      <el-step title="输入帐号"></el-step>
      <el-step title="手机号验证"></el-step>
      <el-step title="重置密码"></el-step>
    </el-steps>
    <div v-show="active===0" style="width:60%;margin-left: auto;margin-right: auto;padding-top:50px">
      <el-form label-position="left" label-width="80px" style="width:350px">
        <el-form-item label="用户名：">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width:270px" type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="active===1" style="width:60%;margin-left: auto;margin-right: auto;padding-top:50px">
      <el-form label-position="left" label-width="80px" style="width:350px">
        <el-form-item label="手机号：">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input style="width:150px" v-model="verificationCode"></el-input>
          <el-button style="width:110px;padding:10px 10px" type="primary" @click="sendcode" :disabled="disabled" v-if="disabled==false" plain >获取验证码</el-button>
          <el-button style="width:110px;padding:10px 10px" type="primary" @click="sendcode" :disabled="disabled" v-if="disabled==true" plain >{{btntxt}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:270px" type="primary" @click="next">立即重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="active===2" style="width:60%;margin-left: auto;margin-right: auto;padding-top:50px">
      <el-form label-position="left" label-width="80px" style="width:350px">
        <el-form-item>
          <el-button style="width:270px" type="primary" @click="next">立即重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="active===3" style="width:100%;margin-left: auto;margin-right: auto;padding-top:50px">
      <div style="width:20%;margin-left: auto;margin-right: auto;padding-top:50px">
        <el-progress type="circle" :percentage="100" status="success"></el-progress>
      </div>
      <div style="width:32%;margin-left: auto;margin-right: auto;padding-top:50px">
         <el-alert title="重置成功，即将返回登录页面..." type="success" :closable="false"></el-alert>
      </div>
    </div>
  </div>  
  
</template>

<script>
  import user from '@/api/system/user'
  export default {
     data() {
      return {
        active: 0,
        username:'',
        phone:'',
        verificationCode:'',
        disabled: false,
        time: 0,
        btntxt: "重新发送"
      };
    },

    methods: {
      next() {
        if(this.active === 0){
          if(this.username === ''){
            this.$message({ message: '请输入用户名', type: 'error', center: true });
            return
          }
          this.active = 1
        }else if(this.active === 1){
          user.resetMyPwd(this.username, this.verificationCode).then(response => {
            this.active = 3
            setTimeout(() => {
              this.backToLogin()
            }, 2000);
          }).catch(err => {
            this.$message({ message: '重置失败，请稍后重试', type: 'error', center: true });
          })
        }else{
          this.active = 0
        }
      },
      backToLogin(){
        const loading = this.$loading({
          lock: true,
          text: '正在返回登录页...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          this.$router.push({ path: '/' })
        }, 2000);
      },
      //60S倒计时 
      timer(){
          if (this.time > 0) {
              this.time--;
              this.btntxt = this.time + "s后重新获取";
              setTimeout(this.timer, 1000);
          }
          else {
              this.time = 0;
              this.btntxt = "获取验证码";
              this.disabled = false;
          }
      },
      sendcode(){
          const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (this.phone == '') {
              this.$message({ message: '手机号不能为空', type: 'error', center: true });
              return;
          }
          if (!reg.test(this.phone)) {
              this.$message({ message: '请输入正确的手机号', type: 'error', center: true });
              return;
          } else {
              user.sendAuthenticationSms(this.username, this.phone).then(response => {
                this.$message({ message: '发送成功', type: 'success', center: true });
              }).catch(err => {
                this.$message({ message: '发送失败，请稍后重试', type: 'error', center: true });
              })

              this.time = 60;
              this.disabled = true;
              this.timer();
          }
      }

    }
  }
</script>