const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/u': {// 匹配所有以 '/api1'开头的请求路径
  //       target: 'https://avatars.githubusercontent.com',// 代理目标的基础路径
  //       ws: true,//用于支持websocket
  //       //服务器端收到的请求，true：伪造成5000，false：8080
  //       changeOrigin: true,//用于控制请求头中的host值
  //       //上面这俩不写默认值也是true
  //       pathRewrite: { '^/u': '/u' }
  //     },
  //     '/': {// 匹配所有以 '/api2'开头的请求路径
  //       target: 'https://github.com',// 代理目标的基础路径
  //       changeOrigin: true,
  //       pathRewrite: { '^/': '' }
  //     }
  //   }
  // }
})
