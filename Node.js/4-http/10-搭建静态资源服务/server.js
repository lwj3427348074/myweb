/**
 * 创建一个 HTTP 服务，端口为 9000，满足如下需求
 * GET  /index.html        响应  page/index.html 的文件内容
 * GET  /css/app.css       响应  page/css/app.css 的文件内容
 * GET  /images/logo.png   响应  page/images/logo.png 的文件内容
 */
//导入 http 模块
const fs = require('fs')
const path = require('path')
const http = require('http')

let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

let server = http.createServer((request, response) => {
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end('<h1>405 Method Not Allowed</h1>')
    return;
  }

  // 请求URL的路径
  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')

  //网站根目录
  //HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 静态资源目录 ，也称之为 网站根目录
  let root = path.resolve(__dirname, 'page')

  //拼接文件路径
  let filePath = root + pathname;

  //异步读取文件
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader('content-type', 'text/html;charset=utf-8')
      switch (err.code) {
        case 'ENOENT':
          response.statusCode = 404;
          response.end('<h1>404 Not Found</h1>')
        case 'EPERM':
          response.statusCode = 403;
          response.end('<h1>403 Forbidden</h1>')
        default:
          response.statusCode = 500;
          response.end('<h1>Internal Server Error</h1>')
      }


      return;
    }
    //获取文件的后缀名
    let ext = path.extname(filePath).slice(1);

    //获取对应的类型
    let type = mimes[ext];

    if (type) {
      //匹配到了
      response.setHeader('content-type', type + ';charset=utf-8')
    } else {
      //没匹配到
      response.setHeader('content-type', 'application/octet-stream')
    }

    //响应文件内容
    response.end(data)
  })
})

server.listen(9000, () => {
  console.log('服务启动成功');
})





