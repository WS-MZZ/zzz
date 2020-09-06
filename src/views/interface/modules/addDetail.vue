<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="140px" :rules="rules">
        <el-form-item label="应用名称：">
          <el-input v-model="form.name" size="middle" />
        </el-form-item>
        <el-form-item label="Appid：" prop="appId">
          <el-input v-model="form.appId" size="middle" />
        </el-form-item>
        <el-form-item label="Appsecret：" prop="appSecret">
          <el-input v-model="form.appSecret" size="middle" />
        </el-form-item>
        <el-form-item label="账套配置：">
          <el-input v-model="form.sysEnterpriseIdList" size="middle" />
        </el-form-item>
        <el-form-item label="每分钟访问限制：">
          <el-input v-model="form.maxLimit" size="middle" />
          <el-radio v-model="radio" label="1">无限制</el-radio>
        </el-form-item>
        <el-form-item label="logo：">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          />
        </el-form-item>
        <div class="but">
          <el-button type="primary" size="middle" :loading="loading" @click="submit">提交</el-button>
          <el-button size="middle" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import { addApplication, updateApplication, getSysApplication } from '@/api/applications'

export default {
  name: 'AddDetail',
  components: {},
  data() {
    return {
      form: {
        appId: '',
        appSecret: '',
        maxLimit: '',
        name: '',
        remark: '',
        sysEnterpriseIdList: ''
      },
      rules: {
        appId: [{ required: true, message: '请输入appId', trigger: 'blur' }],
        appSecret: [{ required: true, message: '请输入appSecret', trigger: 'blur' }]
      },
      radio: '',
      loading: false,
      types: 'add',
      id: null
    }
  },
  computed: {
    typeObj() {
      return {
        types: this.types = this.$route.query.types,
        api: this.types === 'edit' ? updateApplication : addApplication,
        msg: this.types === 'edit' ? '编辑成功' : '新增成功',
        id: this.types === 'edit' ? this.$route.query.id : null
      }
    }
  },
  watch: {
    id(newValue) {
      getSysApplication(this.typeObj.id).then(res => {
        console.log(res.data)
        this.form = res.data
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
      })
    }
  },
  mounted() {
    if(this.$route.query.types === 'edit') {
      this.id = this.$route.query.id
    }
  },
  methods: {
    submit() {
      console.log(this.typeObj)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.typeObj.api(this.form).then(res => {
            this.loading = false
            this.cancel()
            this.$message({
              message: this.typeObj.msg,
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$router.back(-1)
      this.id = null
      this.types = 'add'
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

