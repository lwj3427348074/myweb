// 在 Node.js 中，我们可以使用 rename 或 renameSync 来移动或重命名 文件或文件夹
// 语法：
// fs.rename(oldPath, newPath, callback)
// fs.renameSync(oldPath, newPath)
// 参数说明：
// oldPath 文件当前的路径
// newPath 文件新的路径
// callback 操作后的回调
// 代码示例

const fs = require('fs')

//文件移动
// fs.rename('./fs/writeFile异步写入.txt', './writeFile异步写入.txt', (err) => {
//   if (err) throw err;
//   console.log('移动完成')
// });


// fs.renameSync('./writeFile异步写入.txt', './fs/异步写入.txt');
fs.renameSync('./writeFile异步写入.txt', './fs/writeFile异步写入.txt');