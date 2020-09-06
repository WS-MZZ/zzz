<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="left">
        <avatarUpload ref="avatarUpload" />
      </div>

      <div class="right">
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
    personalDetails
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {},
  methods: {
    submit(data) {
      this.isEdit = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      /*padding: 15px;*/
      height: 100%;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
      display: flex;
      height: 100%;
      .left{
        height: 100%;
        width: 300px;
        background-color: #fff;
        border-radius: 5px;
        margin-right: 5px;
      }
      .right{
        height: 100%;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
</style>
