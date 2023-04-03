const mongoose = require('mongoose')

//连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')



//连接失败的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
})
//连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
})