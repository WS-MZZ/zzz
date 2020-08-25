<template>
    <div class="app-container">
        <div>
            <div class="addDiv">
                <el-button type="primary" icon="el-icon-circle-plus" @click="add()" size="small">新增分类</el-button>
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
            label="分类名称"
            prop="name"
            align="center"
            width="150">
            </el-table-column>
        
            <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="200">
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
<!-- 
                    <el-button
                    size="mini"
                    type="primary"
                    @click="moveUp(scope.$index, scope.row.id)">上移</el-button>

                    <el-button
                    size="mini"
                    type="primary"
                    @click="moveDown(scope.$index, scope.row.id)">下移</el-button> -->

                    <el-button
                    size="mini"
                    type="success"
                    @click="edit(scope.$index, scope.row.id, scope.row.name)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.$index, scope.row.name)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import news from '@/api/cms/news'

export default {
    data() {
      return {
        tableData: {},
        dialogVisible: false,
        dialogType: 'new',
        keyword: '', // 查询条件
        list: null,
      }
    },
    created(){  // 生命周期初始化时调用方法赋值
        this.fetchData()
    },
    methods: {
        // 搜索框 回车 
        submitKeyword(e){
            this.fetchData()
        },
        // 获取list数据
        fetchData(page = this.page, $this = this){//赋值
            //当前页初始值
            $this.page = page
            //加载图标  
            $this.listLoading = true
            //调用ajax发送的方法得到返回结果
            let searchParams = {
                keyword: $this.keyword,
            }
            news.getTags(searchParams).then(response => {
                if(response.code == 200) { //判断结果是否成功
                    $this.list = response.data      //赋值：返回数据
                }
                $this.listLoading = false     //让加载图标不显示
            })
        },
        // // 上移
        // moveUp(index, id){
        //     let $this = this
        //     news.moveUp(id).then(response => {
        //         console.info(response)
        //         if(response.code === 200){
        //             this.$message.success(response.message)
        //             $this.fetchData()
        //         }else{
        //             this.$message.info(response.message)
        //         }
        //     }).catch(err => {
        //         console.error(err)
        //         this.$message.error(err.message)
        //     })
        // },
        // // 下移
        // moveDown(index, id){
        //     let $this = this
        //     news.moveDown(id).then(response => {
        //         console.info(response)
        //         if(response.code === 200){
        //             this.$message.success(response.message)
        //             $this.fetchData()
        //         }else{
        //             this.$message.info(response.message)
        //         }
        //     }).catch(err => {
        //         console.error(err)
        //         this.$message.error(err.message)
        //     })
        // },
        // 编辑
        edit($index, id, name) {
            this.$router.push({ path: `/news/tag-edit?id=${id}&name=${name}` });
        },
        // 删除
        del($index, name) {
            let $this = this
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法，方法会有返回值，把返回值return，下面出来
                return news.delTag(name);
            }).then((response) => {
                //删除成功，重新刷新页面
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                $this.fetchData()
            }).catch((response) => {
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
        add() {
            this.$router.push({ path: '/news/tag-add' });
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

