const express = require('express')

const app = express();

//创建路由
app.get('/', (req, res) => {
  res.end('hello express')
})

app.get('/home', (req, res) => {
  res.end('home')
})

app.post('/login', (req, res) => {
  res.end('login    login')
})

//匹配所有的方法
app.all('/test', (req, res) => {
  res.end('test    test')
})

app.all('*', (req, res) => {
  res.end('404')
})

app.listen(3000, () => {
  console.log('服务器已经启动');
})