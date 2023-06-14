import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store/index.js'
import '@/api/mock.js'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI);

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //...token存不存在
  const token = Cookie.get('token')
  // token不存在，说明当前用户是未登录，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    // token说明用户登录，此时跳转到首页
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store, // this.$store

  render: h => h(App),
  // 刷新白屏
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
