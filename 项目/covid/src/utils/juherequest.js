import axios from "axios";

const request = axios.create({
  baseURL: '/juhe'
})

export default request