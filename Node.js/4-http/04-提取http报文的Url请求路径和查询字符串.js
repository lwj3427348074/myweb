const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {

  console.log(request.url);

  //解析request.url
  let res = url.parse(request.url, true)
  // console.log(res);

  //路径
  let pathname = res.pathname
  console.log(pathname);

  //查询字符串
  let keyword = res.query.key
  console.log(keyword);

  response.end('url')
})

server.listen(9000, () => {
  console.log('服务器已启动');
})