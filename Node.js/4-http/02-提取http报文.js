const http = require('http')

const server = http.createServer((request, response) => {

  //获取请求方法
  console.log(request.method);

  //获取请求的url，只包含url中的路径和查询字符串
  console.log(request.url);

  //获取http协议的版本号
  console.log(request.httpVersion);

  //获取http的请求头
  // console.log(request.headers);
  console.log(request.headers.host);

  response.end('hello')
})

server.listen(9000, () => {
  console.log('服务器已启动');
})