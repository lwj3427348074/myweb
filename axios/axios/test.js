class Axios {
  constructor(config) {
    this.defaults = config
    this.interceptors = {
      request: {},
      response: {}
    }
  }
  request(config) {
    console.log('发起AJAX请求,请求的类型为:' + config.method)
  }
  get(config) {
    return this.request({ method: 'GET' })
  }
  post(config) {
    return this.request({ method: 'POST' })
  }
}
function createInstance(config) {
  let context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  console.dir(Axios.prototype);
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context)
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })
  console.dir(instance);
  return instance
}
