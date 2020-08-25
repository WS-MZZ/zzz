<template>
    <div class="app-container">
        <div>
            <div class="addDiv">
                <el-button type="primary" icon="el-icon-circle-plus" @click="addRole" size="small">新增角色</el-button>
            </div>
        </div>
        <el-table
            v-loading="listLoading"
                :data="list"
                element-loading-text="数据加载中"
                border
                fit
                highlight-current-row>
            <el-table-column
            label="ID"
            width="50"
            prop="id"
            >
            </el-table-column>

            <el-table-column
            label="角色名"
            prop="name"
            align="center"
            width="200">
            </el-table-column>

            <el-table-column
            label="角色名Code"
            prop="code"
            align="center"
            width="250">
            </el-table-column>

            <el-table-column
            prop="permissions"
            label="权限"
            align="center"
            width="200">
            <template slot-scope="scope">
                <span v-for="permission in scope.row.permissions" :key="permission.id" style="display:block">{{permission.name}}</span>
            </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
        
                    <el-button
                    size="mini"
                    type="success"
                    @click="editRole(scope.$index, scope.row.id)">编辑</el-button>

                    <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import role from '@/api/system/role'
import SingleImgUpload from '@/components/Upload/singleImgUpload'

export default {
    components: {
      SingleImgUpload
    },
    data() {
      return {
        tableData: {},
        dialogVisible: false,
        dialogType: 'new', 
        list: null
      }
    },
    created(){  // 生命周期初始化时调用方法赋值
        this.fetchData()
    },
    methods: {
        // 获取list数据
        fetchData(){//赋值
            //加载图标  
            let $this = this
            $this.listLoading = true
            role.getList().then(response => {
                if(response.code === 200) { //判断结果是否成功
                    $this.list = response.data      //赋值：返回数据c
                }
                $this.listLoading = false     //让加载图标不显示
            })
        },
        // 删除
        del($index, id) {
            let $this = this
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法，方法会有返回值，把返回值return，下面出来
                return role.delRole(id);
            }).then((response) => {
                //删除成功，重新刷新页面
                //this.fetchData()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                $this.fetchData()
            }).catch((response) => {
                console.info(response)
                if (response === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    })
                }          
            });
        },
        // 新增
        addRole() {
            this.$router.push({ path: '/system/role/add' });
        },
        // 编辑
        editRole($index, id){
            this.$router.push({ path: '/system/role/edit?id='+ id });
        }
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
 /*搜索*/
.addDiv{
    float:right;
    padding-bottom: 15px;
 }
 .searchDiv{
    float:left;
    padding-bottom: 15px;
    .el-input{
        float: left;
        width:200px;
    }
 }
</style>

