import axios from "axios"

const request = axios.create({
  // 指定天行api的根路径
  baseURL: 'http://api.tianapi.com'
})

export default request