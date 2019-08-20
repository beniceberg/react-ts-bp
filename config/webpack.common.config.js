const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed;
  const host = env.HOST || 'localhost';
  const port = env.PORT || '4001';

  const rootPath = path.resolve(__dirname, '..');
  const basePath = `${rootPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.tsx'], // babel-polyfill so that you can use async await
    output: {
      path: `${rootPath}/dist`, // after build, path to file
      filename: 'main.bundle.js', // after build, file name
      publicPath: '', // for routing in production
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
        '/': path.resolve(__dirname, '../src/'),
        // '/store': `${rootPath}/src/store`,
        // '/services': `${rootPath}/src/services`,
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true, // in dev makes sure when routing, it doesn't try to call that path on server
      host,
      port,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React Ts Boilerplate',
        template: path.resolve(__dirname, '../src/index.html'),
        inject: true,
        minify: {
          collapseWhitespace: true,
          minifyJS: false,
        },
      }),
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin(envKeys), // make environment variables accessable
    ],
  };
};
