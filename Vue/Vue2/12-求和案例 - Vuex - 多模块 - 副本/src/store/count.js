//求和功能相关的配置
export default {
  namespaced: true,
  actions: {
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
    },
  },
  mutations: {
    increment(state, val) {
      console.log('我是mutations里的increment');
      state.sum += val
    },
    decrement(state, val) {
      console.log('我是mutations里的decrement');
      state.sum -= val
    },
  },
  state: {
    sum: 0,
    school: '尚硅谷',
    subject: '前端',
  },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}

