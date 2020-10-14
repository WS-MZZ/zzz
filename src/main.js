import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import IEcharts from 'vue-echarts/components/ECharts'
import echart from 'echarts'
import 'echarts/lib/chart/line' // 折线图
import 'echarts/lib/chart/bar' // 柱状图
import 'echarts/lib/chart/pie' // 柱状图
import 'echarts/lib/chart/funnel' // 柱状图
import 'echarts/lib/component/legend' // 图例
import 'echarts/lib/component/tooltip' // 提示
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title' // 图表标
import 'echarts/lib/component/dataZoom' // 图表标
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

Vue.component('chart', IEcharts)
Vue.component('echart', echart)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
