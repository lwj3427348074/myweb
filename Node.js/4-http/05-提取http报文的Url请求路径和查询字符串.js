const http = require('http')

const server = http.createServer((request, response) => {
  //实例化URL对象
  // let url = new URL('/search?key=4asdasd', 'http://127.0.0.1:9000')
  let url = new URL(request.url, 'http://127.0.0.1:9000')
  console.log(url);

  //输出路径
  console.log(url.pathname);

  //输出查询字符串 key
  console.log(url.searchParams.get('key'))

  response.end('url new')
})

server.listen(9000, () => {
  console.log('服务器已启动');
})