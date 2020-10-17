<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="right">
        <avatarUpload ref="avatarUpload" />
        <personalDetails ref="personalDetails" :is-edit="isEdit" @submit="submit" />
      </div>
    </div>
  </div>
</template>

<script>
import avatarUpload from './modules/avatarUpload.vue'
import personalDetails from './modules/personalDetails'

export default {
  name: 'PersonalInfo',
  components: {
    avatarUpload,
    personalDetails,
  },
  data() {
    return {
      isEdit: true,
    }
  },
  computed: {},
  methods: {
    submit(data) {
      this.isEdit = data
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    /*padding: 15px;*/
    height: 100%;
    overflow: auto;
    background-color: #fff;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    display: flex;
    height: 100%;
    .left {
      height: 100%;
      width: 300px;
      background-color: #fff;
      border-radius: 5px;
      margin-right: 5px;
    }
    .right {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      margin-left: 30px;
    }
  }
}
</style>
