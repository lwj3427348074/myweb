import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Table, TableColumn, Loading } from 'element-ui';

Vue.config.productionTip = false

Vue.use(Table).use(TableColumn).use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
