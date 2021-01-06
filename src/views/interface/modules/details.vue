<template>
<div></div>
</template>

<script>

import { mapGetters } from 'vuex'

// const defaultForm = {
//   name: '',
//   appId: '',
//   maxLimit: ''
// }

export default {
  name: 'PersonalInfo',
  components: {
  },
  data() {
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'authMap'
    ])
  }
}
</script>

