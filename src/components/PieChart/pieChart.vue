<template>
  <div id="chart">
    <chart
      ref="chart"
      :options="options"
      auto-resize
      style="width: auto; height: 300px"
    />
  </div>
</template>

<script>
const elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'PieChart',
  components: {},
  props: {
    distr: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          transitionDuration: 0 // echart防止tooltip的抖动
        },
        color: ['#F57A71', '#5CAFFF', '#FFEE7B'],
        series: [
          {
            type: 'pie',
            radius: [30, 65],
            center: ['60%', '50%'],
            // roseType: 'area',
            label: {
              show: false
            },
            labelLine: {
              length: 1
            },
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      dataList: []
    }
  },
  watch: {
    distr() {
      this.distributions()
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
    if (this.distr) {
      this.distributions()
    }
  },
  methods: {
    distributions() {
      this.distr.forEach((item) => {
        this.dataList.push({
          value: item.count,
          name: item.key
        })
        this.options.series[0].data = this.dataList
      })
    }
  }
}
</script>

<style scoped>
</style>
