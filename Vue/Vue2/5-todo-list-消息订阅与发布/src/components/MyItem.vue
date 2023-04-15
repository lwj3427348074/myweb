<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="itodo.done"
        @change="handleCheck(todo.id)"
      >
      <!-- 以下代码也能实现功能，但是不太推。因为有点违反原则，因为修改了props -->
      <!-- 
        <input
        type="checkbox"
        v-model="itodos.done"
      > -->
      <span v-show="!todo.isEdit">{{todo.title}}</span>
      <input
        type="text"
        v-show="todo.isEdit"
        :value="todo.title"
        ref="inp"
        @blur="handleBlur(todo,$event)"
      >
    </label>

    <button
      class="btn btn-danger"
      @click="handleDelete(todo.id)"
    >删除</button>
    <button
      class="btn btn-edit"
      @click="handleEdit(todo)"
      v-show="!todo.isEdit"
    >编辑</button>
  </li>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'MyItem',
  props: ['todo'],
  data() {
    return {
      itodo: this.todo,
    }
  },
  methods: {
    handleCheck(id) {
      // this.checkTodo(id)
      this.$bus.$emit('checkTodo', id)
    },
    handleDelete(id) {
      if (confirm('确定删除吗')) {
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo', id)
        PubSub.publish('deleteTodo', id)
      }
    },
    //编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(() => this.$refs.inp.focus())
    },
    handleBlur(todo, e) {
      todo.isEdit = false
      if (e.target.value.trim()) {
        this.$bus.$emit('updateTodo', todo.id, e.target.value)
      } else alert('不能为空')
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