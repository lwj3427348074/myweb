class Axios {
  constructor(config) {
    this.defaults = config
    this.interceptors = {
      // request: new InterceptorManager(),
      // response: new InterceptorManager()
    }
  }
  request(config) {
    let promise = Promise.resolve(config)
    const chains = [dispatchRequest, undefined]
    // this.interceptors.request.forEach(item => {
    //   chains.unshift()
    // })
    // this.interceptors.response.forEach(item => {
    //   chains.push()
    // })
    // while (chains > 0) {
    //   promise = promise.then(chains.shift(), chains.shift())
    // }
  }
  get() {

  }
}
// function createInstance(config) {
//   const context = new Axios()
//   const instance = Axios.prototype.request.bind(context)

// }

// class InterceptorManager {
//   constructor() {
//     this.headlers = []
//   }
// }