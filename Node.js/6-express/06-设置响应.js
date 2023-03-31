const express = require('express')

const app = express();

app.get('/', (req, res) => {
  //原生响应
  // res.statusCode = 404
  // res.statusMessage = 'love'
  // res.setHeader('xxx', 'yyy')
  // res.write('write')
  // res.end('原生响应')

  //express的响应
  // res.status(500)
  // res.set('xxx', 'yyy')
  // //会自动在响应头中添加utf-8,中文不会乱码
  // res.send('express响应')
  //可以连环设置
  // res.status(500).set('xxx', 'yyy').send('这很OK')

  //其他响应
  //跳转响应(重定向)
  // res.redirect('http://atguigu.com')
  //下载响应
  // res.download(__dirname + '/singers.json')
  //JSON响应
  // res.json({
  //   name: '尚硅谷',
  //   slogon: 'just so so'
  // })
  //响应文件内容
  res.sendFile(__dirname + '/post.html')//path.resolve()
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})