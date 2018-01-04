const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

const dev = merge(common, {
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true
  },
  plugins: [
    definePlugin,
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
});

module.exports = dev;
