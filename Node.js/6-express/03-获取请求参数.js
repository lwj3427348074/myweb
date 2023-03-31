const express = require('express')

const app = express();

app.get('/request', (req, res) => {
  //原生操作
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers);

  //express操作
  console.log(req.path);
  console.log(req.query);
  //客户端ip
  console.log(req.ip);
  // 获取请求头

  console.log(req.get('host'));

  res.end('hello express')
})

app.listen(3000, () => {
  console.log('3000端口服务器已启动');
})