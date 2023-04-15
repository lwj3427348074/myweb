<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader @addTodo="addTodo" />
      <MyList :todos="todos"></MyList>
      <MyFooter
        :todos="todos"
        @checkAllTodo="checkAllTodo"
        @clearAllTodo="clearAllTodo"
      ></MyFooter>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import MyHeader from './components/MyHeader'
import MyList from './components/MyList'
import MyFooter from './components/MyFooter'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
    }
  },
  methods: {
    //添加一个todo
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    //勾选或取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((item) => {
        if (item.id === id) {
          item.done = !item.done
        }
      })
    },
    //删除
    deleteTodo(_, id) {
      this.todos = this.todos.filter((item) => {
        return item.id !== id
      })
    },
    //全选 or 取消全选
    checkAllTodo(done) {
      this.todos.forEach((item) => {
        item.done = done
      })
    },
    //清除所有已经完成的todo
    clearAllTodo() {
      this.todos = this.todos.filter((item) => {
        return !item.done
      })
    },
    //修改todo
    updateTodo(id, val) {
      this.todos.forEach((item) => {
        if (item.id === id) {
          item.title = val
        }
      })
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(val) {
        localStorage.setItem('todos', JSON.stringify(val))
      },
    },
  },
  mounted() {
    this.$bus.$on('checkTodo', this.checkTodo)
    // this.$bus.$on('deleteTodo', this.deleteTodo)
    this.pubId = PubSub.subscribe('deleteTodo', this.deleteTodo)
    this.$bus.$on('updateTodo', this.updateTodo)
  },
  beforeDestroy() {
    this.$bus.$off('checkTodo')
    // this.$bus.$off('deleteTodo')
    PubSub.unsubscribe(pubId)
    this.$bus.$off('updateTodo')
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
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(92, 141, 160);
  margin-right: 5px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
