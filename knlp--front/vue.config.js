module.exports = {
  devServer: {
    port: 8888,
    proxy: 'http://localhost:8080'
  },
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: '../wwwroot'
};
