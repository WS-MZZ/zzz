<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')
export default {
  name: 'InterfaceBarChart',
  props: {
    enterpiselist: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      options: {
        title: { text: '适用企业及访问量统计排名' },
        xAxis: {
          splitLine: { show: false }, // 去除网格线
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: { show: false
          },
          show: false
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: [],
          splitLine: { show: false },
          axisTick: { // y轴刻度线
            show: false
          },
          axisLine: { show: false
          },
          axisLabel: {
            color: 'black',
            formatter: function(params, index) {
              return (index + 1) + '     ' + params
            },
            textStyle: {
              align: 'left', // 设置左对齐
              baseline: 'middle',
              fontSize: 16
            },
            margin: 200
          }
        },
        grid: {
          left: '13%',
          right: '0%',
          width: '95%',
          bottom: '20%',
          containLabel: false
        },
        series: [{
          data: [],
          type: 'bar',
          yAxisIndex: 0,
          label: {
            show: true,
            position: 'right',
            color: 'black',
            fontSize: 16
          },
          itemStyle: {
            color: 'rgb(37, 148, 253)'
          }
        }]
      }
    }
  },
  watch: {
    enterpiselist() {
      this.enterpriseContent()
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
    this.enterpriseContent()
  },
  methods: {
    enterpriseContent() {
      console.log(this.enterpiselist)
      this.enterpiselist.forEach(item => {
        console.log(item)
        this.options.yAxis.data.push(item.key)
        this.options.series[0].data.push(item.totalCount)
      })
    }
  }
}
</script>

<style scoped>
 /deep/ .echarts{
        width: 100%;
    }
</style>
