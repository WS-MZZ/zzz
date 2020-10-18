<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="title">{{ form.name }}</div>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="访问应用：">
                <span v-if="authMap.interface.applicationDetail.show" :style="{ color: 'rgb(64, 158, 255)' }" class="hands" @click="detail(form.sysApplicationId)">
                  {{ form.sysApplicationName }}
                </span>
                <span v-else>
                  {{ form.sysApplicationName }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问结果：">
                <span>{{ form.resultDesc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问时间：">
                <span>{{ form.createTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="ip地址：" prop="mobile">
                <span>{{ form.ipAddress }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问时长：">
                <span>{{ form.costTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--      </div>-->
      <!--      <div class="bottom">-->
      <div class="title">参数</div>
      <el-table ref="table" :height="tableHeight" :data="tableData" :border="showTable" style="width: 100%" :row-class-name="errorStyle">
        <el-table-column
          v-for="(item) in tableHeader"
          :key="item.id"
          :align="item.align || 'left'"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="true"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import { getInterfaceRecord } from '@/api/applications'
import { mapGetters } from 'vuex'
export default {
  name: 'InterViewDetails',
  components: { },
  data() {
    return {
      form: {},
      tableHeader: [
        {
          prop: 'fieldKey',
          label: '字段名'
          // width: '160'
        },
        {
          prop: 'fieldName',
          label: '字段名备注'
          // width: '160'
        },
        {
          prop: 'fieldValue',
          label: '传参值'
          // width: '160'
        }
      ],
      tableData: [
        { corpId: 1 }
      ],
      tableHeight: 0,
      showTable: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap',
      'theme'
    ])
  },
  created() {
    window.onresize = () => {
      this.tableHeight = this.calculateTableHeight()
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = this.calculateTableHeight()
      this.showTable = true
    }, 0)
    if (this.$route.query.id) {
      this.recordId = this.$route.query.id
      this.getInterfaceRecord(this.recordId)
    }
  },
  methods: {
    calculateTableHeight() {
      const tableOffsetTop = this.$refs.table.$el.offsetTop
      return window.innerHeight - tableOffsetTop - 220
    },
    getInterfaceRecord(id) {
      getInterfaceRecord(id).then(res => {
        console.log(res.data)
        this.form = res
        this.tableData = res.paramList
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
      })
    },
    errorStyle(row, rowIndex) {
      if (row.row.fieldDesc) {
        return 'markRed'
      } else {
        return ''
      }
    },
    detail(enterPriseId) {
      this.$router.push({
        path: '/inter/interfaceDetail',
        query: {
          id: enterPriseId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      height: 100%;
      background-color: #fff;
      border-radius: 5px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      height: 100%;
      width: 95%;
      margin: 0 auto;
      padding-top: 20px;
        .el-form{
          margin-top: 10px;
          .el-form-item{
            margin-bottom: 5px;
          }
      }
      .title{
        font-size: 18px;
      }
    }
  }
  .hands {
    cursor: pointer;
  }
</style>
<style>
  .markRed {
    color: red !important;
  }
</style>
