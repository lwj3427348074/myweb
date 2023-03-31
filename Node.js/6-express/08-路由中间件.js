//针对 /admin /setting 的请求，要求URL携带 code=521 参数，如果未携带提示【暗号错误】
const express = require('express')
const app = express();

app.get('/home', (req, res) => {
  res.send('home')
})

//声明中间件函数
let checkCodeMiddleware = (req, res, next) => {
  //判断URL中是否code参数等于521
  if (req.query.code === '521') {
    next()
  } else {
    res.send('暗号错误')
  }
}

app.get('/admin', checkCodeMiddleware, (req, res) => {
  res.send('admin')
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
  res.send('setting')
})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})