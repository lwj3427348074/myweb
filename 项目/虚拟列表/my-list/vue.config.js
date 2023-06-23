const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      //截取以/api开头的url
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          //在/api之前自动添上target中的url
          //http://127.0.0.1:3000 + “将/api替换成/api"
          //http://127.0.0.1:3000/api + 传入的/tab
          '^/api': ''
        }
      }
    }
  },
})
