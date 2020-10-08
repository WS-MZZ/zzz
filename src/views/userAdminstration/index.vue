<template>
  <div>
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-select v-model="searchCondition.userRole" placeholder="角色" size="medium" class="roleK">
          <el-option
            v-for="item in userRole"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
          placeholder="请输入姓名、账号"
          class="search-input"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
        <el-button size="medium" @click="resetSearchCondition">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="block-wrapper company-list">
      <div class="add">
        <el-button size="medium" type="primary" @click="add">新增用户</el-button>
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
            />
            <el-table-column
              fixed="right"
              label="操作"
              width=""
            >
              <template slot-scope="scope">
                <el-button class="mgr" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <div>
                  <el-button class="mgr" type="text" size="small" @click="resetPass(scope.row.id)">重置密码</el-button>
                </div>
                <div>
                  <el-button v-if="scope.row.status==='NORMAL'" class="mgr" type="text" size="small" @click="freeze(scope.row.id)">冻结</el-button>
                </div>
                <div>
                  <el-button v-if="scope.row.status==='FREEZE'" class="mgr" type="text" size="small" @click="activate(scope.row)">解冻</el-button>
                </div>
                <el-button class="mgr" type="text" size="small" @click="del(scope.row)">删除</el-button>
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
import { getApplicationList, delUser, resetEnterprisePass, freezeEnterprise } from '@/api/userAdminstration'
export default {
  name: 'UserAdminstration',
  components: {
    KgTable
  },
  data() {
    return {
      searchCondition: {
        userRole: '',
        status: '',
        size: 5,
        page: '',
        sort: 'DESC',
        sysRoleId: ''
      },
      loading: false,
      status: [
        { label: '管理员', value: 1 },
        { label: '用户', value: 2 }
      ],
      userRole: [
        { label: '管理员', value: 1 },
        { label: '用户', value: 2 }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'username',
          label: '姓名'
          // width: '160'
        },
        {
          prop: 'englishName',
          label: '英文名'
          // width: '160'
        },
        {
          prop: 'workNo',
          label: '工号'
          // width: '160'
        },
        {
          prop: 'accountNo',
          label: '账号'
          // width: '160'
        },
        {
          prop: 'mobilePhone',
          label: '手机号'
          // width: '160'
        },
        {
          prop: 'email',
          label: '邮箱'
          // width: '160'
        },
        {
          prop: 'department',
          label: '部门'
          // width: '160'
        },
        {
          prop: 'department',
          label: '部门'
          // width: '160'
        },
        {
          prop: 'statusDesc',
          label: '账号状态'
          // width: '160'
        },
        {
          prop: 'createdBy',
          label: '创建人'
          // width: '160'
        }
      ],
      total: 0
    }
  },
  created() {
    this.userList()
  },
  methods: {
    // 查询
    search() {
      this.userList(this.searchCondition)
    },
    // 重置
    resetSearchCondition() {
      this.searchCondition.userRole = ''
      this.searchCondition.status = ''
    },
    // 新增用户
    add() {
      this.$router.push('/translation/addUserAdminstration')
    },
    // 监听当前分页
    handleCurrentChange(current) {
      console.log('分页', current)
      this.searchCondition.page = current - 1
      this.userList(this.searchCondition)
    },
    // 监听当前数量
    handleSizeChange(size) {
      console.log('数量', size)
      this.searchCondition.size = size
    },
    // 用户列表
    userList() {
      getApplicationList(this.searchCondition).then(response => {
        console.log('用户列表', response.data)
        const res = response.data
        this.total = parseInt(response.total)
        this.tableData = res
      })
    },
    // 编辑
    handleClick(row) {
      this.$router.push({
        path: '/translation/editDetail',
        query: {
          types: 'edit',
          id: row.id
        }
      })
    },
    // 删除
    del(row) {
      console.log(row)
      this.$confirm('确定要删除' + row.username + ' 吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(row.id).then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.userList(this.searchCondition)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 重置密码
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
    // 冻结
    freeze(id) {
      this.$confirm('是否确认冻结?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        freezeEnterprise(id).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '冻结成功!'
          })
          this.userList(this.searchCondition)
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
  .roleK{
    margin-right: 10px;
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

