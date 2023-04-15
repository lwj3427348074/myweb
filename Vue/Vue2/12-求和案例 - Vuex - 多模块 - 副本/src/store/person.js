import axios from "axios"
import { nanoid } from 'nanoid'

export default {
  namespaced: true,
  actions: {
    addPersonWang(context, val) {
      if (val.indexOf('王') === 0) {
        context.commit('addPerson', val)
      } else {
        alert('不姓王')
      }
    },
    addPersonServer(context) {
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
        response => {
          console.log('请求成功', response.data);
          context.commit('addPerson', response.data)
        },
        error => {
          console.log('请求失败', error);
        }
      )
    }
  },
  mutations: {
    addPerson(state, val) {
      state.personList.unshift({ id: nanoid(), name: val })
    }
  },
  state: {
    personList: [
      { id: '001', name: '张三' }
    ]
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name
    }
  }
}