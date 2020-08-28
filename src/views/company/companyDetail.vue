<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="企业名称：">
          <el-input v-model="form.name" size="middle"></el-input>
        </el-form-item>
        <el-form-item label="logo：">
          <el-upload class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系人：" prop="email">
          <el-input v-model="form.email" size="middle"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="mobile">
          <el-input v-model="form.mobile" size="middle"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.name" size="middle"></el-input>
        </el-form-item>
        <el-form-item label="有效期至：">
          <el-date-picker v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <div class="but">
          <el-button type="primary" @click="submit" size="middle">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'companyDetail',
    components:{},
    computed: {},
    data() {
      return {
        form: {

        },
        rules: {

        },
        dialogImageUrl: "",
        dialogVisible: false
      }
    },
    methods: {
      submit(){
        this.$router.back(-1);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
</style>
