const express = require('express')

//创建路由对象,router对象相当于小型的app对象，可以用它来创建路由规则
const router = express.Router()

//创建路由规则
router.get('/home', (req, res) => {
  res.send('home')
})

router.get('/search', (req, res) => {
  res.send('search')
})

//暴露router
module.exports = router
