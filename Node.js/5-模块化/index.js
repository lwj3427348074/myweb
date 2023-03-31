// require返回的结果是目标模块中module.exports的值，并不是exports的值
const me = require('./me.js')
const m = require('./module')


me.tiemo()
me.niejiao()
console.log(m);


// 1. 对于自己创建的模块，导入时路径建议写相对路径，且不能省略./ 和../

// 2. js和json文件导入时可以不用写后缀，c/c++编写的node扩展文件也
//    可以不写后缀，但是一般用不到

// 3. 如果导入其他类型的文件，会以 js 文件进行处理

// 4. 如果导入的路径是个文件夹，则会 首先 检测该文件夹下 package.json 文件
//    中main 属性对应的文件，如果存在则导入，反之如果文件不存在会报错。
//    如果 main 属性不存在，或者 package.json 不存在，则会尝试导入文件夹下的
//    index.js 和index.json ，如果还是没找到，就会报错

// 5. 导入 node.js 内置模块时，直接 require 模块的名字即可，无需加./ 和../