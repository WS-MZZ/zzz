<template>
    <div class="app-container">
        <div>
            <div class="addDiv">
                <el-button type="primary" icon="el-icon-circle-plus" @click="addUser" size="small">新增用户</el-button>
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
            label="用户名"
            prop="username"
            align="center"
            width="100">
            </el-table-column>

            <el-table-column
            label="手机号"
            prop="phone"
            align="center"
            width="140">
            </el-table-column>
        
            <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="180">
            </el-table-column>

            <el-table-column
            prop="frozen"
            label="状态"
            align="center"
            width="75">
            <template slot-scope="scope">
                <span v-if="scope.row.frozen" style="margin-left: 10px">已冻结</span>
                <span v-if="!scope.row.frozen" style="margin-left: 10px">正常</span>
            </template>
            </el-table-column>

            <el-table-column
            prop="roles"
            label="角色"
            align="center"
            width="150">
            <template slot-scope="scope">
                <span v-for="role in scope.row.roles" :key="role.id" style="display:block">{{role.name}}</span>
            </template>
            </el-table-column>

            <el-table-column
            label="最后登录时间"
            prop="lastLoginTime"
            align="center"
            width="150">
            </el-table-column>

            <el-table-column
            label="创建时间"
            prop="createTime"
            align="center"
            width="150">
            </el-table-column>

            <el-table-column label="操作" align="center" width="360">
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.frozen"
                    size="mini"
                    type="success" plain
                    @click="unFreezeUser(scope.$index, scope.row.id)">解冻</el-button>

                    <el-button
                    v-if="!scope.row.frozen"
                    size="mini"
                    type="warning"
                    @click="freezeUser(scope.$index, scope.row.id)">冻结</el-button>

                    <el-button
                    size="mini"
                    type="success"
                    @click="resetPassword(scope.$index, scope.row.id)">重置密码</el-button>

                    <el-button
                    size="mini"
                    type="success"
                    @click="editUser(scope.$index, scope.row.id)">编辑</el-button>

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

import user from '@/api/system/user'
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
            this.listLoading = true
            user.getList().then(response => {
                if(response.code === 200) { //判断结果是否成功
                    this.list = response.data      //赋值：返回数据c
                }
                this.listLoading = false     //让加载图标不显示
            }).catch(err => {
                this.listLoading = false     //让加载图标不显示
            })
        },

        // 冻结
        freezeUser($index, id) {
            let $this = this
             user.freezeUser(id).then(response => {
                if(response.code === 200) { //判断结果是否成功
                    $this.fetchData()
                }
            })
        },

        // 解冻
        unFreezeUser($index, id) {
            let $this = this
            user.unFreezeUser(id).then(response => {
                if(response.code === 200) { //判断结果是否成功
                    $this.fetchData()
                }
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
                return user.delUser(id);
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

        // 重置密码
        resetPassword($index, id){
            user.resetPassword(id).then(response => {
                if(response.code === 200) { //判断结果是否成功
                    this.$message.success("重置成功")
                }else{
                    this.$message.success("重置失败")
                }
                console.log(response)
            }).catch(err => {
                console.log(err)
                this.$message.success("重置失败")
            })
        },

        // 新增
        addUser() {
            this.$router.push({ path: '/system/user/add' });
        },
        // 编辑
        editUser($index, id){
            this.$router.push({ path: '/system/user/edit?id='+ id });
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

