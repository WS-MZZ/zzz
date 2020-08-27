<template>
  <div>
    <div class="company-search block-wrapper">
      <div class="search-para">
        <el-select v-model="value" placeholder="状态" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="input"
                  size="medium"
                  placeholder="请输入企业名称/账号"
                  class="search-input"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary">查询</el-button>
        <el-button size="medium">重置</el-button>
      </div>
    </div>
    <div class="company-list block-wrapper">
      <div class="add">
        <el-button size="medium" type="primary" @click="add">新增企业</el-button>
      </div>
      <div class="list-table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="corpId"
            label="企业ID"
            width=""
          />
          <el-table-column
            prop="logo"
            label="logo"
            width=""
          />
          <el-table-column
            prop="corpName"
            label="企业名称"
            width=""
          />
          <el-table-column
            prop="corpAccount"
            label="企业账号"
            width=""
          />
          <el-table-column
            prop="contact"
            label="联系人"
            width=""
          />
          <el-table-column
            prop="expireDate"
            label="到期时间"
            width=""
          />
          <el-table-column
            prop="status"
            label="状态"
            width=""
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width=""
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">冻结</el-button>
              <el-button type="text" size="small">查看密码</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="total">
          总共85个项目
        </div>
        <div class="pagination-info">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev, pager, next, sizes, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Company',
  data() {
    return{

    }
  },
  methods: {
    add() {
      this.$router.push({
        path: '/companyDetail',
        query:{
          types : "add"
        }
      });
    },
    handleClick(row) {
      this.$router.push({
        path: '/companyDetail',
        query:{
          types : "edit",
          id: row.id
        }
      });
    },
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
  }
}
</style>
