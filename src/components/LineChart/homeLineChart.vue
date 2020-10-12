<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')
export default {
  name: 'HomeLineChart',
  props: {
    toptraffice: {
      type: Array,
      default: null
    },
    cumulativelist: {
      type: Array,
      default: null
    }
  },
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
          top: '10px',
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
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        series: {
          name: '访问量',
          type: 'line',
          stack: '总量',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(246, 126, 131)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgb(253, 236, 237)' // 100% 处的颜色
              }]
            }
          },
          data: []
        }
      }
    }
  },
  watch: {
    toptraffice() {
      this.homeVisit()
    },
    cumulativelist() {
      this.cumulVistit()
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
    if (this.toptraffice) {
      this.homeVisit()
    } else {
      this.cumulVistit()
    }
  },
  methods: {
    // 今日访问量
    homeVisit() {
      this.options.xAxis[0].data = []
      this.options.series.data = []
      this.toptraffice.forEach(item => {
        if (item.key.split('')[0] === '0') {
          item.key = item.key.split('')[1] + ':00'
        } else {
          item.key = item.key + ':00'
        }
        this.options.xAxis[0].data.push(item.key)
        this.options.series.data.push(item.totalCount)
      })
    },
    // 累计访问
    cumulVistit() {
      this.options.xAxis[0].data = []
      this.options.series.data = []
      this.cumulativelist.forEach(item => {
        this.options.xAxis[0].data.push(item.key)
        this.options.series.data.push(item.totalCount)
      })
    }
  }
}
</script>

<style scoped>
    /deep/ .echarts{
        width: 130px;
        height: 127px;
    }
</style>
