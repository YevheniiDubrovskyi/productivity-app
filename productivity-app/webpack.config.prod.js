const webpack = require('webpack');

module.exports = require('./webpack.common');

module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  output: {
    comments: false
  },
  compress: {
    warnings: false,
    drop_console: false,
    unsafe: false
  }
}));

module.exports.devtool = false;
module.exports.watch = false;
