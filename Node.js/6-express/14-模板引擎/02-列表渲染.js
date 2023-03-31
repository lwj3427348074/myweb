const ejs = require('ejs')
const fs = require('fs')

const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧']

//原生JS
// let str = '<ul>'
// xiyou.forEach(item => {
//   str += `<li>${item}</li>`
// })
// str += '</ul>'
// console.log(str);
//EJS实现
//不用tostring()的话是一个Buffer不能被解析
let str = fs.readFileSync(__dirname + '/02-西游.html').toString()

let result = ejs.render(str, { xiyou });


console.log(result);
