<template>
  <div>
    <div class="table-list">
      <div ref="table" class="list-table">
        <slot :tableHeight="tableHeight" />
      </div>
      <div class="pagination">
        <div class="total">
          总共{{ total }}个项目
        </div>
        <div class="pagination-info">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :layout="layout"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Interface',
  props: {
    total: {
      default: 0
    },
    pageSizes: {
      default: () => [20, 10, 50, 100]
    },
    pageSize: {
      default: 20
    },
    currentPage: {
      default: 1
    },
    layout: {
      default: 'prev, pager, next, sizes, jumper'
    }
  },
  data() {
    return {
      tableHeight: 0,
      showTable: false
    }
  },
  created() {
    window.onresize = () => {
      this.tableHeight = this.calculateTableHeight()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.calculateTableHeight()
      this.showTable = true
    })
  },
  methods: {
    calculateTableHeight() {
      const tableOffsetTop = this.$refs.table.offsetTop
      return window.innerHeight - tableOffsetTop - 192
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.$emit('pageSizeChange', pageSize)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
      this.$emit('pageChange', currentPage)
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
      margin-bottom: 15px;
      .search-input {
        width: 300px;
        margin-left: 10px;
      }
    }
  }
  .table-list {
    .add {
      margin-bottom: 15px;
    }
    .list-table {
      margin-bottom: 15px;
    }
    .pagination {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
