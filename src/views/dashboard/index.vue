<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页内容</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
