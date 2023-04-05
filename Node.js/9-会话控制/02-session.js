const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();

//设置 session 中间件
app.use(session({
  //设置cookie的name，默认值是：connect.sid
  name: 'sid',
  //参与加密的字符串（又称签名）
  secret: 'atguigu',
  //是否为每次请求都设置一个cookie用来存储session的id
  saveUninitialized: false,
  //是否在每次请求时重新保存session
  resave: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/bilibili'//数据库的连接配置
  }),
  cookie: {
    // 开启后前端无法通过 JS 操作
    httpOnly: true,
    // 这一条 是控制 sessionID 的过期时间的！！！
    maxAge: 1000 * 60 * 5
  },
}))

app.get('/', (req, res) => {
  res.send('home')
})

//登录
app.get('/login', (req, res) => {
  // username=admin & password=admin
  if (req.query.username === 'admin' && req.query.password === 'admin') {
    // 设置session信息
    req.session.username = 'admin'
    req.session.uid = '258aefccc'
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

//session的读取
app.get('/card', (req, res) => {
  //检测session是否存在用户数据
  if (req.session.username) {
    res.send(`购物车页面，欢迎您${req.session.username}`)
  } else {
    res.send('您还没有登录')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('退出成功')
  })
})

app.listen(3000, () => {
  console.log('3000 server');
})