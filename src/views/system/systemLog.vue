<template>
  <div v-if="authMap.system.sysLog.show">
    <div class="company-search block-wrapper">
      <div class="search-para">
        <el-select v-model="searchCondition.operateName" filterable placeholder="全部操作人" size="medium">
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
        <el-input
          v-model="searchCondition.typeName"
          size="medium"
          placeholder="请输入操作行为"
          class="search-input"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
        <el-button size="medium" @click="resetSearchCondition">重置</el-button>
      </div>
    </div>
    <div class="block-wrapper">
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
            >
              <template slot-scope="scope">
                <span>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
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
import { getSystemList } from '@/api/system'
import { getUsers } from '@/api/user'
import { mapGetters } from 'vuex'
const defaultForm = {
  operateName: '',
  page: '',
  size: 10,
  typeName: ''
}

export default {
  name: 'SystemLog',
  components: {
    KgTable
  },
  data() {
    return {
      tableHeight: 0,
      showTable: false,
      loading: false,
      tableData: [
      ],
      tableHeader: [
        {
          prop: 'typeDesc',
          label: '操作行为'
          // width: '160'
        },
        {
          prop: 'operateName',
          label: '操作人姓名'
          // width: '160'
        },
        {
          prop: 'operatePhone',
          label: '操作人手机号'
          // width: '160'
        },
        {
          prop: 'operateTime',
          label: '操作时间'
          // width: '160'
        }
      ],
      users: [],
      searchCondition: { ...defaultForm },
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ])
  },
  created() {
    this.getSystemList(this.searchCondition)
    this.getAllUsers()
  },
  mounted() {
    this.getSystemList(this.searchCondition)
  },
  methods: {
    getSystemList(searchCondition) {
      this.loading = true
      getSystemList(searchCondition).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = parseInt(res.total)
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
        this.loading = false
      })
    },
    getAllUsers() {
      getUsers({
        size: 10000
      }).then(res => {
        this.users = res.data
      })
    },
    handleSizeChange(pageSize) {
      this.searchCondition.size = pageSize
      this.getSystemList(this.searchCondition)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.searchCondition.page = currentPage - 1
      this.getSystemList(this.searchCondition)
    },
    search() {
      this.getSystemList(this.searchCondition)
    },
    resetSearchCondition() {
      this.searchCondition = { ...defaultForm }
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
  .block-wrapper {
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
  }
  .table {
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
