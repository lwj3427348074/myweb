const express = require('express')

//创建应用对象（通过express构造函数创建一个对象）
const app = express();

//创建路由
app.get('/home', (req, res) => {
  res.end('hello express')
})

app.listen(3000, () => {
  console.log('服务器已经启动');
})