import service from "..";


//获取首页轮播图数据
export function getBanner() {
  return service({
    method: 'get',
    url: '/banner?type=2'
  })
}

//获取发现好歌单
export function getMusicList() {
  return service({
    method: 'get',
    url: '/personalized?limit=10',
  })
}

//搜索
export function getSearchMusic(val) {
  return service({
    method: 'get',
    url: `/search?keywords=${val}`,
    // url: `/cloudsearch?keywords=${val}`,
  })
}

//登录/login/cellphone?phone=xxx&password=yyy
// export function getPhoneLogin(data) {
//   return service({
//     method: 'get',
//     url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
//     // url: `/cloudsearch?keywords=${val}`,
//   })
// }

// /register/anonimous
export function getPhoneLogin(data) {
  return service({
    method: 'get',
    url: `register/anonimous`,
    // url: `/cloudsearch?keywords=${val}`,
  })
}