// 新建一个文件，座右铭.txt，写入内容，三人行，则必有我师掩

// 导入fs模块
const fs = require('fs')

// 语法： fs.writeFile(file, data[, options], callback)
// 参数说明：
// file 文件名
// data 待写入的数据
// options 选项设置 （可选）
// callback 写入回调
// 返回值： undefined

//  writeFile 异步写入
fs.writeFile('./fs/writeFile异步写入.txt', '\r\n我是writeFile写入的', err => {
  //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
  if (err) {
    console.log(err);
    return;
  }
  console.log('异步写入成功')
})

console.log('异步写入先执行我');





// Node.js 中的磁盘操作是由其他 线程 完成的，结果的处理有两种模式：
// 异步处理 JavaScript 主线程 不会等待 其他线程的执行结果，直接执行后续的主线程代码，效率较好
// 同步处理 JavaScript 主线程 会等待 其他线程的执行结果，然后再继续执行主线程的代码，效率较低





//  writeFileSync 同步写入
// 语法: fs.writeFileSync(file, data[, options])
// 参数与 fs.writeFile 大体一致，只是没有 callback 参数
// 返回值： undefined
fs.writeFileSync('./fs/writeFileSync同步写入.txt', '\r\n我是writeFileSync同步写入的')

console.log('同步写入后执行我');











//追加写入

// appendFile / appendFileSync 追加写入
// appendFile 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完全相同
// 语法:
// fs.appendFile(file, data[, options], callback)
// fs.appendFileSync(file, data[, options])
// 返回值： 二者都为 undefined
fs.appendFile('./fs/writeFile异步写入.txt', '\r\n我是appendFile追加写入的。', err => {
  if (err) throw err;
  console.log('异步追加成功')
});

fs.appendFileSync('./fs/writeFileSync同步写入.txt', '\r\n我是appendFileSync追加写入的。');

//会先执行同步后执行异步



//通过writeFile实现追加写入
fs.writeFile('./fs/writeFile异步写入.txt', '\r\n我是writeFile追加写入的', { flag: 'a' }, err => {
  //如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
  if (err) {
    console.log(err);
    return;
  }
  console.log('writeFile追加写入成功')
})










//  createWriteStream 流式写入
// 语法： fs.createWriteStream(path[, options])
// 参数说明：
// path 文件路径
// options 选项配置（ 可选 ）
// 返回值： Object

//建立通道
let ws = fs.createWriteStream('./fs/createWriteStream流式写入.txt');
ws.write('半亩方塘一鉴开\r\n');
ws.write('天光云影共徘徊\r\n');
ws.write('问渠那得清如许\r\n');
ws.write('为有源头活水来\r\n');

//关闭通道可选
// ws.close();
// ws.end()

// 程序打开一个文件是需要消耗资源的 ，流式写入可以减少打开关闭文件的次数。
// 流式写入方式适用于 大文件写入或者频繁写入 的场景, writeFile 适合于 写入频率较低的场景





// 在计算机中是一个非常常见的操作，下面的场景都用到了文件写入
// 下载文件
// 安装软件
// 保存程序日志，如 Git
// 编辑器保存文件
// 视频录制