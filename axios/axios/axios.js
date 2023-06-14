function Axios(config) {
  this.defaults = config
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

Axios.prototype.request = function (config) {
  // console.log('发起AJAX请求,请求的类型为:' + config.method)
  let promise = Promise.resolve(config)
  const chains = [dispatchRequest, undefined]
  // let result = promise.then(chains[0], chains[1])
  this.interceptors.request.headlers.forEach(item => {
    chains.unshift(item.fulfilled, item.rejected)
  })
  this.interceptors.response.headlers.forEach(item => {
    chains.push(item.fulfilled, item.rejected)
  })

  while (chains.length > 0) {
    promise = promise.then(chains.shift(), chains.shift())
  }
  return promise
}
Axios.prototype.get = function (config) {
  console.log('axios.get()');
  // return this.request({ method: 'GET' })
}
Axios.prototype.post = function (config) {
  console.log('axios.post()');
  // return this.request({ method: 'POST' })
}

function createInstance(config) {
  let context = new Axios()
  let instance = Axios.prototype.request.bind(context)
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key]
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })
  return instance
}

function dispatchRequest(config) {
  return xhrAdapter(config).then(res => {
    return res
  }, error => {
    throw error
  })
}

function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            config: xhr.config,
            data: xhr.response,
            headers: xhr.getAllResponseHeaders(),
            request: xhr,
            status: xhr.status,
            statusText: xhr.statusText
          })
        } else {
          reject(new Error('请求失败'))
        }
      }
    }
    if (config.cancelToken) {
      config.cancelToken.promise.then(resolve => {
        xhr.abort()
        reject(new Error('请求被取消'))
      })
    }
  })
}
function InterceptorManager() {
  this.headlers = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.headlers.push({
    fulfilled,
    rejected
  })
}
function CancelToken(executor) {
  var reslovePromise
  this.promise = new Promise(reslove => {
    reslovePromise = reslove
  })
  executor(function () {
    reslovePromise()
  })
}