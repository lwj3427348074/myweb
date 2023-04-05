const express = require('express')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())

app.get('/set-cookie', (req, res) => {
  //会在浏览器关闭的时候自动销毁
  res.cookie('name', 'zhangsan')
  // res.cookie('name', 'lisi', { maxAge: 60 * 1000 })
  res.cookie('theme', 'blue')
  res.send('home')
})

//删除cookie
app.get('/remove-cookie', (req, res) => {
  res.clearCookie('name')
  res.send('删除成功')
})

// 获取cookie
app.get('/get-cookie', (req, res) => {
  console.log(req.cookies);
  console.log('获取cookie');
})

app.listen(3000, () => {
  console.log('3000 server');
})