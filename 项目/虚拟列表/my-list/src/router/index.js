import Vue from 'vue'
import VueRouter from 'vue-router'
import firstList from '../views/firstList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'firstList',
    component: firstList
  },
  {
    path: '/secondList',
    name: 'secondList',
    component: () =>
      import(/* 懒加载 */ '../views/secondList.vue'),
  },
  {
    path: '/thirdList',
    name: 'thirdList',
    component: () =>
      import(/* 懒加载 */ '../views/thirdList.vue'),
  },
  {
    path: '/share',
    name: 'shareFn',
    component: () =>
      import(/* 懒加载 */ '../views/shareFn.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
