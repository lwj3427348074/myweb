<template>
  <h1>姓名{{ person.name }}</h1>
  <h1>年龄{{ person.age }}</h1>
  <h1>薪资{{ person.jaray.j1 }}</h1>
  <button @click="person.name+='~'">改名</button>
  <button @click="person.age++"> 年龄+1</button>
  <button @click="person.jaray.j1++"> 涨薪+1</button>
</template>

<script>
import { reactive, watch } from 'vue'
export default {
  name: 'Demo',
  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      jaray: {
        j1: 3000,
      },
    })

    watch(
      () => person.jaray,
      (newV, oldV) => {
        console.log(newV, oldV)
      },
      { deep: true }
    )

    return {
      person,
    }
  },
}
</script>

<style>
</style>