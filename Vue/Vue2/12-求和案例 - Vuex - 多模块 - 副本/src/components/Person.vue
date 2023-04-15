<template>
  <div>
    <h2>人员列表</h2>
    <h4>上方组件的求和为{{sum}}</h4>
    <h4>列表第一个人{{firstPersonName}}</h4>
    <input
      type="text"
      placeholder="请输入名字"
      v-model.trim="name"
      ref="inp"
    >
    <br>
    <button @click="addPerson(name)">添加</button>
    <br>
    <button @click="addPersonWang(name)">添加姓王的</button>
    <button @click="addPersonServer">服务器添加</button>
    <ul>
      <li
        v-for="p in personList"
        :key="p.id"
      >{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data() {
    return {
      name: '',
    }
  },
  computed: {
    personList() {
      return this.$store.state.person.personList
    },
    sum() {
      return this.$store.state.count.sum
    },
    firstPersonName() {
      return this.$store.getters['person/firstPersonName']
    },
  },
  methods: {
    addPerson(val) {
      // this.$store.state.person.personList.push({ id: nanoid(), name: val })
      this.$store.commit('person/addPerson', val)
      this.name = ''
    },
    addPersonWang(val) {
      this.$store.dispatch('person/addPersonWang', val)
      this.name = ''
    },
    addPersonServer() {
      this.$store.dispatch('person/addPersonServer')
    },
  },
  mounted() {
    console.log(this.$store)
  },
}
</script>

<style scoped>
div {
  background-color: skyblue;
}
</style>