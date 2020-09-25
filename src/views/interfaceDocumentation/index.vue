<template>
  <div class="app-main">
    <div class="layout-module">
      <div class="menu-nav block-wrapper">
        <el-row class="tac">
          <el-col :span="20">
            <h5>功能说明</h5>
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-submenu index="1">
                <template slot="title">
                  <span>合同类</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1" @click="selectMod('InterfaceContent')">新增发票</el-menu-item>
                  <el-menu-item index="2" @click="selectMod('ModifyInvoice')">修改发票</el-menu-item>
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
export default {
  name: 'InterfaceDocumentation',
  components: {
    InterfaceContent,
    ModifyInvoice
  },
  data() {
    return {
      zz: sessionStorage.getItem('interComponentName') || 'InterfaceContent',
      defaultActive: sessionStorage.getItem('interIndex') || '1'
    }
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

<style lang="scss" scoped>
.layout-module {
  display: flex;
  // height: 100%;
  .menu-nav {
    width: 13%;
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
.app-main{
  overflow:scroll ;
}
</style>
