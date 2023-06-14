import request from "@/utils/xinlangrequest.js"

// 向外按需导出一个api函数
const api = {
  getNcovCity() {
    return request.get('/news/wap/fymap2020_data.d.json')
  },
}

export default api