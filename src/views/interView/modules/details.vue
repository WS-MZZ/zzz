<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="title">新增接口发票</div>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="访问应用：">
                <span>{{ form.account }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问结果：">
                <span>{{ form.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问时间：" prop="email">
                <span>{{ form.email }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="ip地址：" prop="mobile">
                <span>{{ form.mobile }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问时长：">
                <span>{{ form.number }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--      </div>-->
      <!--      <div class="bottom">-->
      <div class="title">参数</div>
      <el-table ref="table" :height="tableHeight" :data="tableData" :border="showTable" style="width: 100%">
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

export default {
  name: 'InterViewDetails',
  components: { },
  data() {
    return {
      form: {},
      tableHeader: [
        {
          prop: 'corpId',
          label: '字段名'
          // width: '160'
        },
        {
          prop: 'name',
          label: '字段名备注'
          // width: '160'
        },
        {
          prop: 'name',
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
  computed: {},
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
  },
  methods: {
    calculateTableHeight() {
      const tableOffsetTop = this.$refs.table.$el.offsetTop
      return window.innerHeight - tableOffsetTop - 155
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
</style>
