const fs = require('fs')

// fs.writeFile(__dirname + '/text.txt', 'writeFileappend', { flag: 'a' }, (err) => {
//   if (err) throw err;
//   console.log('追加成功')
// })

// let ws = fs.createWriteStream(__dirname + '/text.txt')
// ws.write('createWriteStream')
// ws.write('write')
//关闭通道
// ws.close()
// ws.end()


// fs.appendFileSync(__dirname + '/text.txt', 'appendFileSync')

// fs.readFile(__dirname + '/text.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data)
// })

// let data = fs.readFileSync(__dirname + '/text.txt', 'utf-8')
// console.log(data);


// let ws = fs.createReadStream(__dirname + '/text.txt')
// ws.write('createWriteStream')
// ws.write('write')
//关闭通道
// ws.close()
// ws.end()


// fs.rename(__dirname + '/text.txt', __dirname + '/rename.txt', (err) => {
//   if (err) throw err;
//   console.log('重命名成功')
// })

// fs.renameSync(__dirname + '/rename.txt', __dirname + '/renameSync.txt')


// fs.unlinkSync(__dirname + '/unlinkSync.txt')
// fs.mkdirSync(__dirname + '/file')
// fs.mkdir(__dirname + '/file/file2/file3', { recursive: true }, err => {
//   if (err) throw err;
//   console.log("新建成功");
// })

fs.rm(__dirname + '/file/file2/file3', { recursive: true }, (err) => {
  if (err) throw err;
  console.log("删除成功");
})