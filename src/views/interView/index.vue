<template>
  <div>
    <div class="company-search block-wrapper">
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
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="访问开始日期"
          end-placeholder="访问结束日期"
          size="small"
          style="margin-left: 20px"
        />
      </div>
      <div class="search-operation">
        <el-button size="medium" type="primary">查询</el-button>
        <el-button size="medium">重置</el-button>
      </div>
    </div>
    <KgTable>
      <el-table ref="companyList" :height="tableHeight" :data="tableData" border style="width: 100%">
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
            <span v-if="item.prop == 'corpId'" style="color:#66b1ff" @click="detail(scope.row)">
              {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
            </span>
            <span v-else>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </KgTable>
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'

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
          prop: 'corpId',
          label: '记录ID'
          // width: '160'
        },
        {
          prop: 'name',
          label: '接口名称'
          // width: '160'
        },
        {
          prop: 'name',
          label: '访问应用'
          // width: '160'
        },
        {
          prop: 'name',
          label: '访问结果'
          // width: '160'
        },
        {
          prop: 'name',
          label: '响应时长（秒）'
          // width: '160'
        },
        {
          prop: 'name',
          label: 'ip地址'
          // width: '160'
        },
        {
          prop: 'name',
          label: '访问时间'
          // width: '160'
        }
      ],
      value1: [],
      value: '',
      options: []
    }
  },
  created() {
    window.onresize = () => {
      this.tableHeight = this.calculateTableHeight()
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight = this.calculateTableHeight()
      this.showTable = true
    }, 0)
  },
  methods: {
    calculateTableHeight() {
      const tableOffsetTop = this.$refs.companyList.$el.offsetTop
      // console.log(tableOffsetTop, this.$refs.companyList.$el)
      // console.log(window.innerHeight - tableOffsetTop - 94)
      return window.innerHeight - tableOffsetTop - 185
    },
    detail(data) {
      // console.log(data)
      this.$router.push({
        path: '/inter/interViewDetails',
        query: {
          id: data.id
        }
      })
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
    },
    currentPage() {

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
