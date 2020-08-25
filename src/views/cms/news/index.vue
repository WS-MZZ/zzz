<template>
    <div class="app-container">
        <div>
            <div class="searchDiv">
                <el-input v-model="searchObj.keyword" placeholder="请输入新闻名称" @keyup.native.13="submitKeyword"  suffix-icon="el-icon-search"></el-input>
            </div> 
            <div class="addDiv">
                <el-button type="primary" icon="el-icon-circle-plus" @click="add()" size="small">新增新闻</el-button>
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
            width="50"
            prop="id"
            >
            </el-table-column>

            <el-table-column
            label="封面"
            prop="cover"
            align="center"
            width="100">
            <template slot-scope="scope">
                <img
                style="width: 80px; height: 60px"
                :src="scope.row.cover"
                fit="contain"/>
            </template>
            </el-table-column>

            <el-table-column
            label="新闻名称"
            prop="title"
            align="center"
            width="150">
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
            prop="tags"
            label="新闻类型"
            :filters="tagFilters"
            filter-placement="bottom-end"
            column-key="tags"
            align="center"
            width="90">
            <template slot-scope="scope">
                <span style="margin-left: 10px; display:block" v-if="scope.row.tags ===undefined || scope.row.tags.length === 0 ">未分类</span>
                <span style="margin-left: 10px; display:block" v-for="tag in scope.row.tags" :key="tag.id">{{tag.name}}</span>
            </template>
            </el-table-column>

             <el-table-column
            prop="recommend"
            label="是否推荐"
            :filters="isRecommendFilters"
            filter-placement="bottom-end"
            column-key="recommend"
            align="center"
            width="90">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.recommend? '是':'否' }}</span>
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

            <el-table-column label="操作" align="center" width="330">
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.state === 'ONLINE' && scope.row.recommend"
                    size="mini"
                    @click="setRecommend(scope.$index, scope.row.id, !scope.row.recommend)">取消推荐</el-button>
                    <el-button
                    v-if="scope.row.state === 'ONLINE' && !scope.row.recommend"
                    size="mini"
                    @click="setRecommend(scope.$index, scope.row.id, !scope.row.recommend)">推荐</el-button>

                    <el-button
                    v-if="scope.row.state === 'OFFLINE'"
                    size="mini"
                    @click="setOnline(scope.$index, scope.row.id)">上架</el-button>

                    <el-button
                    v-if="scope.row.state === 'ONLINE'"
                    size="mini"
                    @click="setOffline(scope.$index, scope.row.id)">下架</el-button>
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

import news from '@/api/cms/news'

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
           state:[],
           tag:[],
           isRecommend: []
        },  
        list: null,
        tagFilters:[],
        isRecommendFilters:[{ text: '是', value: true }, { text: '否', value: false }],
        stateFilters:[{ text: '已发布', value: 'ONLINE' }, { text: '未发布', value: 'OFFLINE' }],
        redirectTypeFilters: [{ text: '链接', value: 'LINK' }, { text: '图文', value: 'IMAGEANDTEXT' }]
      }
    },
    created(){  // 生命周期初始化时调用方法赋值
        this.getTags()
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
                if(i === 'tags'){
                    this.searchObj.tag = filters[i]
                }
                if(i === 'recommend'){
                    this.searchObj.isRecommend = filters[i]
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
                redirectType: $this.searchObj.redirectType,
                tag: $this.searchObj.tag,
                isRecommend: $this.searchObj.isRecommend
            }
            news.getList(searchParams).then(response => {
                if(response.code == 200) { //判断结果是否成功
                    $this.list = response.data.data      //赋值：返回数据
                    $this.total = response.data.totalNumber //赋值：总记录数
                }
                $this.listLoading = false     //让加载图标不显示
            })
        },
        getTags(){
            let $this = this
            news.getTags().then(res => {
                let tags = res.data
                $this.tagFilters = []
                for(let i = 0, len = tags.length; i < len; i ++){
                    $this.tagFilters.push({
                        text: tags[i].name,
                        value: tags[i].code
                    })
                }
            }).catch(err => {
                console.error('获取tags失败')
            })
        },
        // 上架
        setOnline(index, id){
            let $this = this
            news.setOnline(id).then(response => {
                this.$message.success("设置成功")
                $this.fetchData()
            }).catch(err => {
                this.$message.error(err.message)
            })
            
        },
        // 下架
        setOffline(index, id){
            let $this = this
            news.setOffline(id).then(response => {
                this.$message.success("设置成功")
                $this.fetchData()
            }).catch(err => {
                console.info(err)
                this.$message.error(err.message)
            })
        },
        // 设置为推荐/不推荐
        setRecommend(index, id, isRecommend){
            let $this = this
            news.setRecommend(id, isRecommend).then(response => {
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
            news.moveUp(id).then(response => {
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
            news.moveDown(id).then(response => {
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
            this.$router.push({ path: `/news/edit?id=${id}` });
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
                return news.delete(id);
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
            this.$router.push({ path: '/news/add' });
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

