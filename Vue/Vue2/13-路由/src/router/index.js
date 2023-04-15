//该文件用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail.vue'


export default new VueRouter({
  routes: [//这里是routes，不是router也不是routers
    {
      name: 'about',
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'detail',
              path: 'detail',
              component: Detail,
            },
          ]
        },
      ]
    }
  ]
})