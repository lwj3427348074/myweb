// 2 - 1 readFile 异步读取
// 语法： fs.readFile(path[, options], callback)
// 参数说明：
// path 文件路径
// options 选项配置
// callback 回调函数
// 返回值： undefined
// 代码示例：

//导入 fs 模块
const fs = require('fs');

fs.readFile('./fs/writeFile异步写入.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.readFile('./fs/writeFile异步写入.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('========================');



// 2 - 2 readFileSync 同步读取
// 语法： fs.readFileSync(path[, options])
// 参数说明：
// path 文件路径
// options 选项配置
// 返回值： string | Buffer
// 代码示例：

let data = fs.readFileSync('./fs/writeFileSync同步写入.txt');
let data2 = fs.readFileSync('./fs/writeFileSync同步写入.txt', 'utf-8')
console.log(data);
console.log(data2);
console.log('===============================');






// 2 - 4 读取文件应用场景
// 电脑开机
// 程序运行
// 编辑器打开文件
// 查看图片
// 播放视频
// 播放音乐
// Git 查看日志
// 上传文件
// 查看聊天记录