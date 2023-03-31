//绝对路径
// __dirname 与 require 类似，都是 Node.js 环境中的'全局'变量
// __dirname 保存着 当前文件所在目录的绝对路径 ，可以使用 __dirname 与文件名拼接成绝对路径
const fs = require('fs')

console.log(__dirname);

