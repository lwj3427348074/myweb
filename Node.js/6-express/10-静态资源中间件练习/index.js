// PC端局域网IPv4:192.168.1.106,可以通过在同一个局域网内的设备访问
const express = require('express')

const app = express();

app.use(express.static(__dirname + '/尚品汇'))

app.listen(3000, () => {
  console.log("3000端口已启动");
})