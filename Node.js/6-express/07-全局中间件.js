//记录每个请求的url与IP地址
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

//声明中间件函数
function recordMiddleware(req, res, next) {
  //获取 url 和 ip地址
  let { url, ip } = req
  // console.log(url, ip);
  //将信息保存在文件中 access.log
  fs.appendFileSync(path.resolve(__dirname, 'access.log'), `${url} ${ip}\r\n`)
  //调用next
  next()
}

//使用中间件函数
app.use(recordMiddleware)

app.get('/home', (req, res) => {
  res.send('home')
})

app.get('/admin', (req, res) => {
  res.send('admin')
})

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})