const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  const rootPath = path.resolve(__dirname, '..');
  const fileEnv = dotenv.config({ path: `${rootPath}/.env` }).parsed;

  return {
    entry: ['@babel/polyfill', './src/index.tsx'],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.ts(x?)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.js(x?)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@pages': `${rootPath}/src/pages`,
        '@organisms': `${rootPath}/src/organisms`,
        '@molecules': `${rootPath}/src/molecules`,
        '@atoms': `${rootPath}/src/atoms`,
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React TypeScript',
        template: path.resolve(__dirname, '../src/index.html'),
        inject: true,
        minify: {
          collapseWhitespace: true,
          minifyJS: false,
        },
      }),
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin(),
      new webpack.EnvironmentPlugin(Object.keys(fileEnv)),
    ],
  };
};
