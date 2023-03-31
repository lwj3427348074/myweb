const http = require('http')

const server = http.createServer((request, response) => {

  //获取请求的方法
  let { method } = request

  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')
  response.setHeader('content-type', 'text/html;charset=utf-8')

  if (method === 'GET' && pathname === '/login') {
    response.end('登录页面')
  } else if (method === 'GET' && pathname === '/reg') {
    response.end('注册页面')
  } else {
    response.end('404 notfound')
  }
})

server.listen(9000, () => {
  console.log('服务器已启动');
})