<template>
<div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Interface',
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
