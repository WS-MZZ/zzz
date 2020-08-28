<template>
  <div>
    <div class="company-list block-wrapper">
      <div class="list-table">
        <slot />
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
      default: () => [10, 20, 50, 100]
    },
    pageSize: {
      default: 10
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
    setTimeout(() => {
      this.tableHeight = this.calculateTableHeight()
      this.showTable = true
    }, 0)
  },
  methods: {
    calculateTableHeight() {
      const tableOffsetTop = this.$slots.default[0].context.$el.offsetTop
      return window.innerHeight - tableOffsetTop - 185
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage)
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
