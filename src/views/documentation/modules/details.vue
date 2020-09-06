<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="block-wrapper basic-info">
          <div class="title">
            基础信息
          </div>
          <div class="content">
            <div class="item">
              <div class="label">
                <span>adfsdf</span>
              </div>
              <div class="semi">:</div>
              <div class="value">
                <span>测试数据</span>
              </div>
            </div>
            <div class="item">
              <div class="label">
                <span>adfsdf</span>
              </div>
              <div class="semi">:</div>
              <div class="value">
                <span>测试数adfa</span>
              </div>
            </div>
            <div class="item">
              <div class="label">
                <span>adfsdf阿斯顿发送到发送奋斗</span>
              </div>
              <div class="semi">:</div>
              <div class="value">
                <span>测试数adfasdfa</span>
              </div>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="top">
          <div class="block-wrapper fg1" style="margin-bottom: 6px;">
            <div class="title">
              拓展信息
            </div>
            <div class="content">
              <div class="item" style="width: 100%;">
                <div class="label" style="text-align: initial;width: 20%;">
                  <span>adfs</span>
                </div>
                <div class="semi">:</div>
                <div class="value">
                  <span>测试数据</span>
                </div>
              </div>

              <div class="item" style="width: 100%;">
                <div class="label" style="text-align: initial;width: 20%;">
                  <span>adfsdfadf</span>
                </div>
                <div class="semi">:</div>
                <div class="value">
                  <span>测试数据</span>
                </div>
              </div>
            </div>
          </div>
          <div class="block-wrapper fg1">
            <div class="title">
              标签
            </div>
            <div class="tag-content">
              <el-button class="mb5" type="primary" size="small">标签1</el-button>
              <el-button class="mb5" type="primary" size="small">标签1adfasdfsdf</el-button>
              <el-button class="mb5" type="primary" size="small">标签1adfasdfsdfsdfsdfsdf</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data() {
    return {
      a: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-info {
  height: 500px;
}
.top {
  height: 500px;
  display: flex;
  flex-flow: column;
}
.content {
  margin-top: 10px;
  display: flex;
  flex-flow: column wrap;
  .item {
    width: 50%;
    display: flex;
    align-items: baseline;
    margin-bottom: 5px;
    .label {
      width:29%;
      display: inline-block;
      text-align: right;
      word-wrap:break-word;
    }
    .semi {
      width:1%;
      display: inline-block;
    }
    .value {
      width:70%;
      display: inline-block;
      word-wrap:break-word;
      margin-left: 10px
    }
  }
}
.tag-content {
  margin-top: 10px;
}
</style>
