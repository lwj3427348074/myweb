const ejs = require('ejs')
const fs = require('fs')

//字符串
let china = '中国'
let weather = '天气晴'

let str = fs.readFileSync(__dirname + '/01.html').toString()

//使用ejs渲染
let result = ejs.render(str, { china: china, weather });

console.log(result);