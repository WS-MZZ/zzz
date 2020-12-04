<template>
  <div>
    <el-dialog :visible="visible" class="dialog-dialog" title="帐套配置" width="45%" @close="cancle">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :titles="['可选择企业', '已选择企业']"
        :button-texts="['加入左边', '加入右边']"
        :data="data"
        @change="handleChange"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancle">取消</el-button>
        <el-button type="primary" :loading="loading" size="small" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable prefer-const */
import { getEnterpriseListOfApp, updateApplication } from '@/api/applications'
import { mapGetters } from 'vuex'
export default {
  name: 'BuyDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      value: [],
      loading: false,
      allEnterpriseIdList: [],
      application: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ])
  },
  created() {
    if (this.authMap && this.authMap.interface.applicationEdit.show) {
      this.getEnterpriseListOfApp()
    }
  },
  methods: {
    getEnterpriseListOfApp(params) {
      getEnterpriseListOfApp(params).then(res => {
        console.log('params', res)
        this.allEnterpriseIdList = res.allEnterpriseIdList
        this.data = res.allEnterpriseIdList.map((item, index) => {
          return {
            key: item.id,
            label: item.name,
            disabled: item.status === 'FREEZE' && item.isExpired === false
          }
        })
        if (res.selectEnterpriseIdList) {
          this.value = res.selectEnterpriseIdList.map((item, index) => {
            return item.id
          })
        } else {
          this.value = []
        }
      })
    },
    showLoadedList(application, isEdit) {
      this.getEnterpriseListOfApp({ id: application.id })
      if (!isEdit) {
        this.application = application
      }
    },
    confirm() {
      if (this.application) {
        this.application.sysEnterpriseIdList = this.value
        updateApplication(this.application).then(res => {
          console.log(res)
          this.$emit('updateLinkedEnterprises')
        })
      } else {
        let linkedEnterprises = this.allEnterpriseIdList.filter((item, index) => {
          return this.value.indexOf(item.id) !== -1
        })
        this.$emit('updateLinkedEnterprises', linkedEnterprises)
      }

    },
    cancle() {
      this.$emit('update:visible', false)
    },
    clear() {

    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-transfer__buttons {
    .el-button{
      display: block;
    }
    .el-button+.el-button{
      margin-left: 0;
      width: 117px;
    }
  }
</style>
