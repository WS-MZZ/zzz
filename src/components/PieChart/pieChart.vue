<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize style="width:auto;" />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'PieChart',
  components: {},
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          transitionDuration: 0// echart防止tooltip的抖动
        },
        series: [
          {
            type: 'pie',
            radius: [30, 110],
            center: ['75%', '50%'],
            roseType: 'area',
            label: {
              show: false
            },
            labelLine: {
              length: 1
            },
            data: [
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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

</style>
