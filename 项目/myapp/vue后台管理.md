# 后台管理系统

![image-20221108084701961](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108084701961.png)



## 第一天

### npm和yarn

#### npm

![image-20221108091122782](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108091122782.png)

#### yarn

![image-20221108091142035](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108091142035.png)

![image-20221108091157132](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108091157132.png)

### vue项目的搭建流程

#### 单页面

![image-20221108091645664](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108091645664.png)

#### 脚手架

![image-20221108092010437](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221108092010437.png)

## 第二天

### 先结构,后样式,先把结构都搭起来

### elementui使用

#### 全局引用

#### 按需引用,体积小

![image-20221109135918446](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221109135918446.png)

报错,需要修改

![image-20221109140016299](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221109140016299.png)

引用成功

#### 学会从api的属性中找自己需要的功能

例如:默认展示:collapse=>true or false

![image-20221109152115161](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221109152115161.png)

#### Container 布局容器

#### Button 按钮

####  Icon 图标

####  NavMenu 导航菜单

### dist

打包成静态文件

### vue-router

#### 1.装包

#### 2.建router文件夹-index.js   views-组件

#### 3.在router-index.js中引入vue和vuerouter,用vue实例use(vuerouter)

1.创建路由组件

2.将路由与组件进行映射

3.创建router实例

4.将router挂载到vue实例上(main.js)

5.在App中使用routerview

### 嵌套路由

#### path:'/user/:id'

user:页面不变的地方

#### children:[{}]

子路由的路由出口routerview一定要记得加在主路由的vue中

#### 路由跳转

导航上的路由跳转,一般用click方法

在方法中this.$router.push(哈希路径)

##### $route:当前页面的路由

this$route.path: 当前页面的路由路径

##### $router:整个router实例

#### 重定向

![image-20221109165747307](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221109165747307.png)

### 导航栏

#### 数据

导航栏一般由数据渲染出来,所以菜单的数据一般都是单独存储到数据中,再渲染出来的

要注意循环遍历的时候把确定唯一值的属性用   :属性名='自定义遍历属性'  改过来,防止点别的导航栏都是第一个固定属性的元素

合理使用element属性,比如说添加到数据中直接遍历出来

### v-for循环遍历

#### :key=''item.id"

不一定是id,这里指的是可以确定唯一的属性,比如说name属性是唯一的,就可以用item.name

### css样式

height: 100vh;   高度占满

  font-weight: 400; 没有单位

### less

#### 在脚手架中自己配置less

```js
npm i less@4.1.2
npm i less-loader@6.0.0
```

安装之后可以直接使用

#### scoped

scoped的意思是当前样式只作用于当前页面

## 第三天

### vuex

#### 第18集复习

![image-20221110100057020](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221110100057020.png)

自行查看文档

#### 5个核心概念

自行查看文档

#### 使用

```js
npm i vuex@3.6.2
```

在src下创建src/store/index.js

```js
import Vue from "vue"
import Vuex from 'vuex'


Vue.use(Vuex)

// 创建Vuex的实例
new Vuex.Store({
    modules:{
    
  }

})
```

### elementui

####  Layout 布局

#### Dropdown 下拉菜单

#### Card 卡片

修改card的flex布局

```js
:body-style="{display:'flex'}
```

#### Breadcrumb 面包屑

### js

#### v-for可以用来遍历对象

```html
<el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val" />
```

#### 无key报错解决方法

文件--> 首选项--> 设置-->vetur validation template:去掉勾

#### ref

ref='name'  :可以通过this.$ref.name获取到该元素的dom节点

#### object.keys()

返回对象的枚举

### flex布局

display:flex

 justify-content: space-between;  沿主轴两端显示

​						justify-content: center;居中显示

align-items: center; 竖直垂直居中

flex-direction: column; 修改主轴方向

### axios

#### axios安装

```
npm i axios
```

新建src/utils/request.js

一定axios.create()

```js
import axios from "axios"

const http = axios.create({
  baseURL:'/api',
  // 超时时间
  timeout: 10000
})

// 在请求或响应被 then 或 catch 处理前拦截它们

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http
```

拦截器

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

新建src/api/index.js

### moke.js

是一个前端用来模拟后端接口的一个工具/库

通过拦截前端发起的请求自己定义一些数据,自己在不依赖后端的情况下可以实现自己的一个数据的交互

#### 安装

```js
npm i mockjs
```

新建/api/mock.js

```js
import Mock from 'mockjs'

//定义mock请求拦截,get方法可以省略'get'
Mock.mock('/home/getData','get',function(){
  //拦截到请求后的处理逻辑
  console.log('拦截到了');
})
```

在main.js中引入

### echarts

#### 安装

```js
npm i echarts@5.1.2
```

#### 使用

在home.vue直接引用

import *  as echarts from 'echarts'

## 第四天

### elementui

tags

dialog

form

自定义模板

## 第五天

### token

### cookie插件

用来保存token信息

```
npm i js-cookie@3.0.1
```

```
import Cookie from 'js-cookie'

```

![image-20221117113632987](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20221117113632987.png)

### Vuex的store

两种方法

#### this.$store.commit('setMenu',data.data.menu)

```
menuData() {
      return this.$store.state.tab.menu
    },
```



#### 辅助函数方法

### 做缓存的方法

#### cookie

#### localstory

