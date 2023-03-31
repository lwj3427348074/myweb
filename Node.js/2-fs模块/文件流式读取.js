// 2 - 3 createReadStream 流式读取
// 语法： fs.createReadStream(path[, options])
// 参数说明：
// path 文件路径

const fs = require('fs')

//创建读取流对象
let rs = fs.createReadStream(__dirname + '/笑看风云.mp4');

//每次取出 64k 数据后执行一次 data 回调
rs.on('data', data => {
  console.log(data);
  console.log(data.length);
});

//读取完毕后, 执行 end 回调
rs.on('end', () => {
  console.log('读取完成')
})
