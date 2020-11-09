<template>
  <div id="chart" class="chart">
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
            formatter: function(val, index) {
              var strs = val.split('') // 字符串数组
              var str = ''
              for (var i = 0, s; s = strs[i++];) { // 遍历字符串数组
                str += s
                if (!(i % 16)) str += '\n' // 按需要求余
              }
              return (index + 1) + ' ' + str
            },
            textStyle: {
              fontSize: 13
            }
          }
        },
        grid: {
          left: '30%',
          width: '50%',
          bottom: '20%',
          containLabel: false
        },
        series: [{
          data: [],
          type: 'bar',
          barWidth: '30px',
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
      this.options.yAxis.data = []
      this.options.series[0].data = []
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
.chart{
  height: 300px;
}
 /*/deep/ .echarts{*/
 /*       width: 90%;*/
 /*   }*/
</style>
