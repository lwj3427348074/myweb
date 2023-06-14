import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home.vue'
import City from '@/views/City.vue'
import SpringView from '@/views/SpringView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path:'/city/:city',
    name:'City',
    component: City,
    props:true
  },
  {
    path:'/spring/:citys',
    name:'SpringView',
    component: SpringView,
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
