<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')
export default {
  name: 'HomeLineChart',
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '10px',
          right: '10px',
          bottom: '0%',
          width: 'auto',
          height: '100%'
        //   containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      }
    }
  },
  mounted() {
    const erd = elementResizeDetectorMaker()
    const that = this
    erd.listenTo(document.getElementById('chart'), function(element) {
      that.$nextTick(() => {
        // 使echarts尺寸重置
        that.$refs.chart.resize()
      })
    })
  }
}
</script>

<style scoped>
    /deep/ .echarts{
        width: 130px;
        height: 127px;
    }
</style>
