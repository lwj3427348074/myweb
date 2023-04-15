<template>
  <div>
    <h2>sun的值是：{{ sum }}</h2>
    <h4>sun放大10倍的值是：{{ bigSum }}</h4>
    <h4>我在{{school}}学习{{subject}}</h4>
    <hr>
    <select
      id=""
      v-model.number="n"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">奇数的时候才能加</button>
    <button @click="incrementWait">过一会儿再加</button>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['sum', 'school', 'subject']),
    ...mapGetters(['bigSum']),
  },
  name: 'Count',
  data() {
    return {
      n: 1,
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', this.n)
    },
    decrement() {
      this.$store.commit('decrement', this.n)
    },
    incrementOdd() {
      this.$store.dispatch('incrementOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('incrementWait', this.n)
    },
  },
}
</script>

<style>
button {
  margin-left: 5px;
}
</style>