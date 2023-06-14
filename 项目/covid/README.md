# Vue项目疫情展示

## 知识点
1. Vue基础知识
2. Axios网络请求
3. Echarts可视化
4. Swiper焦点轮播图
5. Vue-Router
6. 封装组件

## 效果参考地址
http://iwenwiki.com/webdoc/17Vue%E6%A8%A1%E5%9D%97/#%E9%A1%B9%E7%9B%AE%E7%9F%A5%E8%AF%86%E7%82%B9

## 可使用地址
用友：https://api.yonyoucloud.com/apilink/#/
天行：https://www.tianapi.com/

## 安装依赖
```js
npm install --save axios
```

## 开发过程中的思维方式
1. 在Vue框架中，是组件式开发，将组件分离的更加细致一点


## 关于组件实例化问题！
1. 拆分中组件之后，组件的多次调用，会每一次实例化一个独立的对象

## 打包
1. 打包命令
```js
npm run build
```
2. 打包之后预览
```js
npm install -g serve
serve -s dist
```
3. 跨域问题
    - 开发环境
        开发环境下的跨域处理，只能在开发环境下运行，打包之后是不能运行的
        proxy都是开发环境跨域
    - 生产环境
        cors(主)
        jsonp
4. 打包路径问题
    publicPath指定具体子路径信息
    ```js
    publicPath: process.env.NODE_ENV === 'production' ? '/covid19' : '/'
    ```

## Echars引入地图

## 下载版本:低于5.x版本

```js
npm i echarts@4.x -S --legacy-peer-deps
```

## 在Vue中使用Echarts有两种方案

1. 使用第三方封装好的Vue-Echarts
   - https://github.com/ecomfe/vue-echarts
2. 引入Echarts独立封装组件
   - 封装组件

## Echarts实例参考

- https://github.com/nickiwen/echarts/tree/master/example

# Tabs切换

## 渲染格式和使用格式

1. 渲染格式

```html
<div>  ---> tabs
    <ul>
        <li>tab1</li>
        <li>tab2</li>
        <li>tab2</li>
    </ul>
    <div>
        <div>内容1</div>
        <div>内容2</div>
        <div>内容3</div>
    </div>
</div>
```

2. 使用格式

```js
<tabs currentIndex="1" changeIndex="changeIndexHandle">
    <tab index="1" label="tab1">
        <div>内容1</div>
    </tab>
    <tab index="2" label="tab2">
        <div>内容2</div>
    </tab>
    <tab index="3" label="tab3">
        <div>内容3</div>
    </tab>
</tabs>
```

## 组件分离

tabs -> VueComponent
tab  -> VueComponent
content -> VueComponent
index.js -> 主入口组件文件

## 第三方组件方式全局引用

参考MyComponent

# 加载第三方Swiper

## Swiper参考地址

> https://github.com/surmon-china/vue-awesome-swiper

```js
npm install swiper@6.4.7 -S --legacy-peer-deps
npm install vue-awesome-swiper@4.1.1 -S --legacy-peer-deps
```

