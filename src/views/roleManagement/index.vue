<template>
  <div>
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-input
          v-model="searchCondition.name"
          size="medium"
          placeholder="请输入角色名称"
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
        <el-button size="medium" type="primary" @click="dialogFormVisible = true">新增角色</el-button>
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
            <el-table-column label="创建信息">
              <template slot-scope="scope">
                <div>时间：<span>{{ scope.row.createdDate }}</span> </div>
                <div>创建人: <span>{{ scope.row.createdBy }} </span> </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width=""
            >
              <template slot-scope="scope">
                <el-button class="mgr" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <div>
                  <el-button class="mgr" type="text" size="small" @click="setJurisdiction(scope.row.id)">设置权限</el-button>
                </div>
                <el-button class="mgr" type="text" size="small" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </KgTable>
    </div>
    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="addForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off" class="addinput" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="addForm.description"
            type="textarea"
            autocomplete="off"
            placeholder="请输入内容"
            class="addinput"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>
    <!-- 设置权限 -->
    <el-dialog :visible.sync="dialogFormRole">
      <div class="setRoleTitStyle">当前角色:运营</div>
      <el-table
        :data="roledata"
        :header-cell-style="{ background:'rgb(85, 85, 85)',color:'#ffffff','border-right':'1px solid #ffffff'}"
        style="width: 100%;"
        class="tabtrRole"
      >
        <el-table-column
          label="菜单权限"
          width="200px"
          :cell-style="{'border-right':'1px solid #ffffff'}"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="permissionIdList">
              <el-checkbox :checked="menuNavigation" :label="scope.row.id" @change="handleCheckAllChange(scope.row,$event,scope.row.ischeck)">{{ scope.row.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column
          label="功能权限"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="permissionIdList">
              <el-checkbox v-for="(item,index) of scope.row.child" :key="index" :disabled="item.ischeck" :label="item.id" @change="handleCheckChange(item.id, $event, scope.row, item)">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormRole = false">取 消</el-button>
        <el-button type="primary" @click="addSetRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'
import { roleLists, addRole, delRole, setRole, roleSelect } from '@/api/roleManagement'
// import role from 'mock/roleManagement'
export default {
  name: 'RoleManagement',
  components: {
    KgTable
  },
  data() {
    return {
      searchCondition: {
        name: '',
        size: 5,
        page: '',
        sort: 'DESC'
      },
      loading: false,
      tableData: [
      ],
      tableHeader: [
        {
          prop: 'name',
          label: '角色名称'
          // width: '160'
        },
        {
          prop: 'userCount',
          label: '角色用户数'
          // width: '160'
        },
        {
          prop: 'description',
          label: '备注'
          // width: '160'
        }
      ],
      roledata: [],
      // 权限已经选中的默认值
      permissionIdList: [],
      // permissRoleSelectAll: [],
      isIndeterminate: true,
      total: 0,
      addForm: {
        name: '',
        description: '',
        id: this.userInfo
      },
      dialogFormVisible: false,
      dialogFormRole: false,
      formLabelWidth: '120px',
      textarea: '',
      userid: this.userInfo,
      menuNavigation: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo.id
    }
  },
  watch: {
    permissionIdList() {

    }
  },
  created() {
    this.roleList()
    this.roleSelect()
  },
  methods: {
    // 查询
    search() {
    },
    // 重置
    resetSearchCondition() {
      this.roleName = ''
    },
    // 表格列表
    roleList() {
      roleLists(this.searchCondition).then(response => {
        this.tableData = response
        this.total = response.length
      })
    },
    // 页码
    handleCurrentChange() {},
    // 页码单页数量
    handleSizeChange() {},
    // 添加角色
    add() {
      this.dialogFormVisible = false
      addRole(this.addForm).then(res => {
        this.$message.success('添加成功')
      })
    },
    // 编辑角色
    handleClick() {},
    // 设置权限
    setJurisdiction() {
      this.dialogFormRole = true
    },
    // 删除角色
    del(row) {
      this.$confirm('确定要删除' + row.name + ' 吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.roleList(this.searchCondition)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCheckChange(id, event, row, item) {
      console.log(row)
      console.log(id)
      if (id === row.parentId) {
        if (event) {
          row.child.forEach(items => {
            items.ischeck = false
          })
        } else {
          row.child.forEach(items => {
            items.ischeck = true
            item.ischeck = false
          })
        }
      }
    },
    // 全选
    handleCheckAllChange(value, event, ischeck) {
      console.log('value', value)
      console.log('ischeck', ischeck)
      if (event === true) {
        value.child.filter(item => {
          this.permissionIdList.push(item.id)
          this.permissionIdList.push(value.id)
          this.permissionIdList = Array.from(new Set(this.permissionIdList))
        })
        ischeck = false
        value.ischeck = ischeck
      } else {
        const indexItem = []
        ischeck = true
        value.ischeck = ischeck
        value.child.filter(item => {
          indexItem.push(item.id)
        })
        const indexList = this.permissionIdList.filter(items => {
          return !indexItem.includes(items)
        })
        this.permissionIdList = indexList
      }
      // this.isIndeterminate = false
    },
    // 修改权限
    addSetRole() {
      setRole().then(res => {})
    },
    // 系统权限选择
    roleSelect() {
      roleSelect(this.userid).then(res => {
        this.roledata = res.data.all
        this.permissionIdList = res.data.selected
        console.log('zz', res.data)
        this.roledata.forEach(item => {
          // if (this.permissionIdList.includes(item.id)) {
          //   item.ischeck = false
          // } else {
          //   item.ischeck = true
          // }
          console.log('item', item)
          // item.child.forEach(items => {
          //   items.ischeck = false
          // })
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
  .addinput{
      width:230px;
  }
  .setRoleTitStyle{
    margin-bottom: 20px;
  }
::v-deep .el-table td, .el-table th.is-leaf{
    border-right:1px solid #EBEEF5
  }
.tabtrRole {
  background-color: rgb(242, 242, 242);
}
::v-deep .el-table tr{
  background-color:transparent;
}
</style>
