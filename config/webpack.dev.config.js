const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const host = 'localhost';
const port = '8081';

module.exports = merge(common({ ENVIRONMENT: 'development' }), {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.bundle.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    host,
    port,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React TypeScript Dev',
      template: path.resolve(__dirname, '../src/index.html'),
      prefix: `http://${host}:${port}/`,
      inject: true,
      minify: {
        collapseWhitespace: true,
        minifyJS: false,
      },
    }),
  ],
});
