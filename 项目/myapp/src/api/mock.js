import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home.js'
import user from '@/api/mockServeData/user.js'
import permission from '@/api/mockServeData/permission.js'

//定义mock请求拦截,get方法可以省略'get'
// Mock.mock('/api/home/getData','get',function(){
//   //拦截到请求后的处理逻辑
//   console.log('拦截到了');
//   return [

//   ]
// })
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
// table列表
// 普通写法只能固定拦截这个路径，所以要用正则的写法接收getuser后面的数据
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)