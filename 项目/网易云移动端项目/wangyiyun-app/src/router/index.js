import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/Login.vue')
  // },
  // {
  //   path: '/infoUser',
  //   name: 'InfoUser',
  //   beforeEnter: (to, from, next) => {
  //     if (store.state.isLogin || store.state.cookie || localStorage.getItem('token')) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   },
  //   component: () => import('../views/InfoUser.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from) => {
//   if (to.path == '/login') {
//     store.state.isFooterMusic = false
//   } else {
//     store.state.isFooterMusic = true
//   }
// })
export default router
