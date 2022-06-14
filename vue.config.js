module.exports = {
  publicPath: process.env.NODE_ENV == "production"? '/web/' : '/',
  devServer: {
    port: 8081,   // 端口号
  }
}