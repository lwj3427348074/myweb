const express = require('express')

const app = express();

//静态资源中间件,static()中的参数就是静态资源文件夹的路径
app.use(express.static(__dirname + '/public'))
//默认读取index.html的文件内容
//所以路由和静态资源中间件则谁书写在前，优先执行谁的页面

app.get('/home', (req, res) => {
  res.send('home')
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})