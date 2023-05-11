// 对象赋值
// let obj1 = {
//   name: 'Chen',
//   age: 18,
//   hobby: ['see a film', 'write the code', 'play basketball', 'tourism']
// }

// let obj2 = obj1;

// obj2.name = 'Forever';
// obj2.hobby[1] = 'swim';
// obj2.hobby[2] = 'alpinism';

// console.log('obj1===>', obj1);
// console.log('obj2===>', obj2);


//============================================================================

// 浅拷贝
let obj1 = {
  name: 'Chen',
  age: 18,
  hobby: ['see a film', 'write the code', 'play basketball', 'tourism']
}

let obj3 = { ...obj1 };

obj3.name = 'Forever';
obj3.hobby[1] = 'swim';
obj3.hobby[2] = 'alpinism';

console.log('obj1===>', obj1);
console.log('obj3===>', obj3);