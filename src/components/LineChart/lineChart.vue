<template>
  <div id="chart">
    <chart ref="chart" :options="options" auto-resize @legendselectchanged="legendselectchanged" />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'LineChart',
  data() {
    return {
      selected: {},
      options: {
        title: { text: '接口访问统计' },
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true
          },
          {
            name: '失败次数',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true
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
  },
  methods: {
    legendselectchanged(params) {
      // console.log(params);
      if (params.name == '全选') {
        for (const key in params.selected) {
          if (params.selected[params.name] == false) {
            const selected = params.selected
            selected[key] = false
            this.options.legend.selected = selected
            this.$refs.chart.mergeOptions(this.options, true)
          } else {
            const selected = params.selected
            selected[key] = true
            this.options.legend.selected = selected
            this.$refs.chart.mergeOptions(this.options, true)
          }
        }
      } else {
        if (params.selected[params.name] == false) {
          const selected = params.selected
          selected['全选'] = false
          this.options.legend.selected = selected
          this.$refs.chart.mergeOptions(this.options, true)
        } else {
          let list = []
          for (const key in params.selected) {
            if (params.selected[key] == true) {
              list = list.concat(params.selected[key])
            }
          }
          const len = this.options.series.length
          if (list.length == len - 1) {
            const selected = params.selected
            selected['全选'] = true
            this.options.legend.selected = selected
            this.$refs.chart.mergeOptions(this.options, true)
          }
        }
      }
    }
    // setOption (params) {
    //     this.options.series = params;
    //     this.$refs.chart.mergeOptions(this.options, true);
    // }
  }
}
</script>

<style scoped>
    /deep/ .echarts{
        width: 100%;
    }
</style>
