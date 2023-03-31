function tiemo() {
  console.log('贴膜。。。');
}

function niejiao() {
  console.log('捏脚。。。');
}

// module.exports 可以暴露 任意 数据
// 不能使用 exports = value 的形式暴露数据，模块内部 module 与 exports 的隐式关系
// exports = module.exports = {} ，require 返回的是目标模块中 module.exports 的值

// module下的属性
// module.exports = { tiemo, niejiao }

//效果一样

//这个exports是独立的变量
//往{}中添加属性
exports.niejiao = niejiao
exports.tiemo = tiemo
