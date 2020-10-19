<template>
  <div v-if="authMap.roleManagement.roleList.show">
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
        <el-button size="medium" type="primary" @click="addRoleSelect">新增角色</el-button>
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
                <div v-if="!checkIfAdmin(scope.row)">
                  <div v-if="authMap.roleManagement.roleMange.show">
                    <el-button class="mgr" type="text" size="small" :style="{ color: 'rgb(64, 158, 255)' }" @click="handleClick(scope.row)">编辑</el-button>
                    <div v-if="authMap.roleManagement.roleMange.show">
                      <el-button class="mgr" type="text" size="small" :style="{ color: 'rgb(64, 158, 255)' }" @click="setJurisdiction(scope.row)">设置权限</el-button>
                    </div>
                  </div>
                  <el-button v-if="authMap.roleManagement.roleDelete.show" class="mgr" type="text" size="small" :style="{ color: 'rgb(64, 158, 255)' }" @click="del(scope.row)">删除</el-button>
                </div>
                <div v-else>
                  -
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </KgTable>
    </div>
    <!-- 新增角色 -->
    <el-dialog :title="addName" :visible.sync="dialogFormVisible" width="500px">
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
        <el-button @click="unadd">取 消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>
    <!-- 设置权限 -->
    <el-dialog :visible.sync="dialogFormRole">
      <div class="setRoleTitStyle">当前角色：{{ roleName }}</div>
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
              <el-checkbox :checked="menuNavigation" :label="scope.row.id" @change="handleCheckAllChange(scope.row,$event)">{{ scope.row.name }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column
          label="功能权限"
        >
          <template slot-scope="scope">
            <el-checkbox-group v-model="permissionIdList">
              <el-checkbox v-for="(item,index) of scope.row.child" :key="index" :disabled="item.disabled" :label="item.id" @change="handleCheckChange(item.id, $event, scope.row, item)">{{ item.name }}</el-checkbox>
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
import { roleLists, addRole, delRole, roleSelect, editRole, confirmSetRole } from '@/api/roleManagement'
import { mapGetters } from 'vuex'
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
        size: 20,
        page: '',
        sort: 'DESC'
      },
      roleName: '',
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
        id: ''
      },
      dialogFormVisible: false,
      dialogFormRole: false,
      formLabelWidth: '120px',
      textarea: '',
      userid: this.userInfo,
      menuNavigation: false,
      addName: '新增角色',
      addSetRoleID: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ]),
    userInfo() {
      return this.$store.getters.userInfo.id
    }
  },
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible === false) {
        this.addForm.name = ''
        this.addForm.description = ''
      }
    },
    permissionIdList() {
      console.log(this.permissionIdList)
    }
  },
  created() {
    if (this.authMap && this.authMap.roleManagement.roleList.show) {
      this.roleList()
    }
    // this.roleSelect()
  },
  methods: {
    // 加载判断是否选中
    judgeSelect() {

    },
    // 查询
    search() {
      this.roleList()
    },
    // 重置
    resetSearchCondition() {
      this.roleName = ''
    },
    // 表格列表
    roleList() {
      roleLists(this.searchCondition).then(response => {
        this.tableData = response.data
        this.total = parseInt(response.total)
      })
    },
    // 页码
    handleCurrentChange(current) {
      this.searchCondition.page = current - 1
      this.roleList()
    },
    // 页码单页数量
    handleSizeChange(size) {
      this.searchCondition.size = size
    },
    // 添加角色按钮弹窗
    addRoleSelect() {
      this.dialogFormVisible = true
      this.addName = '添加角色'
    },
    // 添加角色
    add() {
      if (this.addName === '添加角色') {
        addRole(this.addForm).then(res => {
          this.dialogFormVisible = false
          this.$message.success('添加成功')
          this.roleList()
        })
      } else {
        this.editRoleSelect()
      }
    },
    // 编辑角色
    editRoleSelect() {
      editRole(this.addForm).then(res => {
        this.dialogFormVisible = false
        console.log('编辑角色', res)
        this.$message.success('编辑成功')
        this.roleList()
      })
    },
    // 取消添加角色
    unadd() {
      this.dialogFormVisible = false
      this.addForm.name = ''
      this.addForm.description = ''
    },
    // 编辑按钮
    handleClick(row) {
      this.dialogFormVisible = true
      this.addName = '编辑角色'
      this.addForm.id = row.id
      this.addForm.name = row.name
      this.addForm.description = row.description
    },
    // 设置权限
    setJurisdiction(row) {
      this.roleName = row.name
      this.dialogFormRole = true
      this.addSetRoleID = row.id
      roleSelect(row.id).then(res => {
        console.log('设置权限', res)
        this.roledata = res.all
        this.permissionIdList = res.selected
        this.roledata.forEach(item => {
          if (this.permissionIdList.indexOf(item.id) !== -1) {
            item.child.forEach((childItem, index) => {
              if (index === 0 && this.permissionIdList.indexOf(childItem.id) !== -1) {
                item.child.forEach((childItem2, index2) => {
                  if (index2 !== 0) {
                    childItem2.disabled = false
                  }
                })
              } else if (index === 0 && this.permissionIdList.indexOf(childItem.id) === -1) {
                item.child.forEach((childItem3, index3) => {
                  if (index3 !== 0) {
                    childItem3.disabled = true
                    if (childItem3.id === 802) {
                      childItem3.disabled = false
                    }
                  }
                })
              }
            })
          } else {
            item.child.forEach((childItem, index) => {
              if (index !== 0) {
                childItem.disabled = true
              }
            })
          }
          // item.child.forEach((childItem, index) => {
          //   console.log('childitem', childItem)
          //   this.fatherRoleList.forEach(fatherId => {
          //     console.log(fatherId)
          //     if (fatherId === childItem.id) {
          //       childItem.ischeck = false
          //     } else {
          //       // item.child[index].ischeck = true
          //     }
          //   })
          // })
        })
        console.log(this.roledata, 'roldata')
      })
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
    // child权限
    handleCheckChange(id, event, row, item) {
      console.log(row)
      if (event) {
        if (id === 101 || id === 201 || id === 301 || id === 401 || id === 501 || id === 601 || id === 701 || id === 801) {
          row.child.forEach(items => {
            items.disabled = false
          })
          this.permissionIdList.push(row.id)
          this.permissionIdList = Array.from(new Set(this.permissionIdList))
        }
      } else {
        if (id === 101 || id === 201 || id === 301 || id === 401 || id === 501 || id === 601 || id === 701 || id === 801) {
          row.child.forEach(items => {
            items.disabled = true
            item.disabled = false
            if (items.id === 802) {
              items.disabled = false
            }
            this.permissionIdList.forEach((seleceId, index) => {
              if (items.id === seleceId) {
                if (items.id === 802) {
                  this.permissionIdList.splice(index, 1)
                  this.permissionIdList.push(802)
                  this.permissionIdList = Array.from(new Set(this.permissionIdList))
                } else {
                  this.permissionIdList.splice(index, 1)
                }
              }
            })
          })
        }
      }
    },
    // 全选
    handleCheckAllChange(value, event) {
      console.log('value', value)
      console.log('event', event)
      if (event === true) {
        value.child.filter(item => {
          this.permissionIdList.push(item.id)
          this.permissionIdList.push(value.id)
          this.permissionIdList = Array.from(new Set(this.permissionIdList))
        })
        value.child.forEach((item, index) => {
          if (index !== 0) {
            item.disabled = false
          }
        })
        // this.ischeck = false
        // value.ischeck = ischeck
      } else {
        const indexItem = []
        // this.ischeck = true
        // value.ischeck = ischeck
        value.child.forEach((item, index) => {
          indexItem.push(item.id)
          if (index !== 0) {
            item.disabled = true
          }
        })
        const indexList = this.permissionIdList.filter(items => {
          return !indexItem.includes(items)
        })
        this.permissionIdList = indexList
      }
      // this.isIndeterminate = false
    },
    // 确认修改权限
    addSetRole() {
      confirmSetRole({ id: this.addSetRoleID, permissionIdList: this.permissionIdList }).then(res => {
        this.dialogFormRole = false
        this.$message.success('修改权限成功')
        console.log('修改成功')
      })
    },
    // 系统权限选择
    roleSelect() {
    },
    checkIfAdmin(row) {
      let isadmin = false
      if (row.name === '超级管理员') {
        isadmin = true
      }
      return isadmin
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
      margin-bottom: 15px;
    }
    .list-table {
      margin-bottom: 15px;
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
