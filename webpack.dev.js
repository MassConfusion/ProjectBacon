const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const dev = merge(common, {
  devtool: 'cheap-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    pathinfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify('true')
    })
  ]
});

module.exports = dev;
