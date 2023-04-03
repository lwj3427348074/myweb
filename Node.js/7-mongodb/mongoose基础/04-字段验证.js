const mongoose = require('mongoose')

//连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

//连接成功的回调, once 一次，事件回调函数只执行一次
mongoose.connection.once('open', () => {
  console.log('连接成功');

  //创建文档的结构对象
  //设置集合中 文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, //表明该属性必须不为空
      unique: true    //唯一值，重建集合才有效
    },
    author: {
      type: String,
      default: '匿名' //默认值
    },
    style: {
      type: String,
      enum: ['城市', '古装', '神话']  //内容是里面其一
    },
    price: Number
  })

  //创建模型对象 对文档操作的封装对象
  //books是要操作的集合对象，BookSchema是结构对象
  let BookMode1 = mongoose.model('books', BookSchema)

  //新增
  BookMode1.create({
    name: '西游记',
    author: '吴承恩',
    style: '城市',
    price: 19.9
  }).then(data => {
    //如果没有出错，则输出插入后的文档对象
    console.log(data);
    //关闭数据库连接(项目运行过程中，不会使用该代码)
    mongoose.disconnect()

  }).catch(err => {
    // console.log(err);
    console.log('插入失败');
    return
  });


})
//连接失败的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
})
//连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
})
