const express = require('express')

const homeRouter = require('./routes/homeRouter.js')
const adminRouter = require('./routes/adminRouter.js')

const app = express();

//设置
app.use(homeRouter)
app.use(adminRouter)

app.get('*', (req, res) => {
  res.send('404')
})

app.listen(3000, () => {
  console.log("3000端口已启动");
})