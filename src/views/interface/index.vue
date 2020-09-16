<template>
  <div>
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-select v-model="searchCondition.status" placeholder="状态" size="medium">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchCondition.name"
          size="medium"
          placeholder="请输入应用名称"
          class="search-input"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
        <el-button size="medium" @click="resetSearchCondition">重置</el-button>
      </div>
    </div>
    <div class="block-wrapper company-list">
      <div class="add">
        <el-button size="medium" type="primary" @click="add">新增应用</el-button>
      </div>
      <KgTable
        :total="total"
        :page-size="searchCondition.size"
        @pageChange="handleCurrentChange"
        @pageSizeChange="handleSizeChange"
      >
        <template v-slot:default="slotProps">
          <el-table
            v-loading="loading"
            :height="slotProps.tableHeight"
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{'background-color': 'rgba(250,250,250,1)', color: '#272727', 'font-weight': 400}"
          >
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
                <el-link v-if="item.prop == 'name'" style="color:#66b1ff" @click="detail(scope.row)">
                  {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
                </el-link>
                <el-link v-if="item.prop == 'sysEnterpriseCount'" style="color:#66b1ff" @click="company(scope.row)">
                  {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
                </el-link>
                <span v-if="item.prop != 'name' && item.prop != 'sysEnterpriseCount'">{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width=""
            >
              <template slot-scope="scope">
                <el-button class="mgr" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button class="mgr" v-if="scope.row.status==='FREEZE'" type="text" size="small" @click="activate(scope.row)">解冻</el-button>
                <el-button class="mgr" v-if="scope.row.status==='NORMAL'" type="text" size="small" @click="freeze(scope.row)">冻结</el-button>
                <el-button class="mgr" type="text" size="small" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </KgTable>
    </div>
    <BuyDialog ref="BuyDialog" :visible.sync="visible" @updateLinkedEnterprises="updateLinkedEnterprises" />
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'
import { getApplicationList, freezeApplication, unfreezeApplication, deleteApplication } from '@/api/applications'
import BuyDialog from './modules/buyDialog'

export default {
  name: 'Interface',
  components: {
    KgTable,
    BuyDialog
  },
  data() {
    return {
      tableHeight: 0,
      showTable: false,
      loading: false,
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '应用名称'
          // width: '160'
        },
        {
          prop: 'appId',
          label: 'Appid'
          // width: '160'
        },
        {
          prop: 'sysEnterpriseCount',
          label: '购套数量'
          // width: '160'
        },
        {
          prop: 'maxLimit',
          label: '每分钟访问限制'
          // width: '160'
        },
        {
          prop: 'status',
          label: '状态'
          // width: '160'
        },
        {
          prop: 'createdDate',
          label: '创建时间'
          // width: '160'
        },
        {
          prop: 'statusDesc',
          label: '到期时间'
          // width: '160'
        }
      ],
      input: '',
      statusValue: '',
      status: [{
        value: 'NORMAL',
        label: '正常'
      }, {
        value: 'FREEZE',
        label: '冻结'
      }],
      searchCondition: {
        name: '',
        page: '',
        size: 5,
        sort: 'DESC',
        status: '',
        sysEnterpriseId: ''
      },
      total: 0,
      visible: false
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'corpId'
  //   ])
  // },
  watch: {
    corpId: val => {
      this.searchCondition.sysEnterpriseId = val
      this.getApplicationList(this.searchCondition)
    }
  },
  created() {
    this.getApplicationList(this.searchCondition)
  },
  mounted() {
  },
  methods: {
    getApplicationList(searchCondition) {
      this.loading = true
      getApplicationList(searchCondition).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = parseInt(res.total)
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
        this.loading = false
      })
    },
    handleSizeChange(pageSize) {
      this.searchCondition.size = pageSize
      this.getApplicationList(this.searchCondition)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.searchCondition.page = currentPage
      this.getApplicationList(this.searchCondition)
    },
    search() {
      this.getApplicationList(this.searchCondition)
    },
    resetSearchCondition() {
      this.searchCondition.name = ''
      this.searchCondition.status = ''
    },
    add() {
      this.$router.push({
        path: '/inter/addDetail',
        query: {
          types: 'add'
        }
      })
    },
    detail(data) {
      console.log(data)
      this.$router.push({
        path: '/inter/interfaceDetail',
        query: {
          id: data.id
        }
      })
    },
    company(row) {
      console.log(row)
      this.visible = true
      this.$refs.BuyDialog.showLoadedList(row)
    },
    updateLinkedEnterprises() {
      this.getApplicationList(this.searchCondition)
      this.visible = false
    },
    handleClick(row) {
      this.$router.push({
        path: '/inter/addDetail',
        query: {
          types: 'edit',
          id: row.id
        }
      })
    },
    activate(row) {
      this.$confirm('确定要解冻 ' + row.name + ' 吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unfreezeApplication(row.id).then(res => {
          // console.log(res);
          this.$message({
            type: 'success',
            message: '解冻成功'
          })
          this.getApplicationList(this.searchCondition)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解冻'
        })
      })
    },
    freeze(row) {
      this.$confirm('确定要冻结 ' + row.name + ' 吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freezeApplication(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '冻结成功'
          })
          this.getApplicationList(this.searchCondition)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消冻结'
        })
      })
    },
    del(row) {
      this.$confirm('确定要删除 ' + row.name + ' 吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApplication(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getApplicationList(this.searchCondition)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .block-wrapper {
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
  }
  .table {
    &-search {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .search-input {
        width: 300px;
        margin-left: 10px;
      }
    }
  }
  .company-list {
    .add {
      margin-bottom: 10px;
    }
    .list-table {
      margin-bottom: 10px;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
    }
    .mgr {
      margin: 0;
      margin-right: 2px;
    }
  }
</style>
