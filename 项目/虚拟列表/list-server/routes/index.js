var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function (req, res, next) {
  let ListArr = new Array(100000).fill(null)

  ListArr = ListArr.map((item, index) => {
    return item = '虚拟数据' + index
  })

  console.log(ListArr);
  res.json({
    code: 200,
    data: ListArr
  })
});

module.exports = router;
