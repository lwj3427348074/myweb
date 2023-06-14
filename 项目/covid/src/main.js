import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入css初始化样式
import '@/assets/css/common.css'

import Echarts from '@/plugins/echarts.js'
import '../node_modules/echarts/map/js/china.js'
import '../node_modules/echarts/map/js/world.js'
import '@/plugins/province.js'

// 自定义Tabs组件
import Tabs from '@/components/tabs/index.js'

import '@/plugins/vant.js'

// 用use使用插件
Vue.use(Echarts)
Vue.use(Tabs)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
