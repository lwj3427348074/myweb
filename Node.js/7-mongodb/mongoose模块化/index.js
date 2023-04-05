//导入db文件
const db = require('./db/db.js')
const mongoose = require('mongoose')
const BookModel = require('./models/BookModel.js')

//调用函数
db(() => {
  BookModel.create({
    name: '你真好',
    author: '吴承恩',
    price: 19.9
  }).then((data) => {
    console.log(data);
    mongoose.disconnect()
  }).catch((err) => {
    console.log('插入失败');
    return
  });
}, () => {
  console.log('连接失败');
})





