//  mkdir 创建文件夹
// 在 Node.js 中，我们可以使用 mkdir 或 mkdirSync 来创建文件夹
// 语法：
// fs.mkdir(path[, options], callback)
// fs.mkdirSync(path[, options])
// 参数说明：
// path 文件夹路径
// options 选项配置（ 可选 ）
// callback 操作后的回调
// 示例代码：

const fs = require('fs')

//异步创建文件夹
// fs.mkdir('./page', err => {
//   if (err) throw err;
//   console.log('创建成功');
// });

//递归异步创建
// recursive递归的意思
// fs.mkdir('./1/2/3', { recursive: true }, err => {
//   if (err) throw err;
//   console.log('递归创建成功');
// });

// //递归同步创建文件夹
// fs.mkdirSync('./x/y/z', { recursive: true });





//读取文件夹
fs.readdir('../课件', (err, data) => {
  if (err) throw err;
  console.log(data);
})





//删除文件夹
// fs.rmdir('./page/', err => {
//   if (err) throw err;
//   console.log("删除成功");
// })

//递归删除文件夹（将来会被移除）
// fs.rmdir('./1', { recursive: true }, err => {
//   if (err) throw err;
//   console.log("删除成功");
// })

fs.rm('./1', { recursive: true }, err => {
  if (err) throw err;
  console.log("删除成功");
})