<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f2f2;
  padding: 15px;
  overflow-y: auto;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
// 白底圆角div
.block-wrapper {
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
}
// 所有的横条搜索框
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
</style>
