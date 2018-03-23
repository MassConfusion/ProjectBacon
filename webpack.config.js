const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'src/phaser.js');

const paths = {
  root: path.resolve(__dirname),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(paths.src, 'main.js')
    ],
    vendor: ['phaser', 'jquery', 'bootstrap']
  },
  context: paths.src,
  output: {
    path: paths.dist,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.root, 'index.html')
    }),
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true),
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development' ? true : false)
    }),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: paths.src
      }, {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser']
      }, {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        include: path.join(paths.src, 'assets')
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser
    }
  }
};
