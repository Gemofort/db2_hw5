const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const utils = require('./utils')

module.exports = env => {

  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    },
    devServer: {
      contentBase: './dist/'
    },
    plugins: [
      new CopyPlugin([
        { from: 'src/styles/reset.css', to: './styles/' },
        { from: 'src/assets/img/*', to: './images/', flatten: true }
      ]),

      ...utils.pages(env)
    ]
  }
};