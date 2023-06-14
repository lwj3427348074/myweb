class Pro {
  static PENDING = "pending"
  static FULFILLED = "fulfilled"
  static REJECTED = "rejected"

  constructor(executor) {
    this.status = Pro.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(err)
    }
  }
  resolve(value) {
    if (this.status == Pro.PENDING) {
      this.status = Pro.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.forEach(callback => {
          callback.onFulfilled(value)
        })
      })
    }
  }
  reject(reason) {
    if (this.status == Pro.PENDING) {
      this.status = Pro.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callback.forEach(callback => {
          callback.onRejected(reason)
        })
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = value => value
    }
    if (typeof onRejected !== "function") {
      onRejected = value => value
    }
    let promise = new Pro((resolve, reject) => {
      if (this.status == Pro.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: reason => {
            this.parse(promise, onRejected(reason), resolve, reject)
          }
        })
      }
      if (this.status == Pro.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(value), resolve, reject)
        })
      }
      if (this.status == Pro.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(reason), resolve, reject)
        })
      }
    })
    return promise
  }
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError('Chaning cycle detected')
    }
    try {
      if (result instanceof Pro) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  }
  static resolve(value) {
    return new Pro((resolve, reject) => {
      if (value instanceof Pro) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new Pro((_, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    const resolves = []
    return new Pro((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolves.push(value)
          if (promise.length == resolves.length) {
            resolve(resolves)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  static race(promises) {
    return new Pro((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
}