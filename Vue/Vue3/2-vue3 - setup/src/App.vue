<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <h2>姓名：{{name }}</h2>
  <h2>年龄：{{age}}</h2>
  <button @click="say">说话</button>

</template>

<script>
import { h } from 'vue'

export default {
  name: 'App',
  components: {},
  setup() {
    let name = '小明'
    let age = 18

    function say() {
      alert(`我是${name},我${age}岁了`)
    }

    //返回一个对象
    return {
      name,
      age,
      say,
    }

    //返回一个渲染函数
    // return () => h('h1', '尚硅谷')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
