//构造函数
function Axios(config) {
  //初始化
  this.defaults = config;//为了创建default默认属性
  this.intercepters = {
    request: {},
    response: {}
  }
}

//原型添加相关的方法
Axios.prototype.request = function (config) {
  //内部调用了request方法，所以能发送请求
  console.log('发送AJAX请求,请求的类型为' + config.method);
}
Axios.prototype.get = function (config) {
  //内部调用了request方法，所以能发送请求
  // return this.request(config)
  return this.request({ method: 'GET' })
}
Axios.prototype.post = function (config) {
  //内部调用了request方法，所以能发送请求
  return this.request({ method: 'POST' })
}

//声明函数
function createInstance(config) {
  //实例化一个对象
  let context = new Axios(config)
  //context.get() context.post() 但是不能当做函数使用context()

  //创建请求函数
  let instance = Axios.prototype.request.bind(context)
  //instance是一个函数，可以直接instance({}) 但是此时instance不能当做对线使 instance.get() instance.post()

  //将Axios.prototype对象中的方法添加到instance函数对象中
  Object.keys(Axios.prototype).forEach(key => {// request get post..
    instance[key] = Axios.prototype[key].bind(context)//this始终指向context,所以能this.defaults this.intercepters 
  })

  //为instance函数对象添加属性 defaults和intercepters 
  Object.keys(context).forEach(key => {// defaults intercepters
    instance[key] = context[key]
  })
  // console.dir(instance);
  return instance
}

let axios = createInstance()
//发送请求
axios({
  method: 'GET'
})
axios({
  method: 'POST'
})
axios.get({})
axios.post({})