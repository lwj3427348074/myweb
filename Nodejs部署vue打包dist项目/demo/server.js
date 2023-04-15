const express = require('express')
const history = require('connect-history-api-fallback');

const app = new express();
app.use(history())
app.use(express.static(__dirname + '/static'))

app.get('/person', (req, res) => {
  res.send({
    name: 'tom',
    age: 18
  })
})

app.listen('3000', (err) => {
  if (!err) {
    console.log('3000端口已启动');
  }
})