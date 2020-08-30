<template>
  <div>
    <div class="company-search block-wrapper">
      <div class="search-para">
        <el-select v-model="value" placeholder="全部操作人" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="input"
          size="medium"
          placeholder="请输入操作行为"
          class="search-input"
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
            <span>{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </KgTable>
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'

export default {
  name: 'SystemLog',
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
          label: '操作行为'
          // width: '160'
        },
        {
          prop: 'name',
          label: '操作人姓名'
          // width: '160'
        },
        {
          prop: 'name',
          label: '操作人手机号'
          // width: '160'
        },
        {
          prop: 'name',
          label: '操作时间'
          // width: '160'
        }
      ],
      options: [],
      input: '',
      value: ''
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
      return window.innerHeight - tableOffsetTop - 185
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
      align-items: center;
      font-size: 13px;
    }
  }
</style>
