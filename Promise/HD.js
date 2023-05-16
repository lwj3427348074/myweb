class HD {

  static PENDING = 'pending'
  static FULFILLED = 'fulfulled'
  static REJECT = 'reject'

  constructor(executor) {
    this.status = HD.PENDING
    this.value = null
    this.callbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status === HD.PENDING) {
      this.status = HD.FULFILLED
      this.value = value
      // console.log(this.callbacks);
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(value)
        })
      })
    }
  }

  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECT
      this.value = reason
      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(reason)
        })
      })
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => { }
    }

    let promise = new HD((resolve, reject) => {

      if (this.status === HD.PENDING) {
        // console.log(3);
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: reason => {
            this.parse(promise, onRejected(reason), resolve, reject)
          }
        })
      }

      if (this.status === HD.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }

      if (this.status === HD.REJECT) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject)
        })
      }
    })
    return promise
  }

  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError('Chaining cycle detected')
    }
    try {
      if (result instanceof HD) {
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
      reject(error)
    }
  }

  //promise reslove
  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  //promise reject
  static reject(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then(resolve, reject)
      } else {
        reject(value)
      }
    })
  }

  //promise all
  static all(promises) {
    let resolves = [];
    return new HD((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            resolves.push(value);
            if (resolves.length == promises.length) {
              resolve(resolves);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new HD((resolve, reject) => {
      promises.map(promise => {
        promise.then(value => {
          resolve(value);
        });
      });
    });
  }
}