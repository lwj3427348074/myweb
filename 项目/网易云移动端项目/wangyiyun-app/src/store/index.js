import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home';

export default createStore({
  state: {
    PlayList: [{
      al: {
        id: 3054186,
        name: "热门华语250",
        pic: 109951166361218460,
        picUrl: "https://p1.music.126.net/cpoUinrExafBHL5Nv5iDHQ==/109951166361218466.jpg",
        pic_str: "109951166361218466"
      },
      ar: [{
        name: "W.K."
      }],
      id: 29786264,
      name: "青衣"
    }],
    //默认下标为0
    PlayListIndex: 0,
    //播放按钮显示
    isbtnShow: false,
    detailShow: false,//歌曲详情页的显示
    lyric: {},//歌词部分
    currentTime: 0, //当前时间
    duraction: 0,//歌曲总时长
    isLogin: false,
    isFooterMusic: true,
    cookie: '',
    user: {
      id: '',
    }
  },
  getters: {
  },
  mutations: {
    changeIsbtnShow(state, val) {
      state.isbtnShow = val
    },
    updatedPlayList(state, val) {
      state.PlayList = val,
        console.log(state);
    },
    updatedPlayListIndex(state, val) {
      state.PlayListIndex = val
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, val) {
      state.lyric = val
    },
    updateCurrentTime(state, val) {
      // console.log(state.currentTime);
      state.currentTime = val
    },
    updateDuraction(state, val) {
      state.duraction = val
    },
    pushPlayList(state, val) {
      state.PlayList.push(val)
    },
    updateIsLogin(state, val) {
      state.isLogin = true
    },
    updateCookie(state, val) {
      state.cookie = val
      localStorage.setItem('cookie', state.cookie)
    },
    updateUser(state, val) {
      state.user.id = val
    }
  },
  actions: {
    getLyric: async function (context, val) {
      let res = await getMusicLyric(val)
      // console.log(res.data.lrc.lyric);
      context.commit('updateLyricList', res.data.lrc.lyric)
    },
    async getLogin(context, val) {
      let res = await getPhoneLogin(val)
      console.log(res.data);
      context.commit('updateUser', res.data.userId)
      return res

    }
  },
  modules: {
  }
})

// [
//   {
//     lrc: "作词 : n-buna",
//     mill: "00",
//     min: "00",
//     pre: 36,
//     sec: "00",
//     time: 0
//   },
//   {
//     lrc: "作曲 : n-buna",
//     mill: "36",
//     min: "00",
//     pre: 73,
//     sec: "00",
//     time: 36
//   },
//   {
//     lrc: "もう忘れてしまったかな",
//     mill: "73",
//     min: "00",
//     pre: 4000,
//     sec: "00",
//     time: 73
//   },
//   {
//     lrc: "夏の木陰に座ったまま、氷菓",
//     mill: "00",
//     min: "00",
//     pre: NaN,
//     sec: "04",
//     time: 4000
//   },
//   {
//     lrc: "",
//     mill: "00",
//     min: "イス",
//     pre: NaN,
//     sec: "04",
//     time: 4000
//   }
// ]
