<template>
  <div>
    <el-dialog :visible="visible" class="dialog-dialog" title="购套配置" width="45%" @close="cancle">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['已选择企业', '可选择企业']"
        :button-texts="['加入左边', '加入右边']"
        :data="data"
        @change="handleChange"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancle">取消</el-button>
        <el-button type="primary" :loading="loading" size="small" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'BuyDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [],
      loading: false
    }
  },
  mounted() {
  },
  methods: {
    confirm() {
      this.clear()
      this.$emit('update:visible', false)
    },
    cancle() {
      this.clear()
      this.$emit('update:visible', false)
    },
    clear() {

    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-transfer__buttons {
    .el-button{
      display: block;
    }
    .el-button+.el-button{
      margin-left: 0;
      width: 117px;
    }
  }
</style>
