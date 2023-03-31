const http = require('http')

// 创建服务对象
const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8')
  //end结束响应
  response.end('Hello HTTP server')
})

// http协议的默认端口是80
// https协议的默认端口是443
//开发常用8080,8090,3000,9000

//监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动');
});