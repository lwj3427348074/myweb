const http = require('http')

const server = http.createServer((request, response) => {
  //声明一个变量
  let body = '';
  //绑定事件
  request.on('data', chunk => {
    body += chunk
  })
  //绑定end事件,当把数据取完之后会触发end事件
  request.on('end', () => {
    console.log(body);
    //响应给浏览器
    response.end('hello http')
  })

})

server.listen(9000, () => {
  console.log('服务器已启动');
})