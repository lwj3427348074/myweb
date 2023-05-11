//浅拷贝
//原对象obj1
var obj1 = {
  'name': 'zhangsan',
  'age': '18',
  'language': [1, [2, 3], [4, 5]],
};

//赋值
var obj2 = obj1;

//使用shallowCopy进行浅拷贝
var obj3 = shallowCopy(obj1);

function shallowCopy(src) {
  var dst = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}

obj2.name = "lisi";
obj3.age = "20";

obj2.language[1] = ["二", "三"];
obj3.language[2] = ["四", "五"];

console.log(obj1);
//obj1 = {
//    'name' : 'lisi',
//    'age' :  '18',
//    'language' : [1,["二","三"],["四","五"]],
//};

console.log(obj2);
//obj2 = {
//    'name' : 'lisi',
//    'age' :  '18',
//    'language' : [1,["二","三"],["四","五"]],
//};

console.log(obj3);
//obj3 = {
//    'name' : 'zhangsan',
//    'age' :  '20',
//    'language' : [1,["二","三"],["四","五"]],
//};

// 我们改变 obj2 的 name 属性和 obj3 的 name 属性，可以看到，
// 改变赋值得到的对象 obj2 同时也会改变原始值 obj1，
// 而改变浅拷贝得到的的 obj3 则不会改变原始对象 obj1。
// 这就可以说明赋值得到的对象 obj2 只是将指针改变，其引用的仍然是同一个对象，
// 而浅拷贝得到的的 obj3 则是重新创建了新对象。

// 我们接下来来看一下改变引用类型会是什么情况呢，
// 我又改变了赋值得到的对象 obj2 和浅拷贝得到的 obj3 中的 language 属性的第二个值和第三个值
// （language 是一个数组，也就是引用类型）。
// 结果见输出，可以看出来，无论是修改赋值得到的对象 obj2 和浅拷贝得到的 obj3 都会改变原始数据。

// 因为浅拷贝只复制一层对象的属性，并不包括对象里面的为引用类型的数据。
// 所以就会出现改变浅拷贝得到的 obj3 中的引用类型时，会使原始数据得到改变。



// 浅拷贝：将 B 对象拷贝到 A 对象中，但不包括 B 里面的子对象
// 深拷贝：将 B 对象拷贝到 A 对象中，包括 B 里面的子对象，







//深拷贝
// 内部方法：用户合并一个或多个对象到第一个对象
// 参数：
// target 目标对象  对象都合并到target里
// source 合并对象
// deep 是否执行深度合并
// function extend(target, source, deep) {
//   for (key in source)
//     if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
//       // source[key] 是对象，而 target[key] 不是对象， 则 target[key] = {} 初始化一下，否则递归会出错的
//       if (isPlainObject(source[key]) && !isPlainObject(target[key]))
//         target[key] = {}

//       // source[key] 是数组，而 target[key] 不是数组，则 target[key] = [] 初始化一下，否则递归会出错的
//       if (isArray(source[key]) && !isArray(target[key]))
//         target[key] = []
//       // 执行递归
//       extend(target[key], source[key], deep)
//     }
//     // 不满足以上条件，说明 source[key] 是一般的值类型，直接赋值给 target 就是了
//     else if (source[key] !== undefined) target[key] = source[key]
// }

// Copy all but undefined properties from one or more
// objects to the `target` object.
// $.extend = function (target) {
//   var deep, args = slice.call(arguments, 1);

//   //第一个参数为boolean值时，表示是否深度合并
//   if (typeof target == 'boolean') {
//     deep = target;
//     //target取第二个参数
//     target = args.shift()
//   }
//   // 遍历后面的参数，都合并到target上
//   args.forEach(function (arg) { extend(target, arg, deep) })
//   return target
// }
