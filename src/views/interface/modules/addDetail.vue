<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-form ref="form" :model="form" label-width="140px" :rules="rules">
        <el-form-item label="应用名称：" prop="name">
          <el-input v-model="form.name" size="middle" />
        </el-form-item>
        <el-form-item label="Appid：" prop="appId">
          <el-input v-model="form.appId" size="middle" />
        </el-form-item>
        <el-form-item label="Appsecret：" prop="appSecret">
          <el-button @click="getAppsecret">生成密钥</el-button>
          <el-input v-if="isGenerated" v-model="form.appSecret" disabled size="small" />
        </el-form-item>
        <el-form-item label="账套配置：">
          <div>
            <el-tag v-for="item in sysEnterpriseIdList" :key="item.id" style="margin-right: 5px;">{{ item.name }}</el-tag>
          </div>
          <el-button @click="configEnterprise">配置</el-button>
        </el-form-item>
        <el-form-item label="每分钟访问限制：" prop="maxLimit" ref="ageForm">
          <el-input v-model="form.maxLimit" :disabled="noLimit" size="middle" />
          <el-checkbox v-model="noLimit" @change="tickNolimit">无限制</el-checkbox>
        </el-form-item>
        <el-form-item label="应用描述：">
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
    <BuyDialog
      ref="BuyDialog"
      :visible.sync="visible"
      @updateLinkedEnterprises="getLinkedEnterprises"
    />
  </div>
</template>

<script>

import { addApplication, updateApplication, getSysApplication, getAppsecret } from '@/api/applications'
import BuyDialog from './buyDialog'
import regexps from '@/utils/regexps'

export default {
  name: 'AddDetail',
  components: {
    BuyDialog
  },
  data() {
    const validateMaxLimit = (rule, value, callback) => {
      if (!this.noLimit && !value) {
        callback(new Error('请正确输入次数限制'))
      } else if (!/^[1-9][0-9]*$/.test(value) && !this.noLimit) {
        callback(new Error('请正确输入次数限制'))
      } else {
        callback()
      }
    }
    return {
      form: {
        appId: '',
        appSecret: '',
        maxLimit: '',
        name: '',
        remark: '',
        sysEnterpriseIdList: []
      },
      sysEnterpriseIdList: [],
      rules: {
        name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
        appId: [{ required: true, message: '请输入appId', trigger: 'blur' }],
        appSecret: [{ required: true, message: '请获取appSecret', trigger: 'blur' }],
        maxLimit: [{ message: '请正确输入次数限制', trigger: 'blur', validator: validateMaxLimit }]
      },
      noLimit: false,
      loading: false,
      types: 'add',
      id: null,
      visible: false,
      isGenerated: false
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
        this.form = res
        this.id = res.id
        this.sysEnterpriseIdList = this.form.sysEnterpriseIdList ? this.form.sysEnterpriseIdList : []
        this.noLimit = !this.form.maxLimit
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
      })
    }
  },
  mounted() {
    if (this.$route.query.types === 'edit') {
      this.id = this.$route.query.id
    }
  },
  methods: {
    submit() {
      this.form.sysEnterpriseIdList = this.sysEnterpriseIdList.map((item) => {
        return item.id
      })
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
          }).catch(err => {
            console.log(err)
            this.loading = false
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
    },
    configEnterprise() {
      if (this.id) {
        this.$refs.BuyDialog.showLoadedList(this.form, true)
      }
      this.visible = true
    },
    getLinkedEnterprises(linkedEnterprises) {
      this.sysEnterpriseIdList = linkedEnterprises
      this.visible = false
    },
    tickNolimit(val) {
      if (val) {
        this.form.maxLimit = ''
        const _field = this.$refs.form.fields /* 当然，你可以打印一下fields*/
        _field.map(i => {
          if (i.prop === 'maxLimit') { // 通过prop属性值相同来判断是哪个输入框，比如：要移除prop为'user'
            i.resetField()
            return false
          }
        })
      }
    },
    getAppsecret() {
      if (this.form.appId) {
        getAppsecret(this.form.appId).then(res => {
          const _field = this.$refs.form.fields
          _field.map(i => {
            if (i.prop === 'appSecret') { // 通过prop属性值相同来判断是哪个输入框
              i.resetField()
              return false
            }
          })
          this.isGenerated = true
          this.form.appSecret = res
        })
      } else {
        this.$message({
          type: 'error',
          message: 'appid为空'
        })
      }
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
  ::v-deep .el-transfer-panel {
    width:300px;
  }
</style>

