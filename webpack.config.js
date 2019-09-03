const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    host: '0.0.0.0',
    port: 4300
  },
  plugins: [
    new HTMLPlugin({
      template: './src/index.html'
    })
  ]
}
