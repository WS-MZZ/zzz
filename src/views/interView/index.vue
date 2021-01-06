<template>
<div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InterView',
  components: {
  },
  data() {
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap',
      'theme'
    ])
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
  .company-list {
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
  .hands {
    cursor: pointer;
  }
</style>
