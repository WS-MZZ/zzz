<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize style="width:auto;" />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'BarChart',
  components: {},
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis'
        },
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, 'Matcha Latte'],
            [57.1, 78254, 'Milk Tea'],
            [74.4, 41032, 'Cheese Cocoa'],
            [50.1, 12755, 'Cheese Brownie'],
            [89.7, 20145, 'Matcha Cocoa'],
            [68.1, 79146, 'Tea'],
            [19.6, 91852, 'Orange Juice'],
            [10.6, 101852, 'Lemon Juice'],
            [32.7, 20112, 'Walnut Brownie']
          ]
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '10%',
          width: '90%',
          bottom: '10',
          containLabel: true
        },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: '#20a0ff'
            },
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            label: {
              show: true,
              position: 'right'
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
