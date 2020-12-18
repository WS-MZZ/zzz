<template>
  <div v-if="authMap.interfaceDoc.interfaceDocList.show" style="margin-bottom: 20px;">
    <div class="layout-module interfaceDocumentation">
      <div class="menu-nav block-wrapper">
        <el-row class="tac">
          <el-col :span="20">
            <div class="detail-title">功能说明</div>
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-submenu index="1">
                <template slot="title">
                  <span>公共类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1" @click="selectMod('UploadFile')">上传单个文件</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>合同类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="17" @click="selectMod('AddSales')">新增销售合同</el-menu-item>
                  <el-menu-item index="14" @click="selectMod('ModifySales')">修改销售合同</el-menu-item>
                  <el-menu-item index="15" @click="selectMod('AddPurash')">新增采购合同</el-menu-item>
                  <el-menu-item index="16" @click="selectMod('ModifyPurash')">修改采购合同</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <span>发票类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6" @click="selectMod('InterfaceContent')">新增发票</el-menu-item>
                  <el-menu-item index="7" @click="selectMod('ModifyInvoice')">修改发票</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <span>订单类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="8" @click="selectMod('AddPurashOrder')">新增采购订单</el-menu-item>
                  <el-menu-item index="9" @click="selectMod('ModifyPurashOrder')">修改采购订单</el-menu-item>
                  <el-menu-item index="10" @click="selectMod('AddSalesOrder')">新增销售订单</el-menu-item>
                  <el-menu-item index="11" @click="selectMod('ModifySalesOrder')">修改销售订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <span>报销类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="12" @click="selectMod('addReimbursement')">新增报销单</el-menu-item>
                  <el-menu-item index="13" @click="selectMod('modifyReimbursement')">修改报销单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!--  -->
      <div class="menu-detail block-wrapper">
        <!-- <interface-content :isshow="isshow" />
        <a-a :isshows="isshows" /> -->
        <component :is="zz" />
      </div>
    </div>
  </div>
</template>

<script>
import InterfaceContent from '@/views/interfaceDocumentation/modules/interfaceContent'
import ModifyInvoice from '@/views/interfaceDocumentation/modules/modifyInvoice'
import AddPurash from '@/views/interfaceDocumentation/modules/addPurash'
import ModifyPurash from '@/views/interfaceDocumentation/modules/modifyPurash'
import AddPurashOrder from '@/views/interfaceDocumentation/modules/addPurashOrder'
import ModifyPurashOrder from '@/views/interfaceDocumentation/modules/modifyPurashOrder'
import AddSales from '@/views/interfaceDocumentation/modules/addSales'
import ModifySales from '@/views/interfaceDocumentation/modules/modifySales'
import AddSalesOrder from '@/views/interfaceDocumentation/modules/addSalesOrder'
import ModifySalesOrder from '@/views/interfaceDocumentation/modules/modifySalesOrder'
import addReimbursement from '@/views/interfaceDocumentation/modules/addReimbursement'
import modifyReimbursement from '@/views/interfaceDocumentation/modules/modifyReimbursement'
import UploadFile from '@/views/interfaceDocumentation/modules/uploadFile'
import { mapGetters } from 'vuex'
export default {
  name: 'InterfaceDocumentation',
  components: {
    InterfaceContent,
    ModifyInvoice,
    AddPurash,
    ModifyPurash,
    AddPurashOrder,
    ModifyPurashOrder,
    AddSales,
    ModifySales,
    AddSalesOrder,
    addReimbursement,
    modifyReimbursement,
    UploadFile,
    ModifySalesOrder
  },
  data() {
    return {
      zz: sessionStorage.getItem('interComponentName') || 'InterfaceContent',
      defaultActive: sessionStorage.getItem('interIndex') || '1'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ])
  },
  methods: {
    handleSelect(index) {
      this.defaultActive = index
      sessionStorage.setItem('interIndex', index)
    },
    selectMod(name) {
      this.zz = name
      sessionStorage.setItem('interComponentName', name)
    }
    // gointerfaceDetail(index) {
    //   console.log(index)
    // }
  }
}
</script>

<style>
.interfaceDocumentation .el-submenu__title{
  height: 40px !important;
  line-height: 40px !important;
}
</style>
<style lang="scss" scoped>
.el-menu-item{
  margin-bottom: 8px !important;
}
.el-submenu .el-menu-item{
  height: 40px !important;
  line-height: 40px !important;
}
.detail-title {
  font-weight: 600;
  padding: 10px 0px;
  margin-bottom: 10px;
}
.layout-module {
  display: flex;
  // height: 100%;
  .menu-nav {
    width: 13%;
    min-width: 231px;
    margin-right: 10px;
    padding-left: 40px;
  }
  .menu-detail {
   width:87%;
  }
}
.el-menu{
    border-right: none;
}
.el-submenu .el-menu-item {
  margin-bottom: 10px;
  min-width: 140px;
}
.app-main[data-v-078753dd]{
  overflow:scroll;
  //overflow: auto;
}
body {
  overflow: visible !important;
}
.zz{
  display: block;
}
#app .hideSidebar .el-submenu ::v-deep .el-submenu__title .el-submenu__icon-arrow{
  display: block;
}
</style>
