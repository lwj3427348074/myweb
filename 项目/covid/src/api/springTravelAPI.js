import request from "@/utils/juherequest.js"

// 向外按需导出一个api函数
const api = {
  springTravel(params) {
  return request.get('/springTravel/citys', {
    params
  })
  },
  springTravelQuery(params){
    return request.get('/springTravel/query', {
    params
  })
  }
}

export default api