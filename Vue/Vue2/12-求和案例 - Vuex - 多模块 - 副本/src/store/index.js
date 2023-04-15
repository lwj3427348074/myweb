//改文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import countOptions from './count'


//人员管理相关的配置
import personOptions from './person'



//创建并暴露Store
export default new Vuex.Store({
  modules: {
    count: countOptions,
    person: personOptions
  }
})

