const jwt = require('jsonwebtoken')

//创建(生成)token
// let token = jwt.sign(用户数据，加密字符串，配置对象)
// let token = jwt.sign({
//   username: 'zhangshan'
// }, 'atguigu', {
//   expiresIn: 60 //单位是s
// })

// console.log(token);

let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2hhbiIsImlhdCI6MTY4MDY2OTgzMSwiZXhwIjoxNjgwNjY5ODkxfQ.8x8i8Yxi-7I3tEHVaHrJRy8uSH325coo3eUtbm_dC9I'

//校验 token
jwt.verify(t, 'atguigu', (err, data) => {
  if (err) {
    console.log('校验失败');
    return
  }
  console.log(data);
})