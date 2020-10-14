<template>
  <div v-if="authMap.company.companyList.show">
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-select v-model="searchCondition.status" placeholder="状态" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchCondition.name"
          size="medium"
          placeholder="请输入企业名称/账号"
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
        <div v-if="authMap.company.companyAdd.show">
          <el-button size="medium" type="primary" @click="add">新增企业</el-button>
        </div>
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
            v-loading="loading"
            :height="slotProps.tableHeight"
            :data="tableData"
            border
            style="width: 100%"
            :cell-style="cellStyle"
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
                <div v-if="item.prop == 'status'">
                  {{ scope.row[item.prop] == 'NORMAL' ? '正常' : scope.row[item.prop] == 'FREEZE' ? '冻结' : scope.row[item.prop] == 'EXPIRE' ? '过期' : '' }}
                </div>
                <el-link v-else-if="item.prop == 'name' && authMap.company.companyMockLogin.show" style="color:#66b1ff" @click="detail(scope.row)">
                  {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
                </el-link>
                <el-image
                  v-else-if="item.prop == 'logoUrl'"
                  style="width: 100px; height: 50px"
                  :src="scope.row[item.prop]"
                />
                <!--     :fit="fit" -->
                <span v-else>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width=""
            >
              <template slot-scope="scope">
                <el-button v-if="authMap.company.companyEdit.show" class="mgr" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button v-if="scope.row.status==='FREEZE'" class="mgr" type="text" size="small" @click="activate(scope.row.id)">解冻</el-button>
                <el-button v-if="scope.row.status==='NORMAL'" class="mgr" type="text" size="small" @click="freeze(scope.row.id)">冻结</el-button>
                <el-button v-if="authMap.company.companyReset.show" class="mgr" type="text" size="small" @click="resetPass(scope.row.id)">重置密码</el-button>
                <el-button v-if="authMap.company.companyDelete.show" class="mgr" type="text" size="small" @click="deleteEnterprise(scope.row.id)">删除</el-button>
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
import { getSassEnterpriseList, activateEnterprise, freezeEnterprise, deleteEnterprise, resetEnterprisePass, getEnterToken } from '@/api/enterprise'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  name: 'Company',
  components: {
    KgTable
  },
  data() {
    return {
      showTable: false,
      loading: false,
      options: [{
        label: '正常',
        value: 'NORMAL'
      }, {
        label: '冻结',
        value: 'FREEZE'
      }, {
        label: '过期',
        value: 'EXPIRE'
      }],
      tableData: [],
      total: 0,
      searchCondition: {
        name: '',
        page: '',
        size: 5,
        sort: 'DESC'
      },
      tableHeader: [
        {
          prop: 'id',
          label: '企业ID'
          // width: '160'
        },
        {
          prop: 'logoUrl',
          label: 'logo'
          // width: '160'
        },
        {
          prop: 'name',
          label: '企业名称'
          // width: '160'
        },
        {
          prop: 'accountNo',
          label: '企业账号'
          // width: '160'
        },
        {
          prop: 'contact',
          label: '联系人'
          // width: '160'
        },
        {
          prop: 'expireDate',
          label: '到期时间'
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
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ])
  },
  created() {
    this.getEnterpriseList(this.searchCondition)
  },
  mounted() {
  },
  methods: {
    add() {
      this.$router.push({
        path: '/companyDetail',
        query: {
          types: 'add'
        }
      })
    },
    detail(data) {
      console.log('企业ID', data.id)
      getEnterToken(data.id).then(res => {
        console.log('id_token', res)
        // Cookies.set('id_token', res.id_token, { domain: 'copeople.dev.aks.chilunyc.com' })
        window.open('https://firm.admin.copeople.dev.aks.chilunyc.com/#/home?id_token=' + res.id_token)
      })
    },
    getEnterpriseList(searchCondition) {
      this.loading = true
      getSassEnterpriseList(searchCondition).then(res => {
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
      this.getEnterpriseList(this.searchCondition)
    },
    handleCurrentChange(currentPage) {
      this.searchCondition.page = currentPage - 1
      this.getEnterpriseList(this.searchCondition)
    },
    search() {
      this.getEnterpriseList(this.searchCondition)
    },
    resetSearchCondition() {
      this.searchCondition.name = ''
      this.searchCondition.status = ''
    },
    handleClick(row) {
      this.$router.push({
        path: '/companyDetail',
        query: {
          types: 'edit',
          id: row.id
        }
      })
    },
    activate(id) {
      this.$confirm('是否确认解冻?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        activateEnterprise(id).then(res => {
          this.$message({
            type: 'success',
            message: '解冻成功!'
          })
          this.getEnterpriseList(this.searchCondition)
        })
      })
    },
    freeze(id) {
      this.$confirm('是否确认冻结?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freezeEnterprise(id).then(res => {
          this.$message({
            type: 'success',
            message: '冻结成功!'
          })
          this.getEnterpriseList(this.searchCondition)
        })
      })
    },
    resetPass(id) {
      this.$confirm('是否确认重置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetEnterprisePass(id).then(res => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        })
      })
    },
    deleteEnterprise(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEnterprise(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getEnterpriseList(this.searchCondition)
        })
      })
    },
    cellStyle(column) {
      if (column.columnIndex === 1) {
        return 'text-align: center;'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.company {
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
    align-items: center;
    font-size: 13px;
  }
  .mgr {
    margin: 0;
    margin-right: 2px;
  }
}
</style>
