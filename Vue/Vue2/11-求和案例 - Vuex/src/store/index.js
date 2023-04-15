//改文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//准备actions用于响应组件中的动作
const actions = {
  incrementOdd(context, val) {
    if (context.state.sum % 2) {
      console.log('我是actions里的incrementOdd');
      context.commit('increment', val)
    }
  },
  incrementWait(context, val) {
    setTimeout(() => {
      console.log('我是actions里的incrementWait');
      context.commit('increment', val)
    }, 500)
  }
}

//准备mutations用于操作数据State
const mutations = {
  increment(state, val) {
    console.log('我是mutations里的increment');
    state.sum += val
  },
  decrement(state, val) {
    console.log('我是mutations里的decrement');
    state.sum -= val
  },
}

//准备States用于管理数据
const state = {
  sum: 0,
  school: '尚硅谷',
  subject: '前端'
}

//准备getters用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}

//创建并暴露Store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

