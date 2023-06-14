const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置代理服务器实现跨域
  devServer: {
    proxy: {
      '/xinlang':{
        target:'https://interface.sina.cn',
        secure:true,  // https请求则使用true
        changeOrigin:true,  // 跨域
        pathRewrite:{'^/xinlang':'/'}
      },
      '/juhe':{
        target:'http://apis.juhe.cn',
        secure:true,  // https请求则使用true
        pathRewrite:{'^/juhe':''}
      }
    }
  }
})
