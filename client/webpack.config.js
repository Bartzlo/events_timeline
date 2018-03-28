'use strict'

require('dotenv').config()

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    bundle: './src/app.ts'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            // { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                minimize: !process.env.DEV,
                sourceMap: !!process.env.DEV
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: !!process.env.DEV
              }
            }]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            if (process.env.DEV) {
              return 'img/[name].[ext]'
            }
            return 'img/[hash].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      DEV: JSON.stringify(process.env.DEV)
    }),
    new CleanWebpackPlugin(['build'], {exclude: ['static_img']}),
    new UglifyJsPlugin({test: process.env.DEV ? /\.disabled/ : /\.js$/}),
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: './index.html',
        toType: 'file'
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/api/events.js',
        to: './events.js',
        toType: 'file'
      }
    ])
  ],

  watch: true,

  watchOptions: {
    aggregateTimeout: 500 // fix ExtractTextPlugin bug
  },

  devtool: process.env.DEV ? 'source-map' : ''
}
