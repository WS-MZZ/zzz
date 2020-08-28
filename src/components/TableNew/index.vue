<template>
  <div class="hltable">
    <el-table
      ref="table"
      id="HLtableList"
      :data="data"
      :border="border"
      :size="size"
      :show-overflow-tooltip="showOverflowTooltip"
      :show-summary="showSummary"
      :tooltip-effect="tooltipEffect"
      :height='autoHeigit === true ? computedHeight : height'
      :search="search"
      :header-cell-style="tableHeaderColor"
      :stripe="stripe"
      :highlight-current-row="currentRow"
      :row-key="rowKey"
      :summary-method="summaryMethod"
      @selection-change="selectChange"
      @select="select"
      @select-all="selectAll"
      @row-click="rowClick"
      @current-change="currentChange"
      @clearSelection="clearSelection"
      @toggleRowSelection="toggleRowSelection"
      @toggleAllSelection="toggleAllSelection"
      @sort-change="sortChange"
      v-loading="loading"
      style="width: 98%;margin: 20px auto 0 20px;border-bottom: 1px solid rgba(233, 233, 233, 1)"
    >
      <el-table-column v-if="multiple" type="selection" width="40" align="left" fixed="left" :reserve-selection="reserveSelection"></el-table-column>
      <el-table-column
        v-if="serialize"
        type="index"
        label="序号"
        align="left"
        width="80"
        fixed="left"
      ></el-table-column>

      <slot></slot>
      <!--      <el-table-column v-if="blankCol"></el-table-column>-->
    </el-table>
    <div class="container" v-if="hasPagination">
      <slot name="count"></slot>
      <el-pagination
        background
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import _ from 'lodash'
  // import { setTimeout } from 'timers';
  export default {
    name: "HletongTable",
    components: {
    },
    props: {
      data: {
        default: () => []
      },
      size: {
        default: "medium"
      },
      border: {
        default: true
      },
      showOverflowTooltip: {
        default: false
      },
      multiple: {
        default: false
      },
      serialize: {
        default: true
      },
      showSummary: {
        default: false
      },
      tooltipEffect: {
        default: "dark"
      },
      loading: {
        default: false
      },
      stripe: {
        default: true
      },
      search: {
        default: false
      },
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
        default: "total, sizes, prev, pager, next, jumper"
      },
      autoHeigit: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 0
      },
      blankCol: {
        type: Boolean,
        default: true
      },
      currentRow: {
        type: Boolean,
        default: true
      },
      rowKey: {
        type: String,
        default: ''
      },
      reserveSelection: {
        type: Boolean,
        default: false
      },
      hasPagination: {
        type: Boolean,
        default: true
      },
      tableHeader: {
        type: Array,
        default: () => []
      },
      summaryMethod: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        computedHeight: 0,
        checkList: [],
        showCheckBox: false,
      };
    },
    watch: {},
    computed: {},
    methods: {
      // 修改table header的背景色
      tableHeaderColor({rowIndex}) {
        if (rowIndex === 0) {
          return "background-color: #F6F8FA;color: #262626;font-weight: 500;";
        }
      },
      selectChange(selection) {
        this.$emit("selection-change", selection);
      },
      selectAll(selection){
        this.$emit("select-all", selection);
      },
      select(selection, row){
        this.$emit("select", selection, row);
      },
      rowClick(row, event, column) {
        let data = {
          row: row,
          event: event,
          column: column
        };
        this.$emit("row-click", data);
      },
      handleSizeChange(size) {
        this.$emit("sizeChange", size);
      },
      handleCurrentChange(page) {

        this.$emit("pageChange", page);
      },
      computedTableHeight() {
        if (this.autoHeigit === true) {
          this.computedHeight = this.getHlTableListHeight();
        }
      },
      getHlTableListHeight() {
        const $HLtableList = $("#HLtableList");
        return window.innerHeight - $HLtableList.offset().top - 94;
      },
      currentChange(currentRow, oldCurrentRow) {
        this.$emit('currentChange', currentRow, oldCurrentRow)
      },
      clearSelection() {
        this.$refs.table.clearSelection();
      },
      toggleRowSelection(row, selected) {
        this.$refs.table.toggleRowSelection(row, selected);
      },
      toggleAllSelection() {
        this.$refs.table.toggleAllSelection();
      },
      sortChange(data) {
        this.$emit('sort-change', data)
      },
      doLayout() {
        this.$refs.table.doLayout()
      },
      clearSort() {
        this.$refs.table.clearSort();
      }
    },
    created() {
      this.checkList = this.tableHeader.filter(item => item.show).map((item, index) => index);
      $('body').bind('click', _.throttle(() => {
        this.showCheckBox = false;
      }, 1000));
    },
    mounted() {
      setTimeout(()=>{
        this.computedTableHeight();
      },400)

      $(window).bind("resize", _.throttle(() => {
        this.computedTableHeight();
      }, 400));
    },
    destroyed () {
      $(window).off("resize");
      $('body').off('click');
    }
  };
</script>

<style scoped lang="less">
  .container {
    width: 98%;
    margin-left: 20px;
    height: 34px;
    background-color: #f6f8fa;
    position: relative;
    /*margin-top: 15px;*/
    margin-bottom: 20px;
    .page {
      display: block;
      position: absolute;
      // top: 10px;
      right: 10px;
    }
  }
  .hltable {
    position: relative;
  }
  .hltable /deep/ .el-table .is-center .cell {
    padding-left: 0;
  }
  .header-filter {
    position: absolute;
    top: 10px;
    right: 30px;
    z-index: 10;
    i {
      font-size: 16px;
      position: absolute;
      right: 0;
      top: 0
    }

  }
  .check-list {
    width: 110px;
    position: absolute;
    right: -5px;
    top: 27px;
    padding: 10px 20px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    border-radius: 5px;
    .el-checkbox {
      margin: 10px 0;
      display: flex;
      .el-checkbox__label {
        width: 110px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .popper__arrow {
    position: absolute;
    top: -6px;
    right: 10px;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
    border-top-width: 0;
    border-bottom-color: #ebeef5;
    &::after {
      content: ' ';
      position: absolute;
      top: 1px;
      width: 0;
      height: 0;
      margin-left: -6px;
      border-width: 6px;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      border-bottom-color: #fff;

    }
  }
</style>
