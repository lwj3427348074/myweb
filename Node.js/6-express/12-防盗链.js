//图片只允许127.0.0.1:3000访问，不允许localhost访问
const express = require('express')

const app = express();

//声明中间件
app.use((req, res, next) => {
  //检测请求头中的referer是否为127.0.0.1
  //获取 referer http://127.0.0.1:3000
  let referer = req.get('referer')
  if (referer) {
    // 提取127.0.0.1
    //实例化
    let url = new URL(referer)
    //获取hostname
    let hostname = url.hostname
    console.log(hostname);

    if (hostname !== '127.0.0.1') {
      res.status(404).send('404')
      return
    }
  }
  next()
})

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.log("3000端口已启动");
})