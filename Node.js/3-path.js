const path = require('path')
let p = path.resolve(__dirname, 'fs')
console.log(p);


console.log(path.sep);


//文件的绝对路径__filename
console.log(__filename);
let str = 'C:\\Users\\LWJ\\Desktop\\Node.js\\3-path.js'
console.log(path.parse(str));

console.log(path.basename(str));

console.log(path.dirname(str));

console.log(path.extname(str));