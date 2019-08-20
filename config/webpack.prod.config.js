const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.config.js');
const pkg = require('../package.json');

const outputFileTemplateSuffix = `${pkg.version}`;

module.exports = merge(common({ ENVIRONMENT: 'production' }), {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: `[name].[hash].${outputFileTemplateSuffix}.js`,
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
  },
});
