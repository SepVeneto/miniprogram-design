const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  transpileDependencies: true
})
