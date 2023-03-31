var express = require('express');
const formidable = require('formidable');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//显示网页的（表单）
router.get('/portrait', (req, res) => {
  res.render('portrait')
})

//处理文件上传
router.post('/portrait', (req, res) => {
  //创建表单对象
  const form = formidable({
    multiples: true,
    //设置上传文件的保存目录
    uploadDir: __dirname + '/../public/images',
    //保持文件后缀
    keepExtensions: true
  });
  //解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // fields存储一般字段
    // console.log(fields);
    // console.log(files);
    //http://localhost:3000/images/6ee5f30589d8cc893062c6300.png
    // 服务器保存该图片的访问URL
    let url = '/images/' + files.portrait.newFilename
    //将来将此数据保存在2数据库中

    res.send(url)
  });



})

module.exports = router;
