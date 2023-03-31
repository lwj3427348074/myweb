const express = require('express')
//导入singer文件
const { singers } = require('./singers.json')

const app = express();

app.get('/singer/:id.html', (req, res) => {
  let { id } = req.params
  //在数组中寻找对应id的数据
  let result = singers.find(item => {
    if (item.id === Number(id)) {
      return true
    }
  })

  if (!result) {
    res.statusCode = 404
    res.end('404')
    return
  }

  res.setHeader('content-type', 'text/html;charset=utf-8')

  res.end(`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h2>${result.singer_name}</h2>
  <img src="${result.singer_pic}" alt="">
</body>

</html>
  `)
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})