class Pro {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = Pro.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value) {
    if (this.status == Pro.PENDING) {
      this.status = Pro.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.map(callback => {
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
        this.callbacks.map(callback => {
          callback.onRejected(reason)
        })
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected != 'function') {
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
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }
      if (this.status == Pro.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject)
        })
      }
    })
    return promise
  }
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError("Chaining cycle detected")
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
}
