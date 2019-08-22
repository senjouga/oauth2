const proxyTarget = 'http://192.168.20.25:8066'

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: proxyTarget,
        // changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
