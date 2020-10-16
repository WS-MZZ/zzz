<template>
  <div>
    <div class="documentTabs">
      <el-radio-group v-model="activeTab">
        <el-radio-button label="invoice">发票</el-radio-button>
        <el-radio-button label="purchase">采购合同</el-radio-button>
        <el-radio-button label="sale">销售合同</el-radio-button>
        <el-radio-button label="order">销售订单</el-radio-button>
        <el-radio-button label="purchaseOrder">采购订单</el-radio-button>
      </el-radio-group>
    </div>
    <Invoice v-if="activeTab === 'invoice'" />
  </div>
</template>

<script>
import Invoice from './modules/invoice'
export default {
  name: 'Interface',
  components: {
    Invoice
  },
  data() {
    return {
      activeTab: 'invoice'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .documentTabs {
    margin-bottom: 15px;
  }
  .config-column {
    display: flex;
  }
  .filter-container {
    display: flex;
    flex-flow: column wrap;
    height: 200px;
  }
</style>
