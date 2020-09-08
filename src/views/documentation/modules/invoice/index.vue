<template>
  <div>
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-date-picker
          v-model="createRange"
          type="daterange"
          range-separator="至"
          start-placeholder="创建日期开始"
          end-placeholder="创建日期结束"
          size="small"
          style="width: 250px;"
        />
        <el-date-picker
          v-model="makeOutRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开票日期开始"
          end-placeholder="开票日期结束"
          size="small"
          style="margin-left: 20px; width: 250px;"
        />
        <el-input
          v-model="searchCondition.fullFiledName"
          size="medium"
          placeholder="请输入合同编号/公司名称"
          class="search-input"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
        <el-button size="medium" @click="resetSearchCondition">重置</el-button>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="config-column">
        <el-button
          style="margin-left: auto;margin-bottom: 10px;"
          type="primary"
          size="medium"
          @click="showColumnConfigDialog"
        >
          设置显示字段
        </el-button>
        <el-dialog title="设置显示字段" :visible.sync="dialogConfigColumnVisible" @close="cancelColumnSelection">
          <div class="filter-container">
            <el-checkbox-group v-model="columnChecked" class="filter-container">
              <el-checkbox v-for="item in columnList" :key="item.name" :label="item.name" :disabled="item.disable">
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelColumnSelection">取 消</el-button>
            <el-button type="primary" @click="changeColumnList">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <KgTable
        :total="total"
        :page-size="searchCondition.size"
        @pageChange="handleCurrentChange"
        @pageSizeChange="handleSizeChange"
      >
        <template v-slot:default="slotProps">
          <el-table
            ref="companyList"
            :height="slotProps.tableHeight"
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{'background-color': 'rgba(250,250,250,1)', color: '#272727', 'font-weight': 400}"
          >
            <el-table-column
              v-for="item in formThead"
              :key="item.name"
              :prop="item.prop"
              :label="item.name"
            >
              <template slot-scope="scope">
                <span v-if="item.prop == 'corpId'" style="color:#66b1ff" @click="detail(scope.row)">
                  {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
                </span>
                <span v-else>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </KgTable>
    </div>
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'
import { getInvoiceList, getInvoiceListColumnConfig } from '@/api/documentation'

export default {
  name: 'Invoice',
  components: {
    KgTable
  },
  data() {
    return {
      showTable: false,
      createRange: [],
      makeOutRange: [],
      columnList: [
        { name: '发票代码', disable: true, prop: 'code' },
        { name: '发票号码', disable: true, prop: 'no' },
        { name: '开票日期', disable: true, prop: 'makeOutDate' },
        { name: '发票状态', disable: true, prop: 'status' },
        { name: '发票校验码', disable: true, prop: 'validCode' },
        { name: '发票类型', disable: true, prop: 'type' },
        { name: '价税合计', disable: false, prop: 'totalAmount' },
        { name: '不含税金额', disable: false, prop: 'notTaxAmount' },
        { name: '税额', disable: false, prop: 'taxAmount' },
        { name: '发票备注', disable: false, prop: 'remark' },
        { name: '开票人', disable: false, prop: 'drawer' },
        { name: '收款人', disable: false, prop: '' },
        { name: '复核人', disable: false, prop: '' },
        { name: '购买客户编号', disable: false, prop: 'code' },
        { name: '购买方名称', disable: false },
        { name: '购买方纳税人识别号', disable: false },
        { name: '购买方开户行及账号', disable: false },
        { name: '购买方地址及电话', disable: false },
        { name: '销售订单号', disable: false },
        { name: '销方纳税人识别号', disable: false },
        { name: '销方银行及账号', disable: false },
        { name: '销方地址及电话', disable: false },
        { name: '电子发票pdfurl', disable: false },
        { name: '开票税率', disable: false },
        { name: '单据ID', disable: false },
        { name: '单据编号', disable: false },
        { name: '单据日期', disable: false },
        { name: '客户订单号', disable: false },
        { name: '公司编号', disable: false },
        { name: '门店编号', disable: false },
        { name: '单据类型', disable: false },
        { name: '采购订单号', disable: false },
        { name: '往来单位编号', disable: false },
        { name: '经办人信息', disable: false }
      ],
      columnShowed: ['发票代码', '发票号码', '开票日期', '发票状态', '发票校验码', '发票类型'],
      columnChecked: ['发票代码', '发票号码', '开票日期', '发票状态', '发票校验码', '发票类型'],
      oldColumnChecked: [],
      columnChanged: false,
      dialogConfigColumnVisible: false,
      tableData: [],
      total: 0,
      searchCondition: {
        createStartDate: '',
        createEndDate: '',
        makeOutStartDate: '',
        makeOutEndDate: '',
        page: '',
        size: 2,
        sort: 'DESC',
        fullFiledName: ''
      }
    }
  },
  computed: {
    formThead() {
      return this.columnShowed.map((item, index) => {
        return this.columnList.filter((item_, index_) => {
          if (item === item_.name) {
            return item_
          }
        })[0]
      })
    }
  },
  watch: {
    createRange(val) {
      this.searchCondition.createStartDate = val[0]
      this.searchCondition.createEndDate = val[1]
    },
    makeOutRange(val) {
      this.searchCondition.makeOutStartDate = val[0]
      this.searchCondition.makeOutEndDate = val[1]
    }
  },
  created() {
    this.getColumnConfig()
    this.getInvoiceList(this.searchCondition)
  },
  mounted() {
  },
  methods: {
    detail(data) {
      console.log(data)
      this.$router.push({
        path: '/inter/interfaceDetail',
        query: {
          id: data.id
        }
      })
    },
    getInvoiceList(searchCondition) {
      this.loading = true
      getInvoiceList(searchCondition).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = res.total
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
        this.loading = false
      })
    },
    handleSizeChange(pageSize) {
      this.searchCondition.size = pageSize
      this.getInvoiceList(this.searchCondition)
    },
    handleCurrentChange(currentPage) {
      this.searchCondition.page = currentPage
      this.getInvoiceList(this.searchCondition)
    },
    search() {
      this.getInvoiceList(this.searchCondition)
    },
    resetSearchCondition() {
      this.searchCondition.fullFiledName = ''
      this.createRange = []
      this.makeOutRange = []
    },
    getColumnConfig() {
      getInvoiceListColumnConfig().then(res => {
        console.log(res)
      })
    },
    showColumnConfigDialog() {
      this.oldColumnChecked = this.columnChecked.concat()
      this.dialogConfigColumnVisible = true
    },
    changeColumnList() {
      this.columnChanged = true
      this.columnShowed = this.columnChecked.concat()
      this.dialogConfigColumnVisible = false
    },
    cancelColumnSelection() {
      if (!this.columnChanged) {
        this.columnChecked = this.oldColumnChecked.concat()
      }
      this.dialogConfigColumnVisible = false
      this.columnChanged = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .documentTabs {
    margin-bottom: 10px;
  }
  .config-column {
    display: flex;
  }
  .filter-container {
    display: flex;
    flex-flow: column wrap;
    height: 200px;
  }
</style>
