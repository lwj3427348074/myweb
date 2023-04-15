<template>
  <div>
    <h2>sun的值是：{{sum }}</h2>
    <h4>sun放大10倍的值是：{{ bigSum }}</h4>
    <h4>我在{{school}}学习{{subject}}</h4>
    <h4>总人数是{{ personList.length}}</h4>
    <hr>
    <select
      id=""
      v-model.number="n"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">奇数的时候才能加</button>
    <button @click="incrementWait(n)">过一会儿再加</button>
  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('count', ['sum', 'school', 'subject']),
    ...mapState('person', ['personList']),
    //...mapGetters({'bigSum':'bigSum'}),
    ...mapGetters('count', ['bigSum']),
  },
  name: 'Count',
  data() {
    return {
      n: 1,
    }
  },
  methods: {
    // increment() {
    //   this.$store.commit('increment', this.n)
    // },
    // increment() {
    //   this.$store.commit('第二个参数', 上面小括号里的n)
    // },
    ...mapMutations('count', ['increment', 'decrement']),
    ...mapActions('count', ['incrementOdd', 'incrementWait']),
  },
}
</script>

<style scoped>
div {
  background-color: green;
}
button {
  margin-left: 5px;
}
</style>