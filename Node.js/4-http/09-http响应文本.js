const fs = require('fs')
const path = require('path')
const http = require('http')

let server = http.createServer((request, response) => {

  // 请求URL的路径
  let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')

  if (pathname === '/') {

    let tableHtmlPath = path.resolve(__dirname, 'table/table.html')
    let tableHtml = fs.readFileSync(tableHtmlPath)

    response.end(tableHtml)
  } else if (pathname === '/table.css') {

    let tableCssPath = path.resolve(__dirname, 'table/table.css')
    let tableCss = fs.readFileSync(tableCssPath)

    response.end(tableCss)
  } else if (pathname === '/table.js') {

    let tableJsPath = path.resolve(__dirname, 'table/table.js')
    let tableJs = fs.readFileSync(tableJsPath)

    response.end(tableJs)
  } else {
    response.statusCode = 404
    response.end('404')
  }
})

server.listen(9000, () => {
  console.log('服务启动成功');
})