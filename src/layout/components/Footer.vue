<template>
  <div class="footer">
    <div>
      {{ systemConfig.footer }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  computed: {
    ...mapGetters([
      'systemConfig'
    ])
  }
}
</script>

<style scoped>
  .footer {
    font-size: 13px;
    bottom: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
</style>

