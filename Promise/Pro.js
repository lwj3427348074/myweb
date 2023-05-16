//1.声明promise类并绑定this
class Pro {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = Pro.PENDING
    //promise默认是有值的
    this.value = null
    //7.1.Promise的PENDING状态处理
    this.callbacks = []
    //3.执行者异步捕获
    try {
      //执行函数
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value) {
    // 2.状态保护
    if (this.status == Pro.PENDING) {
      //类里面的this是undefind（class默认严格模式）
      //执行resolve函数时会改变promise的状态
      this.status = Pro.FULFILLED
      this.value = value
      //9.PENDING的异步处理
      setTimeout(() => {
        //7.3.Promise的PENDING状态处理 
        this.callbacks.map(callback => {
          callback.onFulfilled(value)
        })
      })
    }
  }
  reject(reason) {
    // 2.状态保护
    if (this.status == Pro.PENDING) {
      this.status = Pro.REJECTED
      this.value = reason
      //9.PENDING的异步处理
      setTimeout(() => {
        //7.3.Promise的PENDING状态处理 
        this.callbacks.map(callback => {
          callback.onRejected(reason)
        })
      })
    }
  }

  //4.then的基础构建
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function') {
      //12.then的穿透传递
      onFulfilled = () => this.value
    }
    if (typeof onRejected != 'function') {
      //12.then的穿透传递
      onRejected = () => this.value
    }
    //15.PROMISE返回类型约束
    //10.实现Promise链式操作
    let promise = new Pro((resolve, reject) => {
      //7.2.Promise的PENDING状态处理
      if (this.status == Pro.PENDING) {
        this.callbacks.push({
          //8.PENDING状态异常处理
          onFulfilled: value => {
            //14.then代码冗余优化
            this.parse(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: reason => {
            //14.then代码冗余优化
            this.parse(promise, onRejected(reason), resolve, reject)
          },
        })
      }

      if (this.status == Pro.FULFILLED) {
        //6.实现then的异步操作
        setTimeout(() => {
          //14.then代码冗余优化
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }
      if (this.status === Pro.REJECTED) {
        //6.实现then的异步操作
        setTimeout(() => {
          //14.then代码冗余优化
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }
    })
    return promise
  }

  //14.then代码冗余优化
  parse(promise, result, resolve, reject) {
    //15.PROMISE返回类型约束
    if (promise == result) {
      throw new TypeError("Chaining cycle detected")
    }
    //5.then的异常捕获
    try {
      //13.then返回Promise的处理
      if (result instanceof Pro) {
        //这步优化相当于在Promise中
        //reslove 就是value => {resolve(value)}
        result.then(resolve, reject)
        // value => {
        //   resolve(value)
        // }, reason => {
        //   reject(reason)
        // })
      } else {
        resolve(result)
      }
    } catch (error) {
      //11.then新增Promise异常处理
      reject(error)
    }
  }
}


