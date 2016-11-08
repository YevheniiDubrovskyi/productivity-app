const path = require('path');

module.exports = {

  context: __dirname,

  entry: {
    reports: './src/js/reports',
    settings_pom: './src/js/settings_pom',
  },

  output: {
    path: path.join(__dirname, 'public/js'),
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
        },
      }
    ],
  },

  devSever: {
    contentBase: './public',
  },

  watch: true,
  devtool: 'source-map',

};
