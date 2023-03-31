const http = require('http')

let server = http.createServer((request, response) => {
  //设置响应状态码
  response.statusCode = 200//默认 

  //响应状态的描述
  response.statusMessage = 'OK'

  //响应头
  response.setHeader('content-type', 'text/html;charset=utf-8')
  // 允许自定义响应头
  response.setHeader('myHeader', 'Node.js')
  //设置多个同名响应头
  response.setHeader('text', ['a', ' ', '8'])

  //响应体的设置
  response.write('love ')
  // write方法可以多次调用
  response.write('love ')

  // 每个请有且只有一个end（），可以用来设置响应体
  response.end("server")
})

server.listen(9000, () => {
  console.log("服务已启动");
})