const fs = require('fs')

fs.stat('./笑看风云.mp4', (err, data) => {
  if (err) throw err
  // console.log(data);
  //检测目标资源是否为文件
  console.log(data.isFile());
  //检测目标资源是否为文件夹
  console.log(data.isDirectory());
})