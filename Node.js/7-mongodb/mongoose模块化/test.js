const db = require('./db/db')
const MovieModel = require('./models/MovieModel')

db(() => {
  //电影的模型对象
  MovieModel.create({
    title: '让子弹飞',
    director: '姜文'
  }).then((data) => {
    console.log('插入成功');
    console.log(data);
  }).catch((err) => {
    console.log('插入失败');
  })
})