const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.config.js');
const pkg = require('../package.json');

module.exports = merge(common(), {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: `[name].[hash].${pkg.version}.js`,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
});
