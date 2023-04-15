//该文件用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail.vue'


const router = new VueRouter({
  mode: 'history',
  routes: [//这里是routes，不是router也不是routers
    {

      name: 'guanyu',
      path: '/about',
      component: About,
      meta: {
        isAuth: true,
        title: '关于'
      }
    },
    {
      name: 'zhuye',
      path: '/home',
      component: Home,
      meta: {
        isAuth: true,
        title: '主页'
      },
      children: [
        {
          name: 'xinwen',
          path: 'news',
          component: News,
          meta: {
            title: '新闻'
          },
          //独享路由守卫
          beforeEnter(to, from, next) {
            console.log('我是新闻独享前置路由守卫我来自：', from, '我要去：', to);
            // if (to.path === '/home/news' || to.path === '/home/message') {
            // if (to.name === 'xinwen' || to.name === 'xinxi') {
            if (!to.meta.isAuth) {
              if (localStorage.getItem('school') === 'atguigu') {
                next()
              }
            } else {
              next()
            }

          }
        },
        {
          name: 'xinxi',
          path: 'message',
          component: Message,
          meta: {
            title: '信息'
          },
          children: [
            {
              name: 'detail',
              path: 'detail/:id/:title',
              component: Detail,
              meta: {
                title: '详情'
              },
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

//全局前置路由守卫--初始化和每次切换路由前都会被调用
//在每一次路由切换之前都调用这个函数
router.beforeEach((to, from, next) => {
  console.log('我是前置路由守卫我来自：', from, '我要去：', to);

  // if (to.path === '/home/news' || to.path === '/home/message') {
  // if (to.name === 'xinwen' || to.name === 'xinxi') {
  if (!to.meta.isAuth) {
    if (localStorage.getItem('school') === 'atguigu') {
      next()
    }
  } else {
    next()
  }
})

//全局后置路由守卫--初始化和每次切换路由后都会被调用
//在每一次路由切换之前都调用这个函数
router.afterEach((to, from) => {
  console.log('我是后置路由守卫我来自：', from, '我要去：', to);
  document.title = to.meta.title || '硅谷'
})

export default router