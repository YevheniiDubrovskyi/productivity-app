const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {

  context: __dirname,

  devSever: {
    contentBase: path.join(__dirname, 'build'),
    outputPath: path.join(__dirname, 'build')
  },

  cache: false,
  devtool: 'inline-source-map',

  entry: {
    app: ['./src/app'],
    vendor: ['jquery', 'jquery-ui-bundle', 'highcharts', 'firebase']
  },

  output: {
    path: path.join(__dirname, 'build', 'js'),
    publicPath: 'js/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|svg)/,
        loader: 'file-loader?name=../img/[name].[ext]'
      },
      {
        test: /\.(woff2?|ttf|eot)/,
        loader: 'file?name=../fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars?helperDirs[]=' + __dirname + '/src/utils/helpers'
      }
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],

  plugins: [
    new CopyWebPackPlugin([
      {
        from: 'src/assets/fonts',
        to: '../fonts'
      },
      {
        from: 'src/index.html',
        to: '../index.html'
      },
      {
        from: 'src/manifest.cache',
        to: '../manifest.cache'
      }
    ], {
      copyUnmodified: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

  ]

};
