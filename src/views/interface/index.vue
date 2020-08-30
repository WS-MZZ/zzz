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
        <el-input
          v-model="input"
          size="medium"
          placeholder="请输入应用名称"
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
            <span v-if="item.prop == 'corpId'" style="color:#66b1ff;cursor: pointer" @click="detail(scope.row)">
              {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
            </span>
            <span v-if="item.prop == 'num'" style="color:#66b1ff;cursor: pointer" @click="buyDetail(scope.row)">
              {{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}
            </span>
            <span v-if="item.prop != 'num' && item.prop != 'corpId'">{{ scope.row[item.prop] || scope.row[item.prop] == 0 ? scope.row[item.prop] : '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </KgTable>
    <buyDialog ref="buyDialog" :visible.sync="visible"></buyDialog>
  </div>
</template>

<script>
import KgTable from '@/components/KgComponents/KgTable'
import buyDialog from './modules/buyDialog'

export default {
  name: 'Interface',
  components: {
    KgTable,
    buyDialog
  },
  data() {
    return {
      tableHeight: 0,
      showTable: false,
      tableData: [
        { corpId: 1,
          num: 2
        },
        { corpId: 2,
          num: 0
        }
      ],
      tableHeader: [
        {
          prop: 'corpId',
          label: '应用名称'
          // width: '160'
        },
        {
          prop: 'name',
          label: 'Appid'
          // width: '160'
        },
        {
          prop: 'num',
          label: '购套数量'
          // width: '160'
        },
        {
          prop: 'name',
          label: '每分钟访问限制'
          // width: '160'
        },
        {
          prop: 'name',
          label: '状态'
          // width: '160'
        },
        {
          prop: 'name',
          label: '创建时间'
          // width: '160'
        }
      ],
      input: '',
      value: '',
      options: [],
      visible: false
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
      console.log(data)
      this.$router.push({
        path: '/inter/interfaceDetail',
        query: {
          id: data.id
        }
      })
    },
    buyDetail(data) {
      console.log(data)
      this.visible = true
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
