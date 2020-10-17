<template>
  <div id="chart" class="chart">
    <chart ref="chart" :options="options" auto-resize />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'LineChart',
  props: {
    todaylist: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selected: {},
      options: {
        tooltip: {
          trigger: 'axis',
          position: function(pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = { top: 10 }
            obj[['right', 'left'][+(pos[0] < size.viewSize[0] / 2)]] = 300
            return obj
          },
          extraCssText: 'background:rgba(0, 0, 0, 0.5);',
          formatter: function(param, ticket, callback) {
            // console.log(param);
            let res = param[0].axisValue + '<br/>'
            let a = 1
            for (var i = 0, length = param.length; i < length; i++) {
              if (a < param.length) {
                res += param[i].marker + param[i].seriesName + '：' + param[i].data + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
                                        param[a].marker + param[a].seriesName + '：' + param[a].data + '<br/>'
                i = a++
                a++
              } else {
                res += param[i].marker + param[i].seriesName + '：' + param[i].data + '<br/>'
              }
            }
            return res
          },
          transitionDuration: 0// echart防止tooltip的抖动
        },
        legend: {
          top: 5,
          left: 140,
          padding: 5,
          data: ['访问次数', '失败次数']
        },
        grid: {
          left: '2%',
          right: '1%',
          width: '95%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        dispatchAction: {
          type: 'legendselectchanged',
          selected: {}
        },
        series: [
          {
            name: '访问次数',
            type: 'line',
            data: [],
            smooth: true
          },
          {
            name: '失败次数',
            type: 'line',
            data: [],
            smooth: true
          }
        ]
      }
    }
  },
  watch: {
    todaylist() {
      this.visitContent()
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
    this.visitContent()
  },
  methods: {
    // legendselectchanged(params) {
    //   // console.log(params);
    //   if (params.name === '全选') {
    //     for (const key in params.selected) {
    //       if (params.selected[params.name] === false) {
    //         const selected = params.selected
    //         selected[key] = false
    //         this.options.legend.selected = selected
    //         this.$refs.chart.mergeOptions(this.options, true)
    //       } else {
    //         const selected = params.selected
    //         selected[key] = true
    //         this.options.legend.selected = selected
    //         this.$refs.chart.mergeOptions(this.options, true)
    //       }
    //     }
    //   } else {
    //     if (params.selected[params.name] == false) {
    //       const selected = params.selected
    //       selected['全选'] = false
    //       this.options.legend.selected = selected
    //       this.$refs.chart.mergeOptions(this.options, true)
    //     } else {
    //       let list = []
    //       for (const key in params.selected) {
    //         if (params.selected[key] == true) {
    //           list = list.concat(params.selected[key])
    //         }
    //       }
    //       const len = this.options.series.length
    //       if (list.length == len - 1) {
    //         const selected = params.selected
    //         selected['全选'] = true
    //         this.options.legend.selected = selected
    //         this.$refs.chart.mergeOptions(this.options, true)
    //       }
    //     }
    //   }
    // },
    // setOption (params) {
    //     this.options.series = params;
    //     this.$refs.chart.mergeOptions(this.options, true);
    // }
    visitContent() {
      this.options.xAxis.data = []
      this.options.series[0].data = []
      this.options.series[1].data = []
      if (this.todaylist === '' || null) {
        return
      } else {
        this.todaylist.forEach(item => {
          if (item.key.split('')[0] === '0') {
            item.key = item.key.split('')[1] + ':00'
          } else {
            item.key = item.key + ':00'
          }
          this.options.xAxis.data.push(item.key)
          this.options.series[0].data.push(item.totalCount)
          this.options.series[1].data.push(item.failCount)
        })
      }
    }
  }
}
</script>

<style scoped>
.chart{
  height: 433px
}
    /deep/ .echarts{
        width: 100%;
    }
</style>
