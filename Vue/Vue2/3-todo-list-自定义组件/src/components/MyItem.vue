<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="itodos.done"
        @change="handleCheck(todos.id)"
      >
      <!-- 以下代码也能实现功能，但是不太推。因为有点违反原则，因为修改了props -->
      <!-- 
        <input
        type="checkbox"
        v-model="itodos.done"
      > -->
      <span>{{itodos.title}}</span>
    </label>
    <button
      class="btn btn-danger"
      @click="handleDelete(todos.id)"
    >删除</button>
  </li>
</template>

<script>
export default {
  name: 'MyItem',
  props: ['todos', 'checkTodo', 'deleteTodo'],
  data() {
    return {
      itodos: this.todos,
    }
  },
  methods: {
    handleCheck(id) {
      this.checkTodo(id)
    },
    handleDelete(id) {
      if (confirm('确定删除吗')) {
        this.deleteTodo(id)
      }
    },
  },
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
</style>