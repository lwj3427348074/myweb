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
              path: 'detail/:id/:title',
              component: Detail,

              //第一种写法,该对象的所有key-value都会以props形式传给detail
              // props: {
              //   a: 1, b: 2 //数不能变，死数据
              // }

              //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
              // props:true

              //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
              props(route) {
                return {
                  id: route.query.id,
                  title: route.query.title
                }
              }
            },
          ]
        },
      ]
    }
  ]
})