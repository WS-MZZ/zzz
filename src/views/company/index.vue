<template>
<div></div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'Company',
  components: {
    KgTable
  },
  data() {
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap',
      'theme'
    ])
  },
  mounted() {
  }
}
</script>

