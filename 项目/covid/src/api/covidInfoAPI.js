// 疫情信息相关的api接口
import request from "@/utils/tianxinrequest.js"

// 向外按需导出一个api函数
const api = {
  getNcov(params) {
  return request.get('/txapi/ncov/index', {
    params
  })
  },
  getNcovAboard(params) {
    return request.get('/txapi/ncovabroad/index',{//key:62e34ad34025d5d5127135efa58d4ca
      params
    })
  }
}

export default api