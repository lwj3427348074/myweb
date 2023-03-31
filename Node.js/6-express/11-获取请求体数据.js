//搭建HTTP服务
// GET /login 显示表单网页
// POST /login 获取表单中的用户名和密码
const express = require('express')
const bodyParser = require('body-parser')
let app = express()

//解析 JSON 格式的请求体的中间件
let jsonParser = bodyParser.json()

//解析 querystring 格式请求体的中间件
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/login', (req, res) => {
  //响应HTML文件内容
  res.sendFile(__dirname + '/11-form.html')
})

app.post('/login', urlencodedParser, (req, res) => {
  //当 urlencodedParser 中间件执行完毕之后，会往req上添加一个body属性
  console.log(req.body);
  res.send('获取用户的数据')
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})