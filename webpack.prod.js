const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const prod = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify('false')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    })
  ]
});

module.exports = prod;
