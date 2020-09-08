<template>
  <div>
    <div class="table-search block-wrapper">
      <div class="search-para">
        <el-select v-model="value" placeholder="所属应用" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="访问开始日期"
          end-placeholder="访问结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          style="margin-left: 20px"
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
                <span v-if="item.prop == 'recordId'" style="color:#66b1ff;cursor: pointer" @click="detail(scope.row)">
                  {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
                </span>
                <span v-else>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
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
import { getInterfaceRecordList } from '@/api/applications'

export default {
  name: 'InterView',
  components: {
    KgTable
  },
  data() {
    return {
      tableHeight: 0,
      showTable: false,
      tableData: [
        { corpId: 1 }
      ],
      tableHeader: [
        {
          prop: 'recordId',
          label: '记录ID'
          // width: '160'
        },
        {
          prop: 'name',
          label: '接口名称'
          // width: '160'
        },
        {
          prop: 'sysApplicationName',
          label: '访问应用'
          // width: '160'
        },
        {
          prop: 'result',
          label: '访问结果'
          // width: '160'
        },
        {
          prop: 'costTime',
          label: '响应时长（秒）'
          // width: '160'
        },
        {
          prop: 'ipAddress',
          label: 'ip地址'
          // width: '160'
        },
        {
          prop: 'createTime',
          label: '访问时间'
          // width: '160'
        }
      ],
      timeRange: [],
      searchCondition: {
        startDate: '',
        page: '',
        size: 2,
        sort: 'DESC',
        endDate: '',
        sysApplicationId: ''
      },
      value: '',
      options: [],
      total: 0
    }
  },
  watch: {
    timeRange(val) {
      this.searchCondition.startDate = val[0]
      this.searchCondition.endDate = val[1]
    }
  },
  created() {
    this.getInterfaceRecordList(this.searchCondition)
  },
  mounted() {
  },
  methods: {
    detail(data) {
      // console.log(data)
      this.$router.push({
        path: '/inter/interViewDetails',
        query: {
          id: data.recordId
        }
      })
    },
    getInterfaceRecordList(searchCondition) {
      this.loading = true
      getInterfaceRecordList(searchCondition).then(res => {
        this.loading = false
        this.tableData = res.data
        this.total = res.total
      }).catch(error => {
        console.log(error) // 这里catch虽然不做什么提示上的动作，但是为了要把loading去掉，也还是需要的
        this.loading = false
      })
    },
    handleSizeChange(pageSize) {
      this.searchCondition.size = pageSize
      this.getInterfaceRecordList(this.searchCondition)
    },
    handleCurrentChange(currentPage) {
      this.searchCondition.page = currentPage
      this.getInterfaceRecordList(this.searchCondition)
    },
    search() {
      this.getInterfaceRecordList(this.searchCondition)
    },
    resetSearchCondition() {
      this.searchCondition.sysApplicationId = ''
      this.timeRange = []
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
