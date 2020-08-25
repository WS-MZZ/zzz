<template>
    <div class="app-container">
        <div>
            <div class="searchDiv">
                <el-input v-model="searchObj.keyword" placeholder="请输入内容" @keyup.native.13="submitKeyword"  suffix-icon="el-icon-search"></el-input>
            </div> 
            <div class="addDiv">
                <el-button type="primary" icon="el-icon-circle-plus" @click="add()" size="small">新增Banner</el-button>
            </div>
        </div>
        <el-table
            v-loading="listLoading"
                :data="list"
                @filter-change="handleFilterChange"
                element-loading-text="数据加载中"
                border
                fit
                highlight-current-row>
            <el-table-column
            label="ID"
            width="60"
            prop="id"
            >
            </el-table-column>

            <el-table-column
            label="banner"
            prop="pcCover"
            align="center"
            width="100">
            <template slot-scope="scope">
                <img
                style="width: 80px; height: 60px"
                :src="scope.row.pcCover"
                fit="contain"/>
            </template>
            </el-table-column>

            <el-table-column
            label="banner名称"
            prop="title"
            align="center"
            width="200">
            </el-table-column>
        
            <el-table-column
            prop="redirectType"
            label="跳转类型"
            :filters="redirectTypeFilters"
            column-key="redirectType"
            filter-placement="bottom-end"
            align="center"
            width="90">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ convertEnumToCN(scope.row.redirectType) }}</span>
            </template>
            </el-table-column>

            <el-table-column
            prop="state"
            :filters="stateFilters"
            column-key="state"
            filter-placement="bottom-end"
            label="状态"
            align="center"
            width="90">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ convertEnumToCN(scope.row.state) }}</span>
            </template>
            </el-table-column>

            <el-table-column
            label="发布时间"
            prop="publishTime"
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
                    v-if="scope.row.state === 'OFFLINE'"
                    size="mini"
                    @click="setOnline(scope.$index, scope.row.id)">上架</el-button>

                    <el-button
                    v-if="scope.row.state === 'ONLINE'"
                    size="mini"
                    @click="setOffline(scope.$index, scope.row.id)">下架</el-button>

                    <el-button
                    size="mini"
                    type="primary"
                    @click="moveUp(scope.$index, scope.row.id)">上移</el-button>

                    <el-button
                    size="mini"
                    type="primary"
                    @click="moveDown(scope.$index, scope.row.id)">下移</el-button>

                    <el-button
                    size="mini"
                    type="success"
                    @click="edit(scope.$index, scope.row.id)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.$index, scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <br>

            <!-- 分页 -->
            <el-pagination
                :current-page="page"
                :page-size="size"
                :total="total"
                style="padding: 32px 0;"
                layout="total, prev, pager, next, jumper"
                @current-change="fetchData"/>
    </div>
</template>

<script>

import banner from '@/api/cms/banner'

export default {
    data() {
      return {
        tableData: {},
        dialogVisible: false,
        dialogType: 'new',
        page:1,
        size:10,
        total:0,
        searchObj: {// 查询条件
           keyword: '',
           redirectType: [],
           state:[]
        },  
        list: null,
        stateFilters:[{ text: '已发布', value: 'ONLINE' }, { text: '未发布', value: 'OFFLINE' }],
        redirectTypeFilters: [{ text: '链接', value: 'LINK' }, { text: '图文', value: 'IMAGEANDTEXT' }, { text: '无跳转', value: 'NONE' }]
      }
    },
    created(){  // 生命周期初始化时调用方法赋值
        this.fetchData()
    },
    methods: {
        // table过滤器
        handleFilterChange(filters){
            for (let i in filters) {
                if(i === 'redirectType'){
                    this.searchObj.redirectType = filters[i]
                }
                if(i === 'state'){
                    this.searchObj.state = filters[i]
                } 
            }
            this.page = 1 
            this.size = 10
            this.total = 0
            this.fetchData()
        },
        // 搜索框 回车 
        submitKeyword(e){
            this.page = 1 
            this.size = 10
            this.total = 0
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
                page: $this.page - 1,
                size: $this.size,
                keyword: $this.searchObj.keyword,
                state: $this.searchObj.state,
                redirectType: $this.searchObj.redirectType
            }
            banner.getList(searchParams).then(response => {
                if(response.code == 200) { //判断结果是否成功
                    $this.list = response.data.data      //赋值：返回数据
                    $this.total = response.data.totalNumber //赋值：总记录数
                }
                $this.listLoading = false     //让加载图标不显示
            })
        },
        // 上架
        setOnline(index, id){
            let $this = this
            banner.setOnline(id).then(response => {
                this.$message.success("设置成功")
                $this.fetchData()
            }).catch(err => {
                this.$message.error(err.message)
            })
            
        },
        // 下架
        setOffline(index, id){
            let $this = this
            banner.setOffline(id).then(response => {
                this.$message.success("设置成功")
                $this.fetchData()
            }).catch(err => {
                console.info(err)
                this.$message.error(err.message)
            })
        },
        // 上移
        moveUp(index, id){
            let $this = this
            banner.moveUp(id).then(response => {
                console.info(response)
                if(response.code === 200){
                    this.$message.success(response.message)
                    $this.fetchData()
                }else{
                    this.$message.info(response.message)
                }
            }).catch(err => {
                console.error(err)
                this.$message.error(err.message)
            })
        },
        // 下移
        moveDown(index, id){
            let $this = this
            banner.moveDown(id).then(response => {
                console.info(response)
                if(response.code === 200){
                    this.$message.success(response.message)
                    $this.fetchData()
                }else{
                    this.$message.info(response.message)
                }
            }).catch(err => {
                console.error(err)
                this.$message.error(err.message)
            })
        },
        // 编辑
        edit($index, id) {
            this.$router.push({ path: `/banner/edit?id=${id}` });
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
                return banner.delete(id);
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
        add() {
            this.$router.push({ path: '/banner/add' });
        },
        // 将枚举值转为中文
        convertEnumToCN(type){
            switch(type){
                case "ONLINE": return "已发布"
                case "OFFLINE": return "未发布"
                case "LINK": return "链接"
                case "IMAGEANDTEXT": return "图文"
                case "NONE": return "无跳转"
            }
            return "-"
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

