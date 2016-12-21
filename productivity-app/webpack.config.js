const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {

  context: __dirname,

  devSever: {
    contentBase: path.join(__dirname, 'build'),
    outputPath: path.join(__dirname, 'build')
  },

  watch: true,
  cache: false,
  devtool: 'source-map',

  entry: {
    app: './src/app'
  },

  output: {
    path: path.join(__dirname, 'build', 'js'),
    publicPath: 'js/',
    filename: '[name].bundle.js',
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
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader?name=../img/[name].[ext]'
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
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
    })
  ]

};
